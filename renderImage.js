const toAttributes = (paramsObject) => 
    Object.keys(paramsObject).map(key => `${key}="${paramsObject[key]}"`).join(' ');

const generateImgUrl = (code10, size, shot) => {
    let initialChars = code10.substr(0, 2);
    return `https://media.site.com/${initialChars}/${code10}_${size}_${shot}.jpg`;
};

const renderImage = (options) => {
    let imgAttributes = {};
    
    // Generated img source
    let generatedSrc = generateImgUrl(options.code10, options.size, options.shot);
    let generatedSrcAttribute = options.lazyLoadFlag ? "data-src" : "src";
    imgAttributes[generatedSrcAttribute] = generatedSrc; // img src might be overwritten, see "force src" below

    // Generated img srcset
    if (options.srcsetOptions) {
        let generatedSrcset = [];
        options.srcsetOptions.forEach(srcsetOptions => {
            let generatedSrc = generateImgUrl(options.code10, srcsetOptions.size, options.shot);
            generatedSrcset.push(generatedSrc + ` ${srcsetOptions.width}w`);
        });
        let generatedSrcsetAttribute = options.lazyLoadFlag ? "data-srcset" : "srcset";
        imgAttributes[generatedSrcsetAttribute] = generatedSrcset.join(', ');
    }

    // Force src out if src was passed in
    if (options.src) {
        imgAttributes.src = options.src;
    }
    
    return `<img ${toAttributes(imgAttributes)}>`;
};

module.exports = renderImage;