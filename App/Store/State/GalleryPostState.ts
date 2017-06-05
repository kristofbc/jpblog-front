export interface GalleryPostState {
    readonly order: string;
    readonly offset: number;
    readonly limit: number;
    readonly posts: Post[];
};