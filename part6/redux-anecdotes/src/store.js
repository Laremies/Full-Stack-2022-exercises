import { configureStore } from '@reduxjs/toolkit'
import anecdoteRecucer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteRecucer,
    notification: notificationReducer,
    filter: filterReducer
  }
})

export default store
