import { mapJsonToPostModels } from "./../Utils/Post";

export function fetchResults(query:string): Promise<Post[]> {
    let params = encodeURIComponent(query);
    return fetch('http://api.jpblog.dev/v1/search/' + params)
        .then((response: Response) => response.json())
        .then((json: any) => mapJsonToPostModels(json));
}