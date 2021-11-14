import React from 'react'

import '@testing-library/jest-dom/extend-expect'
import '@testing-library/user-event'

import { VIEW_WATCHLIST_REQUEST,
        VIEW_WATCHLIST_SUCCESS,
        VIEW_WATCHLIST_FAIL,
        ADD_TO_WATCHLIST_REQUEST,
        ADD_TO_WATCHLIST_SUCCESS,
        ADD_TO_WATCHLIST_FAIL,
        REMOVE_FROM_WATCHLIST_REQUEST,
        REMOVE_FROM_WATCHLIST_SUCCESS,
        REMOVE_FROM_WATCHLIST_FAIL,
        watchlistReducer,
        initialState
} from "../watchlist";


describe('watchlist Reducer', () => {
    it('should return initial state', () => {
        expect(watchlistReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle view watchlist request', () => {
        expect(watchlistReducer(undefined, { type: VIEW_WATCHLIST_REQUEST })).toEqual({
            ...initialState,
            isLoading: true
        })
    })

    it('should handle remove from watchlist request', () => {
        expect(watchlistReducer(undefined, { type: REMOVE_FROM_WATCHLIST_REQUEST })).toEqual({
            ...initialState,
            isLoading: true
        })
    })

    it('should handle add to watchlist request', () => {
        expect(
            watchlistReducer(undefined, {
                type: ADD_TO_WATCHLIST_REQUEST,
                payload: { brands: ['BNBUSDT'] }
            })
        ).toEqual({
            ...initialState,
            added: ['BNBUSDT'],
            isLoading: true
        })
    })

    it('should handle view watchlist success', () => {
        expect(
            watchlistReducer(undefined, {
                type: VIEW_WATCHLIST_SUCCESS,
                payload: { brands: ['BNBUSDT'], message:"Mock message" }
            })
        ).toEqual({
            ...initialState,
            brands: ['BNBUSDT'],
            message: "Mock message",
            isLoading: false
        })
    })

    it('should handle view watchlist fail', () => {
        expect(
            watchlistReducer(undefined, {
                type: VIEW_WATCHLIST_FAIL,
                payload: "Mock message"
            })
        ).toEqual({
            ...initialState,
            message: "Mock message",
            isLoading: false
        })
    })

    it('should handle add to watchlist success', () => {
        expect(
            watchlistReducer(undefined, {
                type: ADD_TO_WATCHLIST_SUCCESS,
                payload: "Mock message"
            })
        ).toEqual({
            ...initialState,
            message: "Mock message",
            isLoading: false
        })
    })

    it('should handle add to watchlist fail', () => {
        expect(
            watchlistReducer(undefined, {
                type: ADD_TO_WATCHLIST_FAIL,
                payload: "Mock message"
            })
        ).toEqual({
            ...initialState,
            message: "Mock message",
            isLoading: false
        })
    })

    it('should handle remove from watchlist success', () => {
        expect(
            watchlistReducer(undefined, {
                type: REMOVE_FROM_WATCHLIST_SUCCESS,
                payload: { brands: ['BNBUSDT'], message:"Mock message" }
            })
        ).toEqual({
            ...initialState,
            brands: ['BNBUSDT'],
            message: "Mock message",
            isLoading: false
        })
    })

    it('should handle remove from watchlist fail', () => {
        expect(
            watchlistReducer(undefined, {
                type: REMOVE_FROM_WATCHLIST_FAIL,
                payload: "Mock message"
            })
        ).toEqual({
            ...initialState,
            message: "Mock message",
            isLoading: false
        })
    })
})