import { useEffect, useRef, useState } from 'react'

import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'
import Blog from './Blog'

import blogService from '../services/blogs'

const BlogList = ({ user, notify }) => {
  const [blogs, setBlogs] = useState([])
  const byLikes = (b1, b2) => b2.likes>b1.likes ? 1 : -1
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(byLikes) )
      )
  }, [])


  const createBlog = async (blog) => {
    blogService.create(blog).then(createdBlog => {
      notify(`A new blog '${createdBlog.title}' by ${createdBlog.author} added.`)
      setBlogs(blogs.concat(createdBlog))
      blogFormRef.current.toggleVisibility()
    }).catch(error => {
      notify('Creating a blog failed: ' + error.response.data.error, 'alert')
    })
  }


  const likeBlog = async (id) => {
    const toLike = blogs.find(b => b.id === id)
    const liked = {
      ...toLike,
      likes: (toLike.likes||0) + 1,
      user: toLike.user.id
    }

    blogService.update(liked.id, liked).then(updatedBlog => {
      notify(`You liked '${updatedBlog.title}' by ${updatedBlog.author}.`)
      const updatedBlogs = blogs
        .map(b => b.id===id ? updatedBlog : b)
        .sort(byLikes)
      setBlogs(updatedBlogs)
    })
  }


  const removeBlog = (id) => {
    const toRemove = blogs.find(b => b.id === id)

    const ok = window.confirm(`Remove '${toRemove.title}' by ${toRemove.author}?`)

    if (!ok) {
      return
    }

    blogService.remove(id).then(() => {
      const updatedBlogs = blogs
        .filter(b => b.id!==id)
        .sort(byLikes)
      setBlogs(updatedBlogs)
    })
  }


  return (
    <div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <NewBlogForm
          onCreate={createBlog}
        />
      </Togglable>

      <div id='blogs'>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
            user={user}
          />
        )}
      </div>
    </div>
  )
}

export default BlogList