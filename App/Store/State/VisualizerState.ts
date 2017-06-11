export interface VisualizerState {
    readonly posts: Post[];
    readonly index: number;
    readonly open: boolean;
    readonly containerWidth: number;
    readonly offsetTop: number;
};