import { instance } from "./axios"
import { IStory } from "./types"


class StoriesApi {
    getAllStories = async (): Promise<Array<number>> => {
        try {
            const response = await instance.get('topstories.json?print=pretty')
            return response.data
        } catch(e) {
            return Promise.reject(e)
        }
    }

    getStory = async (id: number): Promise<IStory> => {
        try {
            const response = await instance.get(`item/${id}.json?print=pretty`)
            return response.data
        } catch(e) {
            return Promise.reject(e)
        }
    }
}

export default StoriesApi