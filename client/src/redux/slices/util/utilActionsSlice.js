import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      dashNotification: { status: false, message: "", type: ""},
      authNotification: { status: false, message: "", type: ""},
      generalNotification: { status: false, message: "", type: ""}
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
           },
           setAuthNotification: (state, action) => {
                   state.authNotification.status = action.payload.status;
                   state.authNotification.message = action.payload.message;
                   state.authNotification.type = action.payload.type;
              },
          clearAuthNotification: (state) => {
               state.authNotification.status = false;
               state.authNotification.type = "";
          },
          setGeneralNotification: (state, action) => {
                state.generalNotification.status = action.payload.status;
                state.generalNotification.message = action.payload.message;
                state.generalNotification.type = action.payload.type;
          },
          clearGeneralNotification: (state) => {
                state.generalNotification.status = false;
                state.generalNotification.type = ""
          }
      }
})

export const {
    setDashboardNotification,
    clearDashboardNotification,
    setAuthNotification,
    clearAuthNotification,
    setGeneralNotification,
    clearGeneralNotification
} = utilActionSlice.actions

export default utilActionSlice.reducer;