import { createSlice } from '@reduxjs/toolkit'
import { PolicyType } from 'policies'
import { api } from './api'
import { RootState } from './store'

type PoliciesState = {
  policies: PolicyType[] | null
  policy: PolicyType | null
}

const initialState: PoliciesState = {
  policies: null,
  policy: null,
}

const slice = createSlice({
  name: 'policies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getPolicies.matchFulfilled,
      (state, { payload }) => {
        state.policies = payload.content
      }
    )
    builder.addMatcher(
      api.endpoints.getPolicy.matchFulfilled,
      (state, { payload }) => {
        state.policy = payload
      }
    )
    builder.addMatcher(
      api.endpoints.editPolicy.matchFulfilled,
      (state, { payload }) => {
        state.policy = payload
      }
    )
  },
})

export default slice.reducer
export const selectPolicy = (state: RootState) => state.policies.policy
