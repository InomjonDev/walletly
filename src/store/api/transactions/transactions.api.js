import { api } from '../api'

export const transactionsApi = api.injectEndpoints({
	endpoints: builder => ({
		getTransactions: builder.query({
			query: () => '/transactions',
			providesTags: result =>
				result
					? [
							...result.map(({ _id }) => ({ type: 'Transaction', id: _id })),
							{ type: 'Transaction', id: 'LIST' },
					  ]
					: [{ type: 'Transaction', id: 'LIST' }],
		}),
		addTransaction: builder.mutation({
			query: data => ({
				url: '/transactions',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: [{ type: 'Transaction', id: 'LIST' }],
		}),
		deleteTransaction: builder.mutation({
			query: id => ({
				url: `/transactions/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: 'Transaction', id: 'LIST' }],
		}),
	}),
	overrideExisting: false,
})

export const {
	useGetTransactionsQuery,
	useAddTransactionMutation,
	useDeleteTransactionMutation,
} = transactionsApi
