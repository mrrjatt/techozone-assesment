const db = require('../../models');
const Category = db.category;

var createCategory = (req, res) => {
    if (req.body.name) {
        Category.create({name:req.body.name}).then((data) => {
            res.status(200).send({
                status: true,
                message: 'Category is created!',
                data
            })
        }).catch((error) => {
            res.status(500).send({
                status: false,
                error
            })
        })
    } else {
        res.status(500).send({
            status: false,
            message: 'category name is required!'
        })
    }
}
var getCategory = (req, res) => {
    var { categoryId } = req.params;
    Category.findOne({where:{id:categoryId}}).then((data) => {
        res.status(200).send({
            status: true,
            message: 'Category is found!',
            data
        })
    }).catch((error) => {
        res.status(500).send({
            status: false,
            error
        })
    })
}
var deleteCategory = (req, res) => {
    var { categoryId } = req.params;
    Category.destroy({where:{id:categoryId}}).then((data) => {
        res.status(200).send({
            status: true,
            message: 'Category is deleted!',
            data
        })
    }).catch((error) => {
        res.status(500).send({
            status: false,
            error
        })
    })
}
var updateCategory = (req, res) => {
    var { categoryId } = req.params;
    Category.findOne({where:{id:categoryId}}).then((category) => {
        category.update(req.body).then((data)=>{
            res.status(200).send({
                status: true,
                message: 'Category is updated!',
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
var allCategories = (req, res) => {
    Category.findAll().then((data) => {
        res.status(200).send({
            status: true,
            message: 'Categories are found!',
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
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    allCategories
}