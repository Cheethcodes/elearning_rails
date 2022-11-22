import apiClient from '../services/api'

export const GetCategories = async (id) => {
    let response = await apiClient({
      method: 'get',
      url: id && `/api/v1/categories/${id}` || '/api/v1/categories'
    })

    return response.data
}

export const DeleteCategory = async (id) => {
  let response = await apiClient({
    method: 'delete',
    url: `/api/v1/categories/${id}`
  })

  return response.data
}
