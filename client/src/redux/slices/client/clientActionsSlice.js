import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      clientInfo: localStorage.getItem("ClientInfo") ? JSON.parse(localStorage.getItem("ClientInfo")) : null,
      profile: localStorage.getItem("ClientProfile") ? JSON.parse(localStorage.getItem("ClientProfile")) : null,
      settings: null
}

const clientActionSlice = createSlice({
     name: "client",
     initialState,
     reducers: {
           setCustomerCredentials: (state, action) => {
                state.clientInfo = action.payload;
                localStorage.setItem("ClientInfo", JSON.stringify(action.payload));
           },
           clearCustomerCredentials: (state) => {
                 state.clientInfo = null;
                 localStorage.removeItem("ClientInfo");
           },
           setCustomerProfile:(state, action) => {
               state.profile = action.payload;
               localStorage.setItem("ClientProfile", JSON.stringify(action.payload));
           },
           clearCustomerProfile: (state) => {
                state.profile = null;
                localStorage.removeItem("ClientProfile")
           },
           addBookingsToProfile: (state, action) => {
                state.profile.bookings = action.payload;
                localStorage.setItem("ClientProfile", JSON.stringify(state.profile))
           },
           clearProfileBookings: (state) => {
                state.profile.bookings = null;
           },
           setGeneralSettings: (state, action) => {
                state.settings = action.payload
           }

     }
})

export const {
      setCustomerCredentials,
      clearCustomerCredentials,
      setCustomerProfile,
      clearCustomerProfile,
      addBookingsToProfile,
      clearProfileBookings,
      setGeneralSettings
} = clientActionSlice.actions;

export default clientActionSlice.reducer;