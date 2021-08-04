const Sequelize = require ('sequelize')
const { STRING } = Sequelize
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/bookmarks_db')

const Bookmark = conn.define('Bookmark', {
    name: {
        type: STRING,
        allowNull: false
    },
    URL: {
        type: STRING,
        allowNull: false
    },
    category: {
        type: STRING,
        allowNull: false
    }

})

const syncAndSeed = async () => {
    await conn.sync({ force: true})
    await data.map(bookmark => Bookmark.create(bookmark))
}

module.exports = {
    syncAndSeed,
    conn,
    models: {
        Bookmark
    }
}


const data = [
    {
      name: 'LinkedIn',
      URL: 'http://www.linkedin.com',
      category: 'jobs'
    },
    {
      name: 'Indeed',
      URL: 'http://www.indeed.com',
      category: 'jobs'
    },
    {
      name: 'Amazon',
      URL: 'http://www.amazon.com',
      category: 'shopping'
    },
    {
      name: 'W3C Shools - Javascript',
      URL: 'https://www.w3schools.com/jsref/default.asp',
      category: 'coding'
    },
    {
      name: 'Target',
      URL: 'http://www.shopping.com',
      category: 'shopping'
    },
    {
      name: 'The Weeknd',
      URL: 'https://www.theweeknd.com/',
      category: 'music'
    },
    {
      name: 'Stack Overflow',
      URL: 'https://stackoverflow.com/',
      category: 'coding'
    },
  ];