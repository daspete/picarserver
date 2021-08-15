const CarProvider = require('./provider')

module.exports = {
    Query: {
        CarSpeed(root, args, context) {
            return CarProvider.speed
        },

        CarSteer(root, args, context) {
            return CarProvider.steer
        },

        CarIsRunning(root, args, context) {
            return CarProvider.isRunning
        },
        
        CarIsInitialized(root, args, context) {
            return CarProvider.isInitialized
        }
    },

    Mutation: {
        StartCar(root, args, context) {
            CarProvider.Start()
        },
        StopCar(root, args, context) {
            CarProvider.Stop()
        },
        SetCarSpeed(root, args, context) {
            CarProvider.SetSpeed(args.speed)
        },
        SetCarSteer(root, args, context) {
            CarProvider.SetSteer(args.steer)
        }
    },
}