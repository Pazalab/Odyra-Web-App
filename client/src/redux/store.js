import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./slices/apiSlice";
import ClientReducer from "./slices/client/clientActionsSlice";
import AdminReducer from "./slices/admin/adminActionsSlice";

const store = configureStore({
      reducer: {
           client: ClientReducer,
           admin: AdminReducer,
           [ apiSlice.reducerPath ]: apiSlice.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
      devTools: true
})

setupListeners(store.dispatch);

export default store;