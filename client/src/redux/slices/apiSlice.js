import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.PROD ? import.meta.env.VITE_PROD_SERVER_URL : import.meta.env.VITE_DEV_SERVER_URL;


const baseQuery = fetchBaseQuery({
      baseUrl: `${BASE_URL}`,
      credentials: "include"
})

export const apiSlice = createApi({
       baseQuery,
       tagTypes: ["Bookings", "Profile", "Settings"],
       endpoints: () => ({})
})