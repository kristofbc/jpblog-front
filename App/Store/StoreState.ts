import { HeaderNavigationElementState } from "./State/HeaderNavigationElementState";
import { HeaderNavigationState } from "./State/HeaderSearchState";
import { GalleryPostState } from "./State/GalleryPostState";
import { HomePagePostMobileState } from "./State/HomePagePostMobileState";
import { ApplicationConfigurationState } from "./State/ApplicationConfigurationState";
import { VisualizerState } from "./State/VisualizerState";
import { MediaDisplayState } from "./State/MediaDisplayState";

export interface StoreState {
    navigationElements: HeaderNavigationElementState;
    headerSearch: HeaderNavigationState;
    galleryPosts: GalleryPostState;
    homePagePostMobile: HomePagePostMobileState;
    applicationConfiguration: ApplicationConfigurationState;
    visualizer: VisualizerState;
    mediaDisplay: MediaDisplayState;
};