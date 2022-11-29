import { DeleteItem, GetItem, SaveItem } from "../services/ApiCalls"

const apiLocation = '/api/v1/words'

export const GetWords = (id) => GetItem(apiLocation, id)
export const DeleteWord = (id) => DeleteItem(apiLocation, id)
export const SaveWord = (actionType, data, id) => SaveItem(apiLocation, actionType, data, id)
