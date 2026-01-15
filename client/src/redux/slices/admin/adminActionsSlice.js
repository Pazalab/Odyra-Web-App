import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     adminInfo: localStorage.getItem("AdminInfo") ? JSON.parse(localStorage.getItem("AdminInfo")) : null,
     bookings: localStorage.getItem("AdminBookings") ? JSON.parse(localStorage.getItem("AdminBookings")) : [],
     customers: localStorage.getItem("AllCustomers") ? JSON.parse(localStorage.getItem("AllCustomers")) : []
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
              },
              setRideBookings: (state, action) => {
                     state.bookings = action.payload;
                     localStorage.setItem("AdminBookings", JSON.stringify(action.payload));
              },
              setAllCustomers: (state, action) => {
                     state.customers = action.payload;
                     localStorage.setItem("AllCustomers", JSON.stringify(action.payload))
              }
       }
})

export const {
      setAdminCredentials,
      clearAdminCredentials,
      setRideBookings,
      setAllCustomers
} = adminActionSlice.actions;

export default adminActionSlice.reducer;