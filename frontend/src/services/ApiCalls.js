import apiClient from './api'

export const GetItem = async (apiLocation, id) => {
  let response = await apiClient({
    method: 'get',
    url: id && `${apiLocation}/${id}` || apiLocation
  })

  return response.data
}

export const DeleteItem = async (apiLocation, id) => {
  let response = await apiClient({
    method: 'delete',
    url: `${apiLocation}/${id}`
  })

  return response.data
}

export const SaveItem = async (apiLocation, actionType, data, id) => {
  let response = await apiClient({
    method: actionType === 'update' ? 'patch' : 'post',
    url: actionType === 'update' ? `${apiLocation}/${id}` : apiLocation,
    data: data
  })

  return response.data
}
