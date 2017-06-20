import { headerNavigationElementLoadAction, HeaderNavigationElementLoadActionPayload } from "../Actions/HeaderNavigationElementLoadAction";

export function loadNavigationElement(): ReduxActions.Action<HeaderNavigationElementLoadActionPayload[]> {
    let payload:HeaderNavigationElementLoadActionPayload[] = [{
        name: "Récent",
        selected: true,
        url: "/latest"
    }];

    return headerNavigationElementLoadAction(payload);
}