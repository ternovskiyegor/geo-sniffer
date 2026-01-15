const linkModel = require("../models/link");
const tokenService = require("../services/linkService");

exports.createLink = async (req, res) => {
    
    try {
        const token = tokenService.generateToken();

        const link = await linkModel.create(token);

        res.status(201).json({
            token: link.token,
            url: `https://geo-sniffer.onrender.com/t/${link.token}`
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create link" });
    }
};