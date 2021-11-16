import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/user-event'

import { AUTH_USER_REQUEST } from '../auth'
import { AUTH_USER_SUCCESS } from '../auth'
import { USER_REGISTER_REQUEST } from '../auth'
import { USER_REGISTER_SUCCESS } from '../auth'
import { initialState } from '../auth'
import { authReducer } from '../auth'

describe('auth Reducer', () => {
  it('should return initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState)
  })
  it('should handle auth', () => {
    expect(authReducer(undefined, { type: AUTH_USER_REQUEST })).toEqual({
      ...initialState,
      isLoading: true
    })
    expect(authReducer(undefined, { type: USER_REGISTER_REQUEST })).toEqual({
      ...initialState,
      isLoading: true
    })
  })
  // it('should handle auth success', () => {
  //   expect(
  //     authReducer(undefined, {
  //       type: AUTH_USER_SUCCESS,
  //       payload: { token: 'adskfjkdsjfuio234342', message: 'success' }
  //     })
  //   ).toEqual({
  //     ...initialState,
  //     token: 'adskfjkdsjfuio234342',
  //     message: 'success',
  //     isLoggedIn: true,
  //     isLoading: false
  //   })
  // })
  // it('should handle user register', () => {
  //   expect(
  //     authReducer(undefined, {
  //       type: USER_REGISTER_SUCCESS,
  //       payload: 'success'
  //     })
  //   ).toEqual({
  //     ...initialState,
  //     message: 'success',
  //     isRegistered: true,
  //     isLoading: false
  //   })
  // })
})
