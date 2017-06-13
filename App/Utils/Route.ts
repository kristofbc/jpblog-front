export function home():string {
    return '/';
};

export function gallerie(slug:number|string = null): string {
    const url = '/gallerie';
    return slug == null ? url : url + '/' + slug;
};

export function is(haystack:string, needle:string):boolean {
    return haystack.substr(0, needle.length) == needle;
}