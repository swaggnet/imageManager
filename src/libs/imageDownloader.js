const fetchRemoteImage = (url, data) => {
    let mimeType;
    return new Promise((resolve, reject) => {
        request.get(url, {encoding:'binary'}, async (error, response) => {

            if(error) {
                reject(error);
                return;
            }

                const image = response.body;

                if(Buffer.from(image).byteLength > data.conf.maxAllowedSize || Buffer.from(image).byteLength < data.conf.minAllowedSize) {
                    reject('minimum size allowed for images is 5kb and maximum size is 10Mb, please make sure your image respects that condition.');
                    return;
                }

                //store to tmpdir
                try {
                    mimeType = await fileType.fromBuffer(Buffer.from(response.body, 'binary'));
              

                    if (mimeType) {
                        const ext = mimeType.ext;
                        const mime = mimeType.mime;
                        if (data.conf.allowedExtensions.includes(ext) && data.conf.allowedTypes.includes(mime)) {

                            const storageDir = `${data.conf.imageTmpDir}${data.storageDir}`;

                            if (!fs.existsSync(storageDir)) {
                                fs.mkdirSync(storageDir, {recursive: true});
                            }
                           
                            const imageName = `${uuid().toString()}.${ext}`;
                            fs.writeFileSync(`${storageDir}/${imageName}`, image, 'binary');
                            resolve(`${storageDir}/${imageName}`);


                        } else {
                            reject('extension or image type not allowed.');

                        }
                    }
                } catch(error) {
                    reject(error);
                }
            });



        });


};

module.exports = fetchRemoteImage;
