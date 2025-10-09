import { api } from '../api'

export const categoriesApi = api.injectEndpoints({
	endpoints: builder => ({
		getCategories: builder.query({
			query: () => '/categories',
			providesTags: result =>
				result
					? [
							...result.map(({ _id }) => ({ type: 'Category', id: _id })),
							{ type: 'Category', id: 'LIST' },
					  ]
					: [{ type: 'Category', id: 'LIST' }],
		}),
		addCategory: builder.mutation({
			query: data => ({
				url: '/categories',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: [{ type: 'Category', id: 'LIST' }],
		}),
		deleteCategory: builder.mutation({
			query: id => ({
				url: `/categories/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: 'Category', id: 'LIST' }],
		}),
	}),
	overrideExisting: false,
})

export const {
	useGetCategoriesQuery,
	useAddCategoryMutation,
	useDeleteCategoryMutation,
} = categoriesApi
