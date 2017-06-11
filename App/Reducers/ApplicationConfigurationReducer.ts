import { handleActions } from "redux-actions";
import { applicationConfigurationWindowResizeAction, APPLICATION_CONFIGURATION_WINDOW_RESIZE_ACTION, ApplicationConfigurationWindowResizeActionPayload } from "./../Actions/ApplicationConfigurationAction";

import { ApplicationConfigurationState } from "./../Store/State/ApplicationConfigurationState";
import {isMobile, isTablet} from "./../Utils/Breakpoint";

const initialState:ApplicationConfigurationState = {
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    isMobile: isMobile(window.innerWidth),
    isTablet: isTablet(window.innerHeight)
};

export default handleActions<ApplicationConfigurationState, ApplicationConfigurationState[]>({

    [APPLICATION_CONFIGURATION_WINDOW_RESIZE_ACTION]: (state, action:ReduxActions.Action<ApplicationConfigurationWindowResizeActionPayload>) => {
        return {
            innerWidth: action.payload.innerWidth,
            innerHeight: action.payload.innerHeight,
            isMobile: action.payload.isMobile,
            isTablet: action.payload.isTablet
        }
    }

}, initialState);