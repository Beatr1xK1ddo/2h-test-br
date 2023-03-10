import { instance } from "./axios"
import { IComment } from "./types"


class CommentsApi {
    getComment = async (id: number): Promise<IComment> => {
        try {
            const response = await instance.get(`item/${id}.json?print=pretty`)
            return response.data
        } catch(e) {
            return Promise.reject(e)
        }
    }
}

export default CommentsApi