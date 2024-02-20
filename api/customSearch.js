const customSearch = require('multi-purpose')

/**
* @param {import('express').Request} req 
* @param {import('express').Response} res
*/
module.exports = async (req, res) => {
    const { query, api_key, search_engine_id, config_safe_search } = req.query
    const missing_parameters = []
    if (!query) missing_parameters.push('query')
    if (!api_key) missing_parameters.push('api_key')
    if (!search_engine_id) missing_parameters.push('search_engine_id')
    if (!config_safe_search) missing_parameters.push('config_safe_search')

    if (missing_parameters.length > 0) {
        return res.status(400).json({
            error: 'Missing required parameter(s).',
            missing_parameters: missing_parameters.join(', ')
        })
    }
    try {
        const data = await customSearch(query, api_key, search_engine_id, { safe_search: config_safe_search })
        res.json(data)
    } catch (e) {
        res.status(400).json({ error: `${e}` })
    }
}
