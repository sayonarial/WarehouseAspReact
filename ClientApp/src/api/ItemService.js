import axios from 'axios';

const BASE_URL = 'https://localhost:7224/api';

export default class ItemsServise {
    static async getAllItems(){
        const response = await axios.get(
            (BASE_URL + '/WhItems')
        )
        return response.data
    }

    static async addItem(item){
        const response = await axios.post(
            (BASE_URL + '/WhItems'),
            item
        )
        return response.data
    }

    static async removeItem(item){
        const response = await axios.delete(
            (BASE_URL + '/WhItems/' + item.id)
        ) 
        return response.data
    }

}