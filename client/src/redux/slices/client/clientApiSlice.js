import { apiSlice } from "../apiSlice";

export const clientApiSlice = apiSlice.injectEndpoints({
       endpoints: (builder) => ({
              recordBooking: builder.mutation({
                   query: (payload) => ({
                          url: "client/new-booking",
                          method: "POST",
                          body: payload
                   })
              })
       })
})

export const {
     useRecordBookingMutation,
} = clientApiSlice;