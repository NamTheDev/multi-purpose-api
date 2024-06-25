const { randomNumber } = require('multi-purpose')

/**
* @param {import('express').Request} req 
* @param {import('express').Response} res
*/
module.exports = async (req, res) => {
    const { number } = req.query
    try {
        if (!number) throw 'Missing parameter [number].'
        const data = await randomNumber(number)
        res.json(data)
    } catch (e) {
        res.status(400).json({ error: `${e}` })
    }
}
