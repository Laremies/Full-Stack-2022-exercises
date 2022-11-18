const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../utils/actual_test_helper')
const jwt = require('jsonwebtoken')

let token = null
let user = null
beforeAll(async () => {
  await User.deleteMany({})
  user = await helper.testUser.save()
  token = jwt.sign({ username: helper.testUser.username, id: user.id }, process.env.SECRET)
})
beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initBlogs)
    await Blog.insertMany({
      title: "test",
      author: "test",
      url: "test.com",
      user: user
    })
})


test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const res = await api.get('/api/blogs')

    expect(res.body).toHaveLength(helper.initBlogs.length + 1)
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
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initBlogs.length + 2)

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
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initBlogs.length + 1)
})

test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
  
    const blogToView = blogsAtStart[0]
  
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
  
    expect(resultBlog.body).toEqual(processedBlogToView)
})

test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToDelete = blogsAtStart[blogsAtStart.length - 1]
    console.log(blogsAtStart)
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(
      blogsAtStart.length - 1
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
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs[blogs.length - 1].likes).toBe(0)
})

test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const id = blogsAtStart[0].id
    const likes = blogsAtStart[0].likes + 1
    await api
        .put(`/api/blogs/${id}`)
        .send({likes: likes})
        .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(likes)
})


describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })
  
    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      expect(result.body.error).toContain('username must be unique')
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})


afterAll(() => {
    mongoose.connection.close()
})
