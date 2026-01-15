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

             //confirm ride creation
             checkRideStatus: builder.query({
                   query: (rideID) => ({
                          url: `/client/check-ride/${rideID}`,
                          method: "GET"
                   })
             }),
       })
})

export const {
     useCreateNewAccountMutation,
     useLoginCustomerMutation,
     useInitiatePaymentMutation,
     useGetCustomerProfileQuery,
     useLogoutCustomerMutation,
     useGetCustomerBookingsQuery,
     useCheckRideStatusQuery
} = clientApiSlice;