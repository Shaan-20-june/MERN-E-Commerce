import { apiSlice } from './apislice'
import { ORDERS_URL } from '../constants'

// Get all orders for logged in user
export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: { ...order },
      }),
    }),
  }),
})

export const { useCreateOrderMutation } = orderApiSlice
