export function home(page:number|string = null):string {
    const url = "/";
    return page != null ? url + "/page/" + page : url;
};

export function gallerie(slug:number|string = null): string {
    const url = '/gallerie';
    return slug == null ? url : url + '/' + slug;
};

export function is(haystack:string, needle:string):boolean {
    return haystack.substr(0, needle.length) == needle;
};

export function image(id:number|string): string {
    return "/image/" + id;
}