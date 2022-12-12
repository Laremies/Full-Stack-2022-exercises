import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFromRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type='info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      notify('logged in')
    } catch (exception) {
      notify('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogUser')
    notify('logged out')
  }

  const handleUsername = e => {
    setUsername(e.target.value)
  }

  const handlePassword = e => {
    setPassword(e.target.value)
  }

  const addBlog = blogObject => {
    blogFromRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        notify(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      })
  }

  const upvote = liked => {
    blogService.like(liked)
    .then(returnedBlog => {
      setBlogs(blogs.map(b => (
        b.id === returnedBlog.id ? returnedBlog : b
      )))
    })
  }

  const deleteBlog = blogObject => {
    if (window.confirm(`Delete blog ${blogObject.title} by ${blogObject.author}`)) {
      blogService
        .remove(blogObject)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== blogObject.id))
          notify('blog deleted')
        })
    }
  }

  return (
    <div>
      {user === null ?
        <div>
          <h2>log in to application</h2>
          <Notification notification={notification} />
          <LoginForm onSumbit={handleLogin}
            nameValue={username} onNameChange={handleUsername}
            passwordValue={password} onPasswordChange={handlePassword}
          />
        </div> :
        <div>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <h2>create new</h2>
          <Togglable buttonLabel="new blog" ref={blogFromRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} upvote={upvote} user={user} remove={deleteBlog}/>
          )}
        </div>
      }
    </div>
  )
}

export default App
