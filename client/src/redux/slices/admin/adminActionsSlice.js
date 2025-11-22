import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     adminInfo: localStorage.getItem("AdminInfo") ? JSON.parse(localStorage.getItem("AdminInfo")) : null,
}

const adminActionSlice = createSlice({
       name: "admin",
       initialState,
       reducers: {
              setAdminCredentials: (state, action) => {
                     state.adminInfo = action.payload;
                     localStorage.setItem("AdminInfo", JSON.stringify(action.payload))
              },
              clearAdminCredentials: (state) => {
                     state.adminInfo = null;
                     localStorage.removeItem("AdminInfo")
              }
       }
})

export const {
      setAdminCredentials,
      clearAdminCredentials,
} = adminActionSlice.actions;

export default adminActionSlice.reducer;