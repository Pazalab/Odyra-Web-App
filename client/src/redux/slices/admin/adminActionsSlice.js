import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     adminInfo: localStorage.getItem("AdminInfo") ? JSON.parse(localStorage.getItem("AdminInfo")) : null,
     profile: localStorage.getItem("Profile") ? JSON.parse(localStorage.getItem("Profile")) : null,
     bookings: [],
     customers: [],
     isSidebarActive: false
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
              },
              openMobileSidebar: (state) => {
                     state.isSidebarActive = true;
              },
              closeMobileSidebar: (state) => {
                      state.isSidebarActive = false;
              },
              setAdminProfile: (state, action) => {
                     state.profile = action.payload;
                     localStorage.setItem("Profile", JSON.stringify(action.payload))
              },
              clearAdminProfile: (state) => {
                     state.profile = null;
                     localStorage.removeItem("Profile")
              }
       }
})

export const {
      setAdminCredentials,
      clearAdminCredentials,
      setRideBookings,
      setAllCustomers,
      openMobileSidebar,
      closeMobileSidebar
} = adminActionSlice.actions;

export default adminActionSlice.reducer;