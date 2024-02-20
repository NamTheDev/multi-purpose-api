const { getScrambledWordQuestions } = require('multi-purpose')

/**
* @param {import('express').Request} req 
* @param {import('express').Response} res
*/
module.exports = async (req, res) => {
    const { config_words } = req.query
    try {
        const data = await getScrambledWordQuestions(config_words ? { words: config_words } : undefined)
        res.json(data)
    } catch (e) {
        res.status(400).json({ error: `${e}` })
    }
}
