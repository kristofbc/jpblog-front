import { handleActions } from "redux-actions";
import { applicationConfigurationWindowResizeAction, APPLICATION_CONFIGURATION_WINDOW_RESIZE_ACTION, ApplicationConfigurationWindowResizeActionPayload } from "./../Actions/ApplicationConfigurationAction";
import { applicationConfigurationBootedAction, APPLICATION_CONFIGURATION_BOOTED_ACTION } from "./../Actions/ApplicationConfigurationAction";

import { ApplicationConfigurationState } from "./../Store/State/ApplicationConfigurationState";
import {isMobile, isTablet} from "./../Utils/Breakpoint";

const initialState:ApplicationConfigurationState = {
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    isMobile: isMobile(window.innerWidth),
    isTablet: isTablet(window.innerHeight),
    booted: false
};

export default handleActions<ApplicationConfigurationState, ApplicationConfigurationState[]>({

    [APPLICATION_CONFIGURATION_WINDOW_RESIZE_ACTION]: (state, action:ReduxActions.Action<ApplicationConfigurationWindowResizeActionPayload>) => {
        return {
            ...state,
            innerWidth: action.payload.innerWidth,
            innerHeight: action.payload.innerHeight,
            isMobile: action.payload.isMobile,
            isTablet: action.payload.isTablet
        }
    },
    [APPLICATION_CONFIGURATION_BOOTED_ACTION]: (state, action) => {
        return {
            ...state,
            booted: true
        }
    }

}, initialState);