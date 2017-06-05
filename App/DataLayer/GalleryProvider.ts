import { mapJsonToPostModels } from "./../Utils/Post";

export function fetchPosts(order:string, offset: number, limit: number): Promise<Post[]> {
    let params = encodeURIComponent(JSON.stringify({ order, offset, limit }));

    return fetch('http://api.jpblog.dev/v1/find')
        .then((response: Response) => response.json())
        .then((json: any) => mapJsonToPostModels(json));
}