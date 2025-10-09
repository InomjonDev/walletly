import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
	reducerPath: 'api',
	tagTypes: ['Transaction', 'Category'],
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:4400/api',
		prepareHeaders: headers => {
			const token = localStorage.getItem('token')
			if (token) {
				headers.set('Authorization', `Bearer ${token}`)
			}
			return headers
		},
	}),
	endpoints: () => ({}),
})
