import { mapJsonToPostModels } from "./../Utils/Post";

export function fetchPosts(order:string, offset: number, limit: number): Promise<Post[]> {
    let params = [["order", order], ["offset", offset], ["limit", limit]].map((params) => {
        return params.join("=");
    }).join("&");

    return fetch('http://api.jpblog.dev/v1/find?' + params)
        .then((response: Response) => response.json())
        .then((json: any) => mapJsonToPostModels(json));
}