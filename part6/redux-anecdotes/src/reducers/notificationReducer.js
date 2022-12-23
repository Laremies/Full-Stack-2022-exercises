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

let notificationTimeoutId = null;
export const notify = (text, showFor = 5) => {
  return async (dispatch) => {
    // Clear the previous timeout, if it exists
    if (notificationTimeoutId) {
      clearTimeout(notificationTimeoutId);
    }

    const milliToSec = 1000
    dispatch(showNotification(text))
    notificationTimeoutId = setTimeout(() => dispatch(hideNotification()), showFor * milliToSec)
  }
}

export default notificationSlice.reducer
