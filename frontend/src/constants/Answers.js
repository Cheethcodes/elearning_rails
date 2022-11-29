import { SaveItem } from "../services/ApiCalls"

const apiLocation = '/api/v1/answers'

export const SaveAnswer = (actionType, data, id) => SaveItem(apiLocation, actionType, data, id)
