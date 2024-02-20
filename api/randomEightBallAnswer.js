const { randomEightBallAnswer } = require('multi-purpose')

/**
* @param {import('express').Request} req 
* @param {import('express').Response} res
*/
module.exports = async (req, res) => {
    const { config_answer_type, config_custom_answers } = req.query
    try {
        const data = await randomEightBallAnswer({ answerType: config_answer_type || 'general', customAnswers: config_custom_answers || undefined })
        res.json({answer: data})
    } catch (e) {
        res.status(400).json({ error: `${e}` })
    }
}
