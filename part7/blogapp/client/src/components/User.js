import { ListGroup } from "react-bootstrap"

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <b>Added blogs</b>
      <ListGroup style={{ marginTop: 5}}>
        {user.blogs.map(blog => {
          let url = blog.url
          if (url.substring(0, 4) !== 'http') { url = 'https://' + blog.url}
          return (
            <ListGroup.Item key={blog.id} action href={`${url}`} target='_blank'>
              {blog.title} by {blog.author}
            </ListGroup.Item>
          )
        })}
      </ListGroup>
    </div>
  )
}

export default User
