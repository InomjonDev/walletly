import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { api } from './api/api.js'

const reducers = combineReducers({
	[api.reducerPath]: api.reducer,
})

export const store = configureStore({
	reducer: reducers,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(api.middleware),
})
