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
                   }),
                   providesTags: ["Bookings"]
            }),

            //Get all customers
            getAllCustomers: builder.query({
                  query: () => ({
                        url: "/admin/all-customers",
                        method: "GET"
                  })
            }),

            //Update booking status
             updateBookingStatus: builder.mutation({
                   query: (payload) => ({
                         url: "admin/booking/update-status",
                         method: "PATCH",
                         body: payload
                   }),
                   invalidatesTags: ["Bookings"]
             }),

             //Send payment link
             sendPaymentLink: builder.mutation({
                   query: (payload) => ({
                          url: "/admin/booking/send-payment-link",
                          method: "POST",
                          body: payload,
                   }),
                   invalidatesTags: ["Bookings"]
             }),

             //Resend Payment Link
             resendPaymentLink: builder.mutation({
                   query: (payload) => ({
                          url: "/admin/booking/resend-payment-link",
                          method: "POST",
                          body: payload
                   })
             }),

       })
})

export const {
     useLoginAdminMutation,
     useLogoutAdminMutation,
     useGetAllBookingsQuery,
     useGetAllCustomersQuery,
     useUpdateBookingStatusMutation,
     useSendPaymentLinkMutation,
     useResendPaymentLinkMutation
} = adminApiSlice;