import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filter(state, action) {
      state = action.payload
      return state
    }
  }
})

export const { filter } = filterSlice.actions
export default filterSlice.reducer
