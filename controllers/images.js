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

//might not need show one image... 
const show = (req, res) => {
    console.log('in the show route')
    console.log(req.params)
    db.image.findByPk(req.params.id).then((foundImage) => {
        if (!foundImage) return res.json({
            message: 'Image with provided ID not found.'
        })

        res.status(200).json({ image: foundImage })
    })
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
    show,
    create,
    destroy
}
