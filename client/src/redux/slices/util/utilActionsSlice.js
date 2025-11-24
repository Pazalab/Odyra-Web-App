import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      dashNotification: { status: false, message: "", type: ""}
}

const utilActionSlice = createSlice({
      name: "utils",
      initialState,
      reducers: {
           setDashboardNotification: (state, action) => {
                state.dashNotification.status = action.payload.status;
                state.dashNotification.message = action.payload.message;
                state.dashNotification.type = action.payload.type
           },
           clearDashboardNotification: (state) => {
                state.dashNotification.status = false;
                state.dashNotification.message = "";
                state.dashNotification.type = ""
           }
      }
})

export const {
    setDashboardNotification,
    clearDashboardNotification,

} = utilActionSlice.actions

export default utilActionSlice.reducer;