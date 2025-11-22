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
              })
       })
})

export const {
     useLoginAdminMutation,
     useLogoutAdminMutation
} = adminApiSlice;