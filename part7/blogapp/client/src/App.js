import { useState, useEffect } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import { Button } from 'react-bootstrap'

import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'

import loginService from './services/login'
import userService from './services/user'
import usersService from './services/users'

const App = () => {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      setUser(userFromStorage)
    }
  }, [])

  useEffect(() => {
    usersService.getAll().then(users =>
      setUsers(users)
      )
  }, [])

  
  const login = async (username, password) => {
    loginService.login({
      username, password,
    }).then(user => {
      setUser(user)
      userService.setUser(user)
      notify(`${user.name} logged in!`)
    }).catch(() => {
      notify('wrong username/password', 'danger')
    })
  }


  const logout = () => {
    setUser(null)
    userService.clearUser()
    notify('Goodbye!')
  }


  const notify = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }


  const match = useMatch('/users/:id')
  const chosenUser = match
    ? users.find(user => user.id === match.params.id)
    : null

  if (user === null) {
    return <div className='container'>
      <Notification notification={notification} />
      <LoginForm onLogin={login} />
    </div>
  }

  return (
    <div className='container'>
      <h2>Blogs</h2>
      <Notification notification={notification} />
      <div style={{ marginBottom: 15 }}>
        {user.name} logged in
        <Button style={{ marginLeft: 10 }}
                variant='outline-secondary'
                size='sm' onClick={logout}
                >
          logout
        </Button>
      </div>
      <Menu />
      <Routes>
        <Route path='/' element={<BlogList user={user} notify={notify} />} />
        <Route path='/users' element={<UserList users={users} />} />
        <Route path='/users/:id' element={<User user={chosenUser} />} />
      </Routes>
    </div>
  )
}

export default App
