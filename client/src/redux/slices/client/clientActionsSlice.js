import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      clientInfo: localStorage.getItem("ClientInfo") ? JSON.parse(localStorage.getItem("ClientInfo")) : null
}

const clientActionSlice = createSlice({
     name: "client",
     initialState,
     reducers: {
           setCustomerCredentials: (state, action) => {
              
           }
     }
})

export const {
      setCustomerCredentials,
} = clientActionSlice.actions;

export default clientActionSlice.reducer;