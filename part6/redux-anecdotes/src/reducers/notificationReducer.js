import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification(state, action) {
      state = action.payload
      return state
    },
    hideNotification() { 
      return ''
    }
  }
})

const { showNotification, hideNotification} = notificationSlice.actions

export const notify = (text, showFor = 5) => {
  return async (dispatch) => {
    const milliToSec = 1000
    dispatch(showNotification(text))
    setTimeout(() => dispatch(hideNotification()), showFor * milliToSec)
  }
}

export default notificationSlice.reducer
