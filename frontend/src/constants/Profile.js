import apiClient from '../services/api'

export const GetProfile = async (id) => {
  let response = await apiClient({
    method: 'get',
    url: `/api/v1/users/${id}`
  })

  return response.data
}
