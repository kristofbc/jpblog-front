import { combineReducers, Reducer } from "redux";
import { StoreState } from "./../Store/StoreState";
import headerNavigationElementReducer from "./HeaderNavigationElementReducer";
import HeaderSearchReducer from "./HeaderSearchReducer";

const rootReducer: Reducer<StoreState> = combineReducers<StoreState>({
    navigationElements: headerNavigationElementReducer,
    headerSearch: HeaderSearchReducer
});

export default rootReducer;