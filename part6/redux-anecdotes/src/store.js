import { configureStore } from '@reduxjs/toolkit'
import anecdoteRecucer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import thunk from 'redux-thunk'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteRecucer,
    notification: notificationReducer,
    filter: filterReducer
  },
  middleware: [thunk]
})

export default store
