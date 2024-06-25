const { readdirSync } = require("fs")

/**
 * 
 * @param {import("express").Request} req
 * @param {import("express").Response} res 
 */
module.exports = async (req, res) => {
    const endpoints = readdirSync('api').map(endpoint => endpoint.split('.')[0])
    res.json({ endpoints })
} 