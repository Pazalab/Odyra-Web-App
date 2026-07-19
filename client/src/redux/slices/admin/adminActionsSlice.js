import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     adminInfo: localStorage.getItem("AdminInfo") ? JSON.parse(localStorage.getItem("AdminInfo")) : null,
     profile: localStorage.getItem("Profile") ? JSON.parse(localStorage.getItem("Profile")) : null,
     bookings: [],
     customers: [],
     transactions: [],
     isSidebarActive: false,
     platformSettings: null
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
                     localStorage.clear();
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
              setAdminPlatformSettings: (state, action) => {
                     state.platformSettings = action.payload;
              },

              setAdminTransactions: (state, action) => {
                    state.transactions = action.payload;
              },

              clearEverything: (state) => {
                     state.bookings = []
                     state.customers = []
                     localStorage.clear();
                     state.platformSettings = null;
                     state.profile = null;
              }
       }
})

export const {
      setAdminCredentials,
      setAdminProfile,
      clearAdminProfile,
      clearAdminCredentials,
      setRideBookings,
      setAllCustomers,
      openMobileSidebar,
      closeMobileSidebar,
      setAdminTransactions,

      setAdminPlatformSettings,
      clearAdminPlatformSettings,
      clearEverything,
} = adminActionSlice.actions;

export default adminActionSlice.reducer;