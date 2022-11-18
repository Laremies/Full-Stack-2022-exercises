require('dotenv').config()

const SECRET = process.env.SECRET
const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

module.exports = { PORT, MONGODB_URI, SECRET }
