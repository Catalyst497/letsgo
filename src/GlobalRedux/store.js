import {configureStore} from "@reduxjs/toolkit";
import appReducer from './slices/AppSlice.js'
import userReducer from './slices/UserSlice.js'

const store = configureStore({
  reducer : {
    user : userReducer,
    app : appReducer,
  },
  devTools: false
})

export default store;