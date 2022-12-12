import { useState } from 'react'

const Blog = ({blog, upvote, user, remove}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [hide, setHide] = useState(true)

  const handleVisibility = () => {
    setHide(!hide)
  }
  
  const handleLike = () => {
    const liked = {...blog, likes: blog.likes + 1}
    upvote(liked)
  }

  const handleDelete = () => {
    remove(blog)
  }
  
  if (hide) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={handleVisibility}>view</button>
      </div>
    )  
  }

  const deleteButton = user.name === blog.user.name && user.username === blog.user.username ? 
                      <button onClick={handleDelete}>delete</button> : null

  return (
    <div style={blogStyle}>
      <p>
        {blog.title} {blog.author} <button onClick={handleVisibility}>hide</button><br/>
        {blog.url}<br/>
        likes {blog.likes} <button onClick={handleLike}>like</button><br/>
        {blog.user.username}<br/>
        {deleteButton}
      </p>
    </div>
  )
}

export default Blog
