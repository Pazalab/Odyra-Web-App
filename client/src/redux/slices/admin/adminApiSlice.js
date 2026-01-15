import { apiSlice } from "../apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
       endpoints: (builder) => ({
              loginAdmin: builder.mutation({
                   query: (payload) => ({
                         url: "admin/login",
                         method: "POST",
                         body: payload
                   })
              }),
              logoutAdmin: builder.mutation({
                   query: () => ({
                        url: "admin/logout",
                        method: "POST",
                   })
              }),
             
           //get all bookings
            getAllBookings: builder.query({
                   query: () => ({
                         url: "/admin/all-bookings",
                         method: "GET"
                   })
            }),

            //Get all customers
            getAllCustomers: builder.query({
                  query: () => ({
                        url: "/admin/all-customers",
                        method: "GET"
                  })
            })
       })
})

export const {
     useLoginAdminMutation,
     useLogoutAdminMutation,
     useGetAllBookingsQuery,
     useGetAllCustomersQuery
} = adminApiSlice;