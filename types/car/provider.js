const five = require('johnny-five')

const Sleep = async (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

class Controller {
    constructor(options) {
        this.options = options
        this.isInitialized = false
        this.board = null
        this.esc = null
        this.servo = null
    }

    async Initialize(){
        return new Promise((resolve, reject) => {
            this.board = new five.Board()
            this.board.on('ready', () => {
                this.esc = new five.ESC({
                    pin: this.options.motorPin,
                    freq: 50,
                    device: 'FORWARD_REVERSE'
                })

                this.servo = new five.Servo({
                    pin: this.options.servoPin,
                })

                this.isInitialized = true
                resolve()
            })
        })
    }

    Stop(){
        if(!this.isInitialized) return
        this.esc.throttle(this.esc.neutral)
        this.servo.center()
    }

    SetSpeed(speed){
        if(!this.isInitialized) return
        this.esc.throttle(this.esc.neutral + speed + (speed > 0 ? this.options.motorForward : -this.options.motorBackward))
    }

    SetSteer(angle){
        if(!this.isInitialized) return
        this.servo.to(90 + angle)
    }
}

class CarProvider {
    constructor(){
        this.isRunning = false
        this.isInitialized = false
        
        this.controller = new Controller({
            motorPin: 9,
            servoPin: 10,
            motorForward: 65,
            motorBackward: 65,
        })

        this.speed = 0
        this.steer = 0
        this.maxSpeed = 100
        this.maxSteer = 70
        this.minSpeed = -100
        this.minSteer = -70

        this.Initialize()
    }

    async Initialize(){
        await this.controller.Initialize()
    }

    Log(){
        console.log('isRunning', this.isRunning)
        console.log('speed', this.speed)
        console.log('steer', this.steer)
        console.log('')
    }

    Start(){
        this.isRunning = true
        this.Reset()
    }

    Stop(){
        this.isRunning = false
        this.Reset()
    }

    Reset(){
        this.speed = 0
        this.steer = 0
        this.controller.Stop()
    }

    SetSpeed(speed){
        if(!this.isRunning) return

        this.speed = speed
        this.speed = Math.min(this.speed, this.maxSpeed)
        this.speed = Math.max(this.speed, this.minSpeed)

        this.controller.SetSpeed(this.speed)

        this.Log()
    }

    SetSteer(steer){
        if(!this.isRunning) return

        this.steer = steer
        this.steer = Math.min(this.steer, this.maxSteer)
        this.steer = Math.max(this.steer, this.minSteer)

        this.controller.SetSteer(this.steer)

        this.Log()
    }

}

const carProvider = new CarProvider()

module.exports = carProvider