import { headerNavigationToggleSearchAction, headerNavigationCloseSearchAction, headerNavigationOpenSearchAction } from "../Actions/HeaderNavigationToggleSearchAction";

export function toggleSearch(): ReduxActions.Action<void> {
    return headerNavigationToggleSearchAction();
}

export function openSearch(): ReduxActions.Action<void> {
    return headerNavigationOpenSearchAction();
}

export function closeSearch(): ReduxActions.Action<void> {
    return headerNavigationCloseSearchAction();
}