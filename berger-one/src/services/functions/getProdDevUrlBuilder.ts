export const GetProdDevRouteBuilder = (path: string) => {
    if (process.env.NODE_ENV === 'production') {
        return process.env.SUB_DOMAIN_PATH + path;
    } else {
        return path;
    }
};

export const GetProdDevImgRouteBuilder = (path: string) => {
    if (process.env.NODE_ENV === 'production') {
        return process.env.SUB_DOMAIN_IMAGE_PATH + path;
    } else {
        return path;
    }
};
