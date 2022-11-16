const Blog = require('../models/blog')

const initBlogs = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edger W. Dijkstra',
        url: '"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 19
    },
    {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10
    }
]

const nonExistingId = async () => {
    const blog = new Blog({title: 'willremovesoon', author:'test', url: 'test.com'})
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsinDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = { initBlogs, nonExistingId, blogsinDb }