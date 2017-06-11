const mobileWidth = 640;
const tabletWidth = 1280;

export function isMobile(width:number):boolean {
    // 40.0 rem ~ 640px
    return width < mobileWidth;
};

export function isTablet(width: number):boolean {
    return width > mobileWidth && width < tabletWidth;
};