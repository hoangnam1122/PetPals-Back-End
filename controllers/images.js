const db = require('../models')

//FIND ALL IMAGES
const index = (req, res) => {
    db.image.findAll().then((foundImages) => {
        if (!foundImages) return res.json({
            message: 'No Images found in database.'
        })

        res.status(200).json({ images: foundImages });
    })
}

//updates profile pic
const updateProfilePic = (req, res) => {
    db.user.update({ imgUrl: req.body.imgUrl }, { where: { id: req.params.id } })
        .then(
            res.status(200).json({ message: "profile picture is set" })
        )
}

//updates pet profile pic 
const updatePetPic = (req, res) => {
    console.log(req.body)
    db.pet.update({ imgUrl: req.body.imgUrl }, { where: { id: req.body.petId } })
        .then(
            res.status(200)
            //res.status(200).json({ image: foundImage })
        )
}

//CREATE A Image
const create = (req, res) => {
    db.image.create(req.body).then((savedImage) => {
        res.status(200).json({ image: savedImage })
    })
}


//DELETE
const destroy = (req, res) => {
    db.image.destroy({
        where: { id: req.params.id }
    }).then(() => {
        res.status(200).json({ message: "Image was deleted" })
    })
}


module.exports = {
    index,
    updateProfilePic,
    updatePetPic,
    create,
    destroy
}
