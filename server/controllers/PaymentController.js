require('dotenv').config()
const crypto = require("crypto");
const Razorpay = require('razorpay')
const Payment = require('../models/Payment')

const checkout = async (req, res) => {
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    })
    const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR"
    };

    try {
        const order = await instance.orders.create(options);
        res.status(200).json({
            success: true,
            order
        })
    } catch (error) {
        console.log(error)
        res.status(200).json({
            success: false,
            error: error
        })
    }
}

const paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthenticated = expectedSignature === razorpay_signature;

    if (isAuthenticated) {

        // Database Connection here

        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });

        res.redirect(
            `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
        );
    } else {
        res.status(400).json({
            success: false,
        });
    }
};

module.exports = {
    checkout, paymentVerification
}
