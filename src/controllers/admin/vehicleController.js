const db = require('../../models')
const Vehicle = db.vehicle;
const Category = db.category;
var createVehicle = (req, res) => {
    Vehicle.create(req.body).then((data) => {
        res.status(200).send({
            status: true,
            message: 'Vahicle is created!',
            data
        })
    }).catch((error) => {
        res.status(500).send({
            status: false,
            error
        })
    })
}

var getVehicle = (req, res) => {
    var { vehicleId } = req.params;
    Vehicle.findOne({
        where: { id: vehicleId },
        include: [{
            model: Category
        }]
    }).then((data) => {
        res.status(200).send({
            status: true,
            message: 'Vehicle is found!',
            data
        })
    }).catch((error) => {
        res.status(500).send({
            status: false,
            error
        })
    })
}
var deleteVehicle = (req, res) => {
    var { vehicleId } = req.params;
    Vehicle.destroy({ where: { id: vehicleId } }).then((data) => {
        res.status(200).send({
            status: true,
            message: 'Vehicle is deleted!',
            data
        })
    }).catch((error) => {
        res.status(500).send({
            status: false,
            error
        })
    })
}

var updateVehicle = (req, res) => {
    console.log(req.body)
    var { vehicleId } = req.params;
    Vehicle.findOne({ where: { id: vehicleId } }).then((vehicle) => {
        vehicle.update(req.body).then((data) => {
            res.status(200).send({
                status: true,
                message: 'Vehicle is updated!',
                data
            })
        }).catch((error) => {
            res.status(500).send({
                status: false,
                error
            })
        })

    }).catch((error) => {
        res.status(500).send({
            status: false,
            error
        })
    })
}
var allVehicles = (req, res) => {
    Vehicle.findAll(
        {
            include: [{
                model: Category
            }]
        }
    ).then((data) => {
        res.status(200).send({
            status: true,
            message: 'Vehicles are found!',
            data
        })
    }).catch((error) => {
        res.status(500).send({
            status: false,
            error
        })
    })
}
module.exports = {
    createVehicle,
    getVehicle,
    updateVehicle,
    deleteVehicle,
    allVehicles
}