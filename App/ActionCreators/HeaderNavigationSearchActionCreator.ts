import { headerNavigationSearchTypingAction, HeaderNavigationSearchTypingActionPayload } from "../Actions/HeaderNavigationSearchAction";

export function searchTyping( query:string ): ReduxActions.Action<HeaderNavigationSearchTypingActionPayload> {
    return headerNavigationSearchTypingAction({ query: query });
}