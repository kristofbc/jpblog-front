import { Dispatch } from "redux";

import { applicationConfigurationWindowResizeAction, ApplicationConfigurationWindowResizeActionPayload } from "../Actions/ApplicationConfigurationAction";
import { applicationConfigurationBootedAction } from "../Actions/ApplicationConfigurationAction";
import { applicationConfigurationHeaderResizeAction, ApplicationConfigurationHeaderResizeActionPayload } from "../Actions/ApplicationConfigurationAction";

export function windowResize( innerWidth:number, innerHeight:number, isMobile:boolean, isTablet:boolean ): ReduxActions.Action<ApplicationConfigurationWindowResizeActionPayload> {
    return applicationConfigurationWindowResizeAction({ innerWidth, innerHeight, isMobile, isTablet });
}

export function applicationBooted(): ReduxActions.Action<void> {
    return applicationConfigurationBootedAction();
}

export function headerResize( height: number ): ReduxActions.Action<ApplicationConfigurationHeaderResizeActionPayload> {
    return applicationConfigurationHeaderResizeAction({ height });
}