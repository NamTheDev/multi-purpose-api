const { randomNumber } = require('multi-purpose');

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res
 */
module.exports = async (req, res) => {
    let { number, min, max } = req.query;

    try {
        if (number && (min || max)) {
            throw 'You cannot use [number] with [min] or [max].';
        }

        if (number) {
            number = Number(number);
            if (isNaN(number)) {
                throw '[number] must be a number.';
            }
            const data = (await randomNumber(number));
            res.json(data);
        } else if (min && max) {
            min = Number(min);
            max = Number(max);
            if (isNaN(min) || isNaN(max)) {
                throw '[min] and [max] must be numbers.';
            }
            if (min > max) {
                throw '[min] must be less than or equal to [max].';
            }
            const data = (await randomNumber(max - min + 1)) + min;
            res.json(data);
        } else {
            throw 'Missing parameters. Provide either [number] or both [min] and [max].';
        }
    } catch (e) {
        res.status(400).json({ error: `${e}` });
    }
};
