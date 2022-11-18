const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', 'username name')
    res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
        res.json(blog)
    } else {
        res.status(404).end()
    }

})

blogsRouter.post('/', userExtractor, async (req, res) => {
    const body = req.body
    const user = req.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })
    
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
    const toRemove = await Blog.findById(req.params.id)
    if (toRemove.user.toString() === req.user.id.toString()) {
        await Blog.findByIdAndRemove(req.params.id)
        res.status(204).end()
    } else {
        res.status(401).json({ error: 'unauthorized to delete this blog' })
    }
})

blogsRouter.put('/:id', async (req, res) => {
    const body = req.body
    const user = await User.findById(body.userId)

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    if (updatedBlog) {
        res.status(200).json(updatedBlog)
    } else {
        res.status(404).end()
    }
})

module.exports = blogsRouter
