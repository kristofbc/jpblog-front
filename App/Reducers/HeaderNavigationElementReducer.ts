import { handleActions } from "redux-actions";
import { HEADER_NAVIGATION_ELEMENT_LOAD_ACTION, HeaderNavigationElementLoadActionPayload } from "./../Actions/HeaderNavigationElementLoadAction";
import { HeaderNavigationElementState } from "./../Store/State/HeaderNavigationElementState";

const initialState: HeaderNavigationElementState = {
    elements: []
};

export default handleActions<HeaderNavigationElementState, HeaderNavigationElementLoadActionPayload[]>({

    [HEADER_NAVIGATION_ELEMENT_LOAD_ACTION]: (state, action) => {
        const elements = action.payload.map((ell) => {
            return {
                name: ell.name,
                selected: ell.selected,
                url: ell.url
            };
        });
        
        return {
            elements: elements
        }
    }

}, initialState);