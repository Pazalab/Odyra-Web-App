import { apiSlice } from "../apiSlice";

export const clientApiSlice = apiSlice.injectEndpoints({
       endpoints: (builder) => ({
              //create new customer account
              createNewAccount: builder.mutation({
                     query: (payload) => ({
                           url: "/client/sign-up",
                           method: "POST",
                           body: payload
                     })
              }),

              //login customer
              loginCustomer: builder.mutation({
                   query: (payload) => ({
                         url: "/client/login",
                         method: "POST",
                         body: payload
                   })
              }),

              //send reset code
              sendResetInstructions: builder.mutation({
                   query: (payload) => ({
                        url: "/client/send-reset-instructions",
                        body: payload,
                        method: "POST"
                   })
              }),

              //verify reset code
              verifyResetCode: builder.mutation({
                   query: (payload) => ({
                        url: "/client/verify-reset-code",
                        body: payload,
                        method: "POST"
                   })
              }),

              //reset password initiation
              resetPasswordCustomer: builder.mutation({
                  query: (payload) => ({
                        url: "/client/reset-password",
                        method: "PUT",
                        body: payload
                  })
              }),

              //Logout Customer
              logoutCustomer: builder.mutation({
                    query: () => ({
                           url: "/client/logout",
                           method: "POST"
                    })
              }),

              //getcustomer profile
              getCustomerProfile: builder.query({
                    query: () => ({
                          url: `/client/profile`,
                          method: "GET"
                    })
              }),

              //create new booking
              createNewBooking: builder.mutation({
                     query: (payload) => ({
                           url: "/client/create-booking",
                           method: "POST",
                           body: payload
                     }),
                     invalidatesTags: ["Bookings"]
              }),
              //initiate payment
              initiatePayment: builder.mutation({
                   query: (payload) => ({
                         url: "/client/initiate-payment",
                         method: "POST",
                         body: payload
                   })
              }),
         
              //Get customer bookings
             getCustomerBookings: builder.query({
                   query: () => ({
                        url: "/client/customer-bookings",
                        method: "GET"
                   })
             }),

             //edit customer profile
             updateCustomerProfile: builder.mutation({
                   query: (payload) => ({
                        url: "/client/customer-update",
                        method: "PUT",
                        body: payload,
                   })
             }),

             updateCustomerPassword: builder.mutation({
                   query: (payload) => ({
                         url: "/client/customer-password-update",
                         method: "PUT",
                         body: payload
                   })
             }),

             //confirm ride creation
             checkRideStatus: builder.query({
                   query: (rideID) => ({
                          url: `/client/check-ride/${rideID}`,
                          method: "GET"
                   })
             }),

             //confirm ride confirmation
             checkRideTransaction: builder.query({
                  query: (rideID) => ({
                         url: `/client/check-transaction/${rideID}`,
                         method: "GET"
                  })
             }),

                        //Verify Payment Link
           verifyPaymentLink: builder.mutation({
                 query: (payload) => ({
                         url: "/client/booking/verify-payment-link",
                         method: "POST",
                         body: payload
                 })
           }),

           getPlatformSettingsForClient: builder.query({
                 query: () => ({
                       url: "/client/settings",
                       method: "GET"
                 }),
                 providesTags: ["Settings"]
           })
       })
})

export const {
     useCreateNewAccountMutation,
     useLoginCustomerMutation,
     useSendResetInstructionsMutation,
     useVerifyResetCodeMutation,
     useResetPasswordCustomerMutation,
     useCreateNewBookingMutation,
     useInitiatePaymentMutation,
     useGetCustomerProfileQuery,
     useUpdateCustomerProfileMutation,
     useUpdateCustomerPasswordMutation,
     useLogoutCustomerMutation,
     useGetCustomerBookingsQuery,
     useCheckRideStatusQuery,
     useCheckRideTransactionQuery,
     useVerifyPaymentLinkMutation,
     useGetPlatformSettingsForClientQuery
} = clientApiSlice;