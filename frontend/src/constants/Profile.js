import { GetItem, SaveItem } from '../services/ApiCalls'

const apiLocation = '/api/v1/users'

export const GetProfile = (id) => GetItem(apiLocation, id)
export const SaveProfile = (actionType, data, id) => SaveItem(apiLocation, actionType, data, id)
