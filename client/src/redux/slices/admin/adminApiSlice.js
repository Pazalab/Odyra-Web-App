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
              getAdminProfile : builder.query({
                    query: (id) => ({
                          url: `/admin/profile/${id}`,
                          method: "GET"
                    }),
                    providesTags: ["Profile"]
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

            //Update Settings
            updateProfileSettings: builder.mutation({
                  query: (payload) => ({
                        url: "/admin/settings/update-profile-settings",
                        method: "PUT",
                        body: payload
                  }),
                  invalidatesTags: ["Profile"]
            }),

            //Update Pricing Settings
            updatePricingSettings: builder.mutation({
                   query: (payload) => ({
                        url: "/admin/settings/update-pricing-settings",
                        method: "PUT",
                        body: payload
                   }),
                   invalidatesTags: ["Settings"]
            }),

            getPlatformSettings: builder.query({
                   query: () => ({
                          url: "/admin/settings",
                          method: "GET"
                   }),
                   providesTags: ["Settings"]
            }),

       })
})

export const {
     useLoginAdminMutation,
     useGetAdminProfileQuery,
     useLogoutAdminMutation,
     useGetAllBookingsQuery,
     useGetAllCustomersQuery,
     useUpdateBookingStatusMutation,
     useSendPaymentLinkMutation,
     useResendPaymentLinkMutation,
     useUpdateProfileSettingsMutation,
     useUpdatePricingSettingsMutation,
     useGetPlatformSettingsQuery
} = adminApiSlice;