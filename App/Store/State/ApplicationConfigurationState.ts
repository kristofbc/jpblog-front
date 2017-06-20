export interface ApplicationConfigurationState {
    readonly isMobile: boolean;
    readonly isTablet: boolean;
    readonly innerWidth: number;
    readonly innerHeight: number;
    readonly headerHeight: number;
    readonly booted: boolean;
};