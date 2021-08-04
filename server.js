const { conn, syncAndSeed, models: {Bookmark} } = require ('./db')
const express = require ('express')

const app = express()

app.get('/bookmarks', async (req, res, next) => {
    try {
        const bookmarks = await Bookmark.findAll()
        res.send(`
        <html>
        <head>
        </head>
        <body>
        <ul>
            ${Object.entries(bookmarks.reduce((acc, bookmark) => {
                if(!acc[bookmark.category]) {
                    acc[bookmark.category] = 0
                } 
                acc[bookmark.category] ++
                return acc
            }, {})).map(bookmark => `
            <li>
            <a href='/bookmarks/${bookmark[0]}'>${bookmark[0]}</a> (${bookmark[1]})
            </li>
            `).join('')}
        </ul>
        </body>
        </html>
        `)
    }
    catch (err) {
        next(err)
    }
})

app.get('/bookmarks/:category', async (req, res, next) => {
    try {
        const bookmarks = await Bookmark.findAll( {
            where: {
                category: req.params.category
            }
        })
        res.send(`
        <html>
        <head>
        </head>
        <body>
        <ul>
            ${bookmarks.map(bookmark => `
            <li>
            <a href='/bookmarks'>${bookmark.name}</a> (${bookmark.URL})
            </li>
            `).join('')}
        </ul>
        </body>
        </html>
        `)
    }
    catch (err) {
        next(err)
    }
})

app.get('/', (req, res) => res.redirect('/bookmarks'))

const init = async () => {
    try {
        await syncAndSeed()
        const port = process.env.PORT || 3000
        app.listen(port, () => console.log(`Listening on port ${port}`))
    }
    catch (err) {
        console.log(err)
    }
}

init()

