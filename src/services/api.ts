import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  DecisionType,
  IfStatementsType,
  PolicyResponseType,
  PolicyType,
} from 'policies'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
  }),
  tagTypes: ['Policies'],
  endpoints: (build) => ({
    getPolicies: build.query<PolicyResponseType, void>({
      query: () => '/policies',
      providesTags: ['Policies'],
    }),
    getPolicy: build.query<PolicyType, string>({
      query: (id) => `/policies/${id}`,
      providesTags: ['Policies'],
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
      invalidatesTags: ['Policies'],
    }),
    executePolicy: build.mutation<
      DecisionType,
      { id: string; body: Record<string, string> }
    >({
      query: ({ id, body }) => {
        return {
          url: `/policies/${id}/decision`,
          method: 'POST',
          body,
        }
      },
    }),
    createPolicy: build.mutation<
      PolicyType,
      { body: Pick<PolicyType, 'name'> }
    >({
      query: ({ body }) => {
        return {
          url: '/policies',
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['Policies'],
    }),
    deletePolicy: build.mutation<void, { id: number }>({
      query: ({ id }) => {
        return {
          url: `/policies/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Policies'],
    }),
    addIfStatement: build.mutation<
      IfStatementsType,
      { id: string; body: Partial<Omit<IfStatementsType, 'id'>> }
    >({
      query: ({ id, body }) => ({
        url: `/policies/${id}/if_statements`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Policies'],
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData('getPolicy', id, (draft) => {
            draft.if_statements.push({ id: 0, ...patch.body })
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
    editIfStatement: build.mutation<
      IfStatementsType,
      { id: string; body: Partial<IfStatementsType> }
    >({
      query: ({ body }) => ({
        url: `/if_statements/${body.id}`,
        method: 'PUT',
        body,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData('getPolicy', data.id, (draft) => {
            draft.if_statements = draft.if_statements.map((item) => {
              if (item.id === Number(data.body.id)) {
                return {
                  ...item,
                  ...data.body,
                }
              }

              return item
            })
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
  }),
})

export const {
  useGetPoliciesQuery,
  useGetPolicyQuery,
  useEditPolicyMutation,
  useExecutePolicyMutation,
  useCreatePolicyMutation,
  useDeletePolicyMutation,
  useAddIfStatementMutation,
  useEditIfStatementMutation,
} = api
