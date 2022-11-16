const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('../utils/actual_test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const res = await api.get('/api/blogs')

    expect(res.body).toHaveLength(helper.initBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
    const res = await api.get('/api/blogs')
    const titles = res.body.map(blog => blog.title)

    expect(titles).toContain('First class tests')
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'Laurens van der Helm',
        url: 'fullstackopen.com',
        likes: 69
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsinDb()
    expect(blogsAtEnd).toHaveLength(helper.initBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain('async/await simplifies making async calls')
})

test('blog without title or url is not added', async () => {
    const newBlog = {
        author: 'Laurens van der Helm',
        likes: 69
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsinDb()

    expect(blogsAtEnd).toHaveLength(helper.initBlogs.length)
})

test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsinDb()
  
    const blogToView = blogsAtStart[0]
  
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
  
    expect(resultBlog.body).toEqual(processedBlogToView)
})

test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsinDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsinDb()
  
    expect(blogsAtEnd).toHaveLength(
      helper.initBlogs.length - 1
    )
  
    const titles = blogsAtEnd.map(blog => blog.title)
  
    expect(titles).not.toContain(blogToDelete.title)
  })

test('blogs have correct id field name', async () => {
    const res = await api.get('/api/blogs')
    const ids = res.body.map(blog => blog.id)
    expect(ids).toBeDefined()
})

test('likes field defaults to 0', async () => {
    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'Laurens van der Helm',
        url: 'fullstackopen.com',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsinDb()
    expect(blogs[blogs.length - 1].likes).toBe(0)
})

test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsinDb()
    const id = blogsAtStart[0].id
    const likes = blogsAtStart[0].likes + 1
    await api
        .put(`/api/blogs/${id}`)
        .send({likes: likes})
        .expect(200)

    const blogsAtEnd = await helper.blogsinDb()
    expect(blogsAtEnd[0].likes).toBe(likes)
})

afterAll(() => {
    mongoose.connection.close()
})