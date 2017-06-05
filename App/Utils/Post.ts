export function mapJsonToPostModels(json:any):Post[] {
    return json.data.map((child: any) => {
        let media = {};
        if( child.media != undefined ) {
            media = {
                id: child.media.id,
                width: child.media.original_width,
                height: child.media.original_height,
                url: child.media.path,
                background_color: child.media.background_color
            }
        };

        let tags = child.tags.map((tag) => {
            return {
                id: tag.id,
                title: tag.title
            }
        });

        return {
            id: child.id,
            title: child.title,
            excerpt: child.excerpt,
            body: child.body,
            date: new Date(child.published_date),
            readingTime: child.reading_time,
            tags: tags,
            media: media
        };
    }) as Post[];
}