const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initBlogs = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edger W. Dijkstra',
        url: '"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 19,
    },
    {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10
    }
]


const testUser = new User({
    username: "test",
    password: "test"
})


const nonExistingId = async () => {
    const blog = new Blog({title: 'willremovesoon', author:'test', url: 'test.com'})
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = { initBlogs, testUser, nonExistingId, blogsInDb, usersInDb }
