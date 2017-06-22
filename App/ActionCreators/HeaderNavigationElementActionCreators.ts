import { headerNavigationElementLoadAction, HeaderNavigationElementLoadActionPayload } from "../Actions/HeaderNavigationElementLoadAction";

export function loadNavigationElement(): ReduxActions.Action<HeaderNavigationElementLoadActionPayload[]> {
    let payload:HeaderNavigationElementLoadActionPayload[] = [{
        name: "Photos",
        selected: true,
        url: "/photos"
    }];

    return headerNavigationElementLoadAction(payload);
}