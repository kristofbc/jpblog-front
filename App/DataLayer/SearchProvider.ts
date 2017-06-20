import { mapJsonToPostModels } from "./../Utils/Post";

export function fetchResults(query:string): Promise<Post[]> {
    let params = encodeURIComponent(query);
    return fetch('${ENV_API_URL}/${ENV_API_VERSION}/search/' + params)
        .then((response: Response) => response.json())
        .then((json: any) => mapJsonToPostModels(json));
}