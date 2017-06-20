import { createAction } from "redux-actions";

export const APPLICATION_CONFIGURATION_WINDOW_RESIZE_ACTION = "ApplicationConfigurationWindowResizeAction";
export const APPLICATION_CONFIGURATION_BOOTED_ACTION = "ApplicationConfigurationBootedAction";
export const APPLICATION_CONFIGURATION_HEADER_RESIZE_ACTION = "ApplicationConfigurationHeaderResizeAction";

export interface ApplicationConfigurationWindowResizeActionPayload {
    innerWidth: number;
    innerHeight: number;
    isMobile: boolean;
    isTablet: boolean;
};

export interface ApplicationConfigurationHeaderResizeActionPayload {
    height: number;
}

export const applicationConfigurationWindowResizeAction = createAction<ApplicationConfigurationWindowResizeActionPayload, ApplicationConfigurationWindowResizeActionPayload>(APPLICATION_CONFIGURATION_WINDOW_RESIZE_ACTION, undefined);
export const applicationConfigurationBootedAction = createAction<void>(APPLICATION_CONFIGURATION_BOOTED_ACTION, undefined);
export const applicationConfigurationHeaderResizeAction = createAction<ApplicationConfigurationHeaderResizeActionPayload, ApplicationConfigurationHeaderResizeActionPayload>(APPLICATION_CONFIGURATION_HEADER_RESIZE_ACTION, undefined);