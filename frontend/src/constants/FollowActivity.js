import apiClient from '../services/api'

export const GetFollowActivityCount = async (id) => {
    let response = await apiClient({
        method: 'get',
        url: `/api/v1/user_follows/${id}`
    })

    return response.data
}
