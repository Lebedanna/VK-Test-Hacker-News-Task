import axios from 'axios';
import { StoriesItem } from "../types";

export const $host = axios.create({
    baseURL: 'https://hacker-news.firebaseio.com/v0/'
})

export async function fetchNewPostsId() {
    const {data} = await $host.get<number[]>('/newstories.json?print=pretty')
    return data
}

export async function fetchOnePost(id: number) {
    const {data} = await $host.get<StoriesItem>(`/item/${id}.json?print=pretty`)
    return data
}


export async function getLatestNews() {
    const postsId = await fetchNewPostsId()
    const promises = postsId.slice(0, 100)
        .map(id => fetchOnePost(id))
    return await Promise.all(promises)
}

export async function getComments(idArray: number[]) {
    const promises = idArray.map(id => fetchOnePost(id))
    return await Promise.all(promises)
}

export function timeConverter(UNIX_timestamp: number) {
    const a = new Date(UNIX_timestamp * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    return date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
}