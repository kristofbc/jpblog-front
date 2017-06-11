import { Dispatch } from "redux";

import { applicationConfigurationWindowResizeAction, ApplicationConfigurationWindowResizeActionPayload } from "../Actions/ApplicationConfigurationAction";

export function windowResize( innerWidth:number, innerHeight:number, isMobile:boolean, isTablet:boolean ): ReduxActions.Action<ApplicationConfigurationWindowResizeActionPayload> {
    return applicationConfigurationWindowResizeAction({ innerWidth, innerHeight, isMobile, isTablet });
}