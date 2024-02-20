const { randomRate } = require('multi-purpose')

/**
* @param {import('express').Request} req 
* @param {import('express').Response} res
*/
module.exports = async (req, res) => {
    const { type } = req.query
    try {
        if(!type) throw 'Missing parameter [type].'
        const data = await randomRate(type)
        res.json(data)
    } catch (e) {
        res.status(400).json({ error: `${e}` })
    }
}
