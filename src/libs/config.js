const path = require('path');
const os = require('os');
const dotenv = require('dotenv');
const fs = require('fs');

const HomeDir = path.resolve(os.homedir());
const TmpDir = path.resolve(os.tmpdir());
const TmpImgDir = ".tmpimages";
const ImgDir = "images";
const imageDir = path.resolve(`${HomeDir}/${ImgDir}/`);
const TmpImageDir = path.resolve(`${TmpDir}/${TmpImgDir}/`);
const allowedTypes = ["image/png", "image/jpeg", "image/gif"];
const allowedExtensions = ["jpg", "png", "gif", "jpeg"];
const maxAllowedSize = 10 * 1048576; //10Mb max image size allowed 1048576 is used as it is the binary bytes size in 1MB
const minAllowedSize = 0.005  * 1048576; // minimum allowed size is 5kb for images

const ValidConfVars = [
    "HomeDir",
    "TmpDir",
    "TmpImgDir",
    "ImgDir",
    "imageDir",
    "TmpImageDir",
    "allowedTypes",
    "allowedExtensions",
    "maxAllowedSize",
    "minAllowedSize",
    "defaultWidth",
    "defaultHeight",
    "maxWidth",
    "maxHeight",
    "imageResizeRatio",
    "imageResizeQuality"
];

const defaultConfig = {
    HomeDir: HomeDir,
    TmpDir: TmpDir,
    TmpImgDir: TmpImgDir,
    ImgDir: ImgDir,
    imageDir: imageDir,
    TmpImageDir: TmpImageDir,
    allowedTypes: allowedTypes,
    allowedExtensions: allowedExtensions,
    maxAllowedSize: maxAllowedSize,
    minAllowedSize: minAllowedSize,
    defaultWidth: "",
    defaultHeight: "",
    maxWidth: "",
    maxHeight: "",
    imageResizeRatio: "1",
    imageResizeQuality: "95"
}

const defaultEnvDir = path.resolve("./");


//Overrides default configuration setted above and saves it as : ./imageOptimizer.{development | production | customtype}
function setConfiguration(confType="development", data = null) {

    
        if(data === null) {
            data = defaultConfig;
        }
    
        const envFileName = `imageOptimizer.${confType}`;
        const dataKeys = Object.keys(data);
        let efc = "[imageoptimizer]\n";
    
        dataKeys.forEach((k, index)=>{
    
            if(!ValidConfVars.includes(k)) {
                reject(`${k} is an invalid configuration key. Allowed keys are: ${JSON.stringify(ValidConfVars)}`);
                return;
            }
            
            const val = data[k];
            efc += `${k}='${val}'\n`;
        });
    
        fs.writeFileSync(`${defaultEnvDir}/${envFileName}`, efc);
   
   
    
}

function readConfiguration(confType="development") {

    const envFileName = `imageOptimizer.${confType}`;
    const rf = fs.readFileSync(`${defaultEnvDir}/${envFileName}`);
    const buf = Buffer.from(rf);
    const cfg = dotenv.parse(buf);
    return cfg;
}

module.exports = (envType="development", confData=null) => {
   
    setConfiguration(envType, confData);
    return readConfiguration(envType);
    
}




