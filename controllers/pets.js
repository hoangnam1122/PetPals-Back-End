const db = require('../models')

//Get all pets
const index = (req, res) => {
    db.pet.findAll().then((foundPets) => {
        if (!foundPets) return res.json({
            message: 'No pet(s) found in database.'
        })

        res.status(200).json({ pets: foundPets });
    })
}

//Show one pet info
const show = (req, res) => {
    db.pet.findByPk(req.params.id).then((foundPet) => {
        if (!foundPet) return res.json({
            message: 'Pet with provided ID not found.'
        })

        res.status(200).json({ pet: foundPet })
    })
}

//CREATE PET
const create = (req, res) => {
    db.pet.create(req.body).then((savedPet) => {
        db.species.findOrCreate({ where: { type: req.body.species } })//this is where we are stuck
            .then((foundOrCreatedSpecies) => {
                savedPet.addSpecies(foundOrCreatedSpecies[0].dataValues.id).then((petInfo) => {
                    res.status(200).json({ pet: savedPet })
                })
            })
    })
}


//EDIT PET
const update = (req, res) => {
    db.pet.update({
        ...req.body
    }, {
        where: {
            id: req.params.id
        }
    }).then((updatedPet) => {
        if (!updatedPet) return res.json({
            message: "No pet with that ID found."
        })
        // Validations and error handling here
        res.status(200).json({ pet: updatedPet })
    })
}
//DELETE
const destroy = (req, res) => {
    db.pet.findByPk(req.body.petId).then((foundPet) => {
        db.species.findByPk(req.body.speciesId).then((foundSpecies) => {
            foundPet.removeSpecies(foundSpecies)
        }).then(() => {
            db.pet.destroy({
                where: { id: req.body.petId }
            }).then(() => {
                res.status(200)
            })
        })
    })
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy
}
