import { createAction } from "redux-actions";

export const APPLICATION_CONFIGURATION_WINDOW_RESIZE_ACTION = "ApplicationConfigurationWindowResizeAction";

export interface ApplicationConfigurationWindowResizeActionPayload {
    innerWidth: number;
    innerHeight: number;
    isMobile: boolean;
    isTablet: boolean;
};

export const applicationConfigurationWindowResizeAction = createAction<ApplicationConfigurationWindowResizeActionPayload, ApplicationConfigurationWindowResizeActionPayload>(APPLICATION_CONFIGURATION_WINDOW_RESIZE_ACTION, undefined);