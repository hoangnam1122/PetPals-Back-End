const db = require('../models')

//home page display
//profile pets display
//show all pets display
//edit a pet form placeholders
//STRETCH GOAL: friends profile--probably the same as profile display just using params

//working
const index = (req, res) => {
    db.pet.findAll().then((foundPet) => {
        if (!foundPet) return res.json({
            message: 'No pet(s) found in database.'
        })

        res.status(200).json({ pets: foundPets });
    })
}

//Show one pet--this might serve the info for the placehold in our edit pet form
const show = (req, res) => {
    console.log('in the show route')
    console.log(req.params)
    db.pet.findByPk(req.params.id).then((foundPet) => {
        if (!foundPet) return res.json({
            message: 'Pet with provided ID not found.'
        })

        res.status(200).json({ pet: foundPet })
    })
}

//working
const create = (req, res) => {
    db.pet.create(req.body).then((savedPet) => {
        // Validations and error handling here--are there?
        res.status(200).json({ pet: savedPet })
    })
}

//not sure need to get show page working first// me neither
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
    db.pet.destroy({
        where: { id: req.params.id }
    }).then(() => {
        res.status(200)
    })
}


//don't forget the species in your all pets route

module.exports = {
    index,
    show,
    create,
    update,
    destroy
}
