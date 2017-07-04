import { HeaderNavigationElementState } from "./State/HeaderNavigationElementState";
import { HeaderNavigationState } from "./State/HeaderSearchState";
import { GalleryPostState } from "./State/GalleryPostState";
import { HomePagePostMobileState } from "./State/HomePagePostMobileState";
import { HomePagePostThumbnailsState } from "./State/HomePagePostThumbnailsState";
import { ApplicationConfigurationState } from "./State/ApplicationConfigurationState";
import { VisualizerState } from "./State/VisualizerState";
import { MediaDisplayState } from "./State/MediaDisplayState";
import { FullscreenLoaderState } from "./State/FullscreenLoaderState";
import { StaticPostState } from "./State/StaticPostState";

export interface StoreState {
    navigationElements: HeaderNavigationElementState;
    headerSearch: HeaderNavigationState;
    galleryPosts: GalleryPostState;
    homePagePostMobile: HomePagePostMobileState;
    homePagePostThumbnails: HomePagePostThumbnailsState;
    applicationConfiguration: ApplicationConfigurationState;
    visualizer: VisualizerState;
    mediaDisplay: MediaDisplayState;
    fullscreenLoader: FullscreenLoaderState;
    staticPost: StaticPostState;
};