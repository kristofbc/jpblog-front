import { homePagePostThumbnailsSetAction, HomePagePostThumbnailsSetActionPayload } from "../Actions/HomePagePostThumbnailsGridAction";

export function setMap(map:PostThumbnailsGrid[][]): ReduxActions.Action<HomePagePostThumbnailsSetActionPayload> {
    return homePagePostThumbnailsSetAction({ map });
};