import { HeaderNavigationElementState } from "./State/HeaderNavigationElementState";
import { HeaderNavigationState } from "./State/HeaderSearchState";

export interface StoreState {
    navigationElements: HeaderNavigationElement[];
    headerSearch: HeaderNavigationState;
};