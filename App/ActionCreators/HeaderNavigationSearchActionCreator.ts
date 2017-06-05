import { Dispatch } from "redux";

import { headerNavigationSearchTypingAction, HeaderNavigationSearchTypingActionPayload } from "../Actions/HeaderNavigationSearchAction";
import { headerNavigationSearchStartAction, HeaderNavigationSearchStartActionPayload } from "../Actions/HeaderNavigationSearchAction";
import { headerNavigationSearchSuccessAction, HeaderNavigationSearchSuccessActionPayload } from "../Actions/HeaderNavigationSearchAction";
import { headerNavigationSearchErrorAction, HeaderNavigationSearchErrorActionPayload } from "../Actions/HeaderNavigationSearchAction";

import * as SearchProvider from "../DataLayer/SearchProvider";

export function searchTyping( query:string ): ReduxActions.Action<HeaderNavigationSearchTypingActionPayload> {
    return headerNavigationSearchTypingAction({ query: query });
}

export function fetchResults( query:string ): (dispatcher: Dispatch<{}>) => Promise<{}> {
    return (dispatch: Dispatch<{}>) => {
        dispatch(headerNavigationSearchStartAction({ query }));

        return SearchProvider.fetchResults(query)
            .then((result: Post[]) => dispatch(headerNavigationSearchSuccessAction({query, posts: result})))
            .catch((e) => dispatch(headerNavigationSearchErrorAction({query, error: e})));
    }
}