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
         
       })
})

export const {
     useCreateNewAccountMutation,
     useLoginCustomerMutation,
     useInitiatePaymentMutation,
     useGetCustomerProfileQuery,
} = clientApiSlice;