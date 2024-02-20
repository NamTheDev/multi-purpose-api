// Require the Express module
const express = require('express');
const { readdirSync } = require('fs');
const multi_purpose = require('multi-purpose');
const { join } = require('path');
const app = express();

app.use(express.static(join(process.cwd(), 'public')))

const API_routes = Object.keys(multi_purpose).filter((route => !['textDatabase'].includes(route)))
async function executeAPI(route, { req, res }) {
    const API_script_file = require(join(process.cwd(), 'api', route))
    await API_script_file(req, res)
}

const pages = readdirSync('pages').map(page => [page.split('.')[0], join(process.cwd(), 'pages', page)])
for (const [page, path] of pages) {
    app.get(`/${page}`, (req, res) => res.sendFile(path))
}

for (const route of API_routes) {
    app.get(`/api/${route}`, async (req, res) => await executeAPI(route, { req, res }))
    console.log(route)
}

const hiddenAPI = readdirSync('util-api').map(route => route.split('.')[0])
for (const route of hiddenAPI) {
    app.get(`/api/${route}`, (req, res) => {
        require(join(process.cwd(), 'util-api', route))(req, res)
    })
}

app.get('/*', (req, res) => res.redirect('/homepage'))

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});