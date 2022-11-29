import { GetItem } from '../services/ApiCalls'

const apiLocation = '/api/v1/user_follows'

export const GetFollowActivityCount = (id) => GetItem(apiLocation, id)
