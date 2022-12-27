import { Link } from "react-router-dom"
import Table from 'react-bootstrap/Table'

const UserList = ({ users }) => (
  <div>
 
    <Table hover bordered>
      <thead>
        <tr>
          <th>Users</th>
          <th>Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => 
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
          )}
      </tbody>
    </Table>
  </div>
)

export default UserList
