import { DeleteItem, GetItem, SaveItem } from "../services/ApiCalls"

const apiLocation = '/api/v1/categories'

export const GetCategories = (id) => GetItem(apiLocation, id)
export const DeleteCategory = (id) => DeleteItem(apiLocation, id)
export const SaveCategory = (actionType, data, id) => SaveItem(apiLocation, actionType, data, id)
