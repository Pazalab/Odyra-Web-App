import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     adminInfo: localStorage.getItem("AdminInfo") ? JSON.parse(localStorage.getItem("AdminInfo")) : null,
     bookings: localStorage.getItem("AdminBookings") ? JSON.parse(localStorage.getItem("AdminBookings")) : [],
     customers: localStorage.getItem("AllCustomers") ? JSON.parse(localStorage.getItem("AllCustomers")) : [],
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