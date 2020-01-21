const ResizeImage = async (imageBuffer,outputFileName,width=null, height=null, sameHeight=false, ratio=1, quality=95) => {

    let resizeWidth;
    let resizeHeight;

    if(Buffer.isBuffer(imageBuffer)) {

        if(width !== null) resizeWidth = width;
        if(height !== null) resizeHeight = height;

        if(sameHeight) {
            await sharp(imageBuffer).resize(width).toFile(outputFileName);
        } else {
            if(width === null && height === null) {

            }
        }

    }

};

const BatchResize = (images=[], width, height, quality, outputDir) => {};

const DoMultiFormats = (imageBuffer, formats=[], outputDir) => {};

const BatchResizeDirectory = (directory, recursive, width, height, quality) => {};

const saveToOutputDir = (imageBuffer, outputDir) => {};

const applyWatermark = (imageBuffer, waterMark, outputDir) => {};