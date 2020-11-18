const db = require('../models')

//FIND ALL IMAGES
const index = (req, res) => {
    db.images.findAll().then((foundImages) => {
        if (!foundImages) return res.json({
            message: 'No Images found in database.'
        })

        res.status(200).json({ images: foundImages });
    })
}

//might not need show one image...//change this to update
const updateProfilePic = (req, res) => {
    console.log(req.body)
    db.user.update({ imgUrl: req.body.imgUrl }, { where: { id: req.body.userId } })
        .then(
            res.status(200)
            //res.status(200).json({ image: foundImage })
        )
}

//might not need show one image...//change this to update
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

//WE DONT NEED AN EDIT PHOTO

//DELETE
const destroy = (req, res) => {
    db.image.destroy({
        where: { id: req.params.id }
    }).then(() => {
        res.status(200)
    })
}


module.exports = {
    index,
    updateProfilePic,
    updatePetPic,
    create,
    destroy
}
