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

        // @TODO Time is not accepted
        let date = child.published_date.split(" ")[0];

        return {
            id: child.id,
            title: child.title,
            excerpt: child.excerpt,
            body: child.body,
            date: new Date(date),
            readingTime: child.reading_time,
            tags: tags,
            media: media
        };
    }) as Post[];
};

/**
 * Distribute images over rows using the linear distribution
 * http://stackoverflow.com/questions/7938809/how-to-understand-the-dynamic-programming-solution-in-linear-partitioning/7942946#7942946
 * @param {number[]} seq An array containing the aspect ratios of each images to partition
 * @param {number} k Maximum number of row for the distribution
 * @return {number[]} An array of new aspect ratios to apply
 */
export function linearPartition(seq, k) {
    // debugger;
    if( k <= 0 ) { return []; }

    let n = seq.length-1;
    if( k > n ) { return seq.map(function(s) { return [s]; }); }

    let i, j;
    const table = [];
    const solution = [];
    for(i = 0; i < seq.length; i++) {
        table[i] = [];
        for(j = 0; j < k; j++) {
            table[i][j] = 0;
        }
    }
    for(i = 0; i < seq.length-1; i++) {
        solution[i] = [];
        for(j = 0; j < k-1; j++) {
            solution[i][j] = 0;
        }
    }
    for(i = 0; i < seq.length; i++) {
        table[i][0] = seq[i] + (i ? table[i-1][0] : 0);
    }
    for(i = 0; i < k; i++) {
        table[0][i] = seq[0];
    }
    for(i = 1; i < seq.length; i++) {
        for(let j = 1; j < k; j++) {
            let min = -1;
            let minx = 1000000;
            for(let x = 0; x < i; x++) {
                let cost = Math.max(table[x][j-1], table[i][0] - table[x][0]);
                if(min == -1 || cost < min) {
                    min = cost;
                    minx = x;
                }
            }
            table[i][j] = min;
            solution[i-1][j-1] = minx;
        }
    }

    k = k - 2;
    let ans = [];
    while(k >= 0 && n > 0) {
        ans = [seq.slice(solution[n-1][k] + 1, n + 1)].concat(ans);
        n = solution[n-1][k];
        k = k - 1;
    }

    return [seq.slice(0, n + 1)].concat(ans);
}

export interface PostThumbnailsGridInterface {
    resize_width?: number;
    resize_height?: number;
    width?: number;
    height?: number;
    ratio?: number;
    idx?: number;
};
/**
 * Create a thumbnail grids, liearly distributed based on the aspect ratio of a media
 * @param {Post[]} posts An array of Post to distrbute
 * @param {number} thumbsHeight Height of a single row
 * @param {number} rowWidth Maximum width of a row
 * @return {PostThumbnailsGridInterface[][]} An array of object containing the new width and height
 */
export function createThumbnailsGrid(posts:Post[], thumbsHeight:number, rowWidth:number) {
    const sizes:PostThumbnailsGridInterface[] = posts.map((thumbnail, index) => {
        return {
            width: thumbnail.media.width,
            height: thumbnail.media.height,
            ratio: thumbnail.media.width >= thumbnail.media.height ? 
                    thumbnail.media.width/thumbnail.media.height :
                    thumbnail.media.height/thumbnail.media.width ,
            idx: index,
            resize_width: 0,
            resize_height: 0
        } as PostThumbnailsGridInterface;
    });

    let totalWidth = sizes.reduce(function(sum, size) {
        return sum + ( size.ratio * thumbsHeight );
    }, 0);
    let totalRows = Math.round(totalWidth/rowWidth);
    let buffers = [];

    if( totalRows < 1 ) {
        // one row
        return [];
    } else {
        const weights = sizes.map(function(size) { 
            return size.ratio * 100; 
        });
        const partition = linearPartition( weights, totalRows );

        let index = 0;
        for(let i = 0; i < partition.length; i++) {
            let buffer:PostThumbnailsGridInterface[] = [];
            for(let j = 0; j < partition[i].length; j++) {
                buffer.push(sizes[index]);
                index++;
                let ratios = buffer.reduce(function(sum, size) {
                    return sum + size.ratio;
                }, 0);
                for(let k = 0; k < buffer.length; k++ ) {
                    buffer[k].resize_width = rowWidth / ratios * buffer[k].ratio;
                    buffer[k].resize_height = rowWidth / ratios;
                }
            }
            buffers.push(buffer);
        }
    }

    return buffers;
};