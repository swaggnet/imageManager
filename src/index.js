const config = require("./init");
const fetchRemoteImage = require("./libs/imageDownloader");
const fs = require('fs');

class ImageManager {

    constructor(envType="development", customConf=null) {

       this.configuration = this.getConfiguration(envType, customConf);

    }

   
    getConfiguration(envType="development", customConf=null) {
       return config(envType, customConf);
    }

    config() {
        return this.configuration;
    }

    getImageFromURL(url, data, storageDir, callback) {

        data.conf = this.configuration;
        data.storageDir = storageDir;
       fetchRemoteImage(url, data).then(result => {
           callback(null, result);
       }).catch(error => callback(error, null));
        
    }

    loadImageAsBuffer(imageLocation) {
        if(fs.exists(imageLocation)) {
            const file = fs.readFileSync(imageLocation).toString();
            return Buffer.from(file);
        } else {
            return undefined;
        }
    }

    /**
     * 
     * @param {String} imageLocation 
     * @param {"jpg"|"png"|"gif"|"webp"} ouputFormat 
     * @param {String} outputDir 
     * @param {Boolean} square 
     * @param {Number} width 
     * @param {Number} height
     * @returns {Promise} 
     */
    resizeImage(imageLocation, ouputFormat="jpg", outputDir="", square=false,width=0,height=0) {

        const ratio = this.configuration.imageResizeRatio;
        const quality = this.configuration.imageResizeQuality;
        const maxWidth = this.configuration.maxWidth;
        const maxHeight = this.configuration.maxHeight;
        const imageBuffer = this.loadImageAsBuffer(imageLocation);

    }

  /**
   * @name decentralizeImage
   * @description will decentralize the image to the global IPFS server and give you the link to access it (access requires IPFS on the server)
   * @param {String} imageLocation 
   * @param {Function} callback 
   * @returns {Callback}
   */

    decentralizeImage(imageLocation, callback) {


    }


    /** 
    * @name saveImageInMultiFormat
    * @description To save an image in multi-formats.
    * @param {String} originalImage
    * @param {Array} formats array[
    *    Object {
    *    width: number,
    *    height: number,
    *    quality: number
    *    prefix: string,
    *    suffix: string
    * }]
    * @param {String} outputDir 
    *
    * @returns {Promise}
    *
    * @example
                const IM = new ImageManager();
                const thumbnail = {
                    width: 90,
                    height: 90,
                    quality: 95,
                    prefix: Date.now().toString()+"-",
                    suffix: "_thumb",
                    ext: "jpg"
                };
                const medium = {
                    width: 150,
                    height: 150,
                    quality: 95,
                    prefix: Date.now().toString()+"-",
                    suffix: "_medium",
                    ext: "jpg"
                };
                const large = {
                    width: 1980,
                    height: "auto", //will scale automatically
                    quality: 95,
                    prefix: Date.now().toString()+"-",
                    suffix: "_large",
                    ext: "webp"
                };

                const outputDir = "/User/me/imagedir/";

                IM.saveImageInMultiFormat("/Users/me/imagedir/myImageFile.jpg", [thumbnail, medium, large], outputDir).then(response => {
                    //do something with the response
                }).catch(error) {
                    //do something with the error;
                }

    */

    saveImageInMultiFormat(originalImage, formats=[{width:0,height:0,quality:95,prefix="myimage_",suffix="_formatname"}], outputDir="") {



    }

    

}

const IM = new ImageManager();
