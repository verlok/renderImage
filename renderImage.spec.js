const renderImage = require("./renderImage");

test('renderImage exists', () => {
    expect(renderImage).toBeDefined();
});

describe("without sourceset", () => {
    const code10 = "12345678ab";
    const srcPlaceholder = "url(base64:blabla)";
    const srcString = "https://media.site.com/12/12345678ab_8_f.jpg";

    test('src = placeholder, lazyload = yes', () => {
        let options = {
            code10,
            src: srcPlaceholder,
            lazyLoadFlag: true,
            shot: "f",
            size: "8"
        };
        let expected = `<img data-src="${srcString}" src="${srcPlaceholder}">`;
        let real = renderImage(options);
        expect(real).toBe(expected);
    });

    test('src = placeholder, lazyload = no', () => {
        let options = {
            code10,
            src: srcPlaceholder,
            lazyLoadFlag: false,
            shot: "f",
            size: "8"
        };
        let expected = `<img src="${srcPlaceholder}">`;
        let real = renderImage(options);
        expect(real).toBe(expected);
    });

    test('src = null, lazyload = yes', () => {
        let options = {
            code10,
            lazyLoadFlag: true,
            shot: "f",
            size: "8"
        };
        let expected = `<img data-src="${srcString}">`;
        let real = renderImage(options);
        expect(real).toBe(expected);
    });

    test('src = no, lazyload = no', () => {
        let options = {
            code10,
            lazyLoadFlag: false,
            shot: "f",
            size: "8"
        };
        let expected = `<img src="${srcString}">`;
        let real = renderImage(options);
        expect(real).toBe(expected);
    });
});

describe("with sourceset", () => {
    const srcsetOptions = [{size: "8", width: "200"}, {size: "9", width: "300"}];
    const code10 = "12345678ab";
    const srcsetString = "https://media.site.com/12/12345678ab_8_f.jpg 200w, " + 
        "https://media.site.com/12/12345678ab_9_f.jpg 300w";
    const srcPlaceholder = "url(base64:blabla)";
    const srcString = "https://media.site.com/12/12345678ab_8_f.jpg";

    test('src = placeholder, lazyload = yes', () => {
        let options = {
            code10,
            src: srcPlaceholder,
            lazyLoadFlag: true,
            shot: "f",
            size: "8",
            srcsetOptions
        };
        let expected = `<img data-src="${srcString}" data-srcset="${srcsetString}" src="${srcPlaceholder}">`;
        let real = renderImage(options);
        expect(real).toBe(expected);
    });

    test('src = placeholder, lazyload = no', () => {
        let options = {
            code10,
            src: srcPlaceholder,
            lazyLoadFlag: false,
            shot: "f",
            size: "8",
            srcsetOptions
        };
        let expected = `<img src="${srcPlaceholder}" srcset="${srcsetString}">`;
        let real = renderImage(options);
        expect(real).toBe(expected);
    });

    test('src = null, lazyload = yes', () => {
        let options = {
            code10,
            lazyLoadFlag: true,
            shot: "f",
            size: "8",
            srcsetOptions
        };
        let expected = `<img data-src="${srcString}" data-srcset="${srcsetString}">`;
        let real = renderImage(options);
        expect(real).toBe(expected);
    });

    test('src = no, lazyload = no', () => {
        let options = {
            code10,
            lazyLoadFlag: false,
            shot: "f",
            size: "8",
            srcsetOptions
        };
        let expected = `<img src="${srcString}" srcset="${srcsetString}">`;
        let real = renderImage(options);
        expect(real).toBe(expected);
    });
});