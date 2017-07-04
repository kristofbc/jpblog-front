import 'whatwg-fetch';
import { mapJsonToPostModels } from "./../Utils/Post";

export function get(id:number): Promise<Post> {
    return fetch('${ENV_API_URL}/${ENV_API_VERSION}/image/' + id)
        .then((response: Response) => response.json())
        .then((json: any) => mapJsonToPostModels(json)[0]);
}