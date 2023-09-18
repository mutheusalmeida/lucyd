import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { PolicyResponseType, PolicyType } from 'policies'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
  }),
  endpoints: (build) => ({
    getPolicies: build.query<PolicyResponseType, void>({
      query: () => '/policies',
    }),
    getPolicy: build.query<PolicyType, string>({
      query: (id) => `/policies/${id}`,
    }),
    editPolicy: build.mutation<
      PolicyType,
      { id: string; body: Pick<PolicyType, 'name'> }
    >({
      query: ({ id, body }) => {
        return {
          url: `/policies/${id}`,
          method: 'PUT',
          body,
        }
      },
    }),
  }),
})

export const { useGetPoliciesQuery, useGetPolicyQuery, useEditPolicyMutation } =
  api
