const Bill = require("../models/bill");

const submitBill = async(req, res) => {
    const products = req.body.products;

    const {
        name,
        email,
        telephone,
        message
    } = req.body.form;

    const bill = new Bill();
    bill.name = name;
    bill.email = email;
    bill.telephone = telephone;
    bill.message = message;
    bill.products = prducts;

    await bill.save({timestamps: true, validateBeforeSave: true}).then(doc => {
        if (doc) return res.status(201).json({bill: doc});
        else return res.status(500).json({mes: "error"});
    }).catch(err => {
        return res.status(500).json(err);
    });
}

module.exports = {
    submitBill: submitBill
}