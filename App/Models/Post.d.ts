declare interface Post {
    readonly id: number;
    readonly title?: string;
    readonly excerpt?: string;
    readonly body?: string;
    readonly date?: Date;
    readonly readingTime?: number;
    readonly tags?:PostTag[];
    readonly media?:PostMedia;
}