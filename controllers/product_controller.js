const Product = require('../models/product');
const isReact = process.env.NODE_ENV === "react";

// controller = request, response 
const addProduct = async (req, res) => {
    const body = req.body;
    let {
        name, 
        description,
        category,
        image,
        price
    } = body;

    if (!image) image = "https://mrsldna.org/wp-content/uploads/2019/03/product-placeholder.gif";

    if (!name && !description && !category) 
        return res.status(400).json({err: "missing inputs"});

    const product = new Product();
    product.name = name;
    product.description = description;
    product.category = category;
    product.image = image;
    product.price = price;

    await product.save({validateBeforeSave: true}).then(doc => {
        if (doc) {
            if (isReact)
                return res.status(201).json({product: doc});
            else 
                return res.status(201).render("saved", {product: doc});
        }
        else return res.status(500).json({mes: "error"});
    }).catch(err => {
        console.error(err);
        return res.status(500).json(err);
    });
}

const getProducts = async (req, res) => {
    await Product.find({}).then(docs => {
        if (docs) {
            if (!isReact)
                return res.status(200).render("index", {products: docs});
            else
                return res.status(200).json({products: docs});
        }
        return res.status(500).json({err: "error"})
    }).catch(err => {
        console.error(err);
        return res.status(501).json(err);
    });
}

const getProduct = async (req, res) => {
    const id = req.params.id;

    if (id.length === 0) return res.status(400).json({err: "client error"});
    await Product.findById(id).then(doc => {
        if (doc) {
            if (isReact)
                return res.status(200).json({product: doc});
            else 
                return res.status(200).render("product", {product: doc});
        }
        else return res.status(500).json({mes: "error"});
    }).catch(err => {
        console.error(err);
        return res.status(500).json(err);
    });
}

module.exports = {
    addProduct: addProduct,
    getProducts: getProducts,
    getProduct: getProduct,
}