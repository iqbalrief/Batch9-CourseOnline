import formidable from 'formidable';
import fs from 'fs';


//1.declare pathDir untuk menyimpan image di local storage
const pathDir = __dirname + '../../../uploads/';

const upload = async (req, res, next) => {

    // jika directory belum ada then create new one
    if (!fs.existsSync(pathDir)) {
        fs.mkdirSync(pathDir);
    }

    const form = formidable({ multiples: true, uploadDir: pathDir });
    form.parse(req);
    form
        .on('fileBegin', (keyName, file) => {
            console.log(keyName, file);
            file.path = pathDir + file.name;
        })
        .on('field', (keyName, value) => {
            console.log(keyName, value);
        })
        .on('file', (keyName, file) => {
            console.log(keyName, file.name);
            req.fileName = file.name;
        })
        .on('end', () => {
            console.log('-> upload to storage done');
            next();
            //res.send("File Uploaded Successfully");
        });
}

const uploadMultipart = async (req, res, next) => {
    // jika directory belum ada then create new one
    if (!fs.existsSync(pathDir)) {
        fs.mkdirSync(pathDir);
    }

    let multipart = {};
    let corsName = undefined;
    let corsDesc = undefined;
    let corsCate = undefined;
    let corsPrice = undefined;
    let corsDuration = undefined;
    let corsTtlMtr = undefined;
    let corsLevel = undefined;
    let corsAuthor = undefined;
    let corsRating = undefined;
    let corsUserId = undefined;

    const form = formidable({ multiples: true, uploadDir: pathDir });
    form.parse(req);

    form
        .on('fileBegin', (keyName, file) => {
            file.path = pathDir + file.name;
        })
        .on('field', (keyName, value) => {
            corsName = (keyName === 'cors_name' ? value : corsName)
            corsDesc = (keyName === 'cors_description'? value: corsDesc)
            corsCate = (keyName === 'cors_category'?value: corsCate)
            corsPrice = (keyName === 'cors_price'?value: corsPrice)
            corsDuration =(keyName === 'cors_duration'? value: corsDuration)
            corsTtlMtr =(keyName === 'cors_total_materi'? value: corsTtlMtr)
            corsLevel =(keyName === 'cors_level'? value: corsLevel)
            corsAuthor=(keyName === 'cors_author'? value: corsAuthor)
            corsRating=(keyName === 'cors_rating'?value: corsRating)
            corsUserId=(keyName === 'cors_user_id'? value: corsUserId)
            multipart = { ...multipart,
                             corsName, 
                             corsDesc, 
                             corsCate, 
                             corsPrice, 
                             corsDuration, 
                             corsTtlMtr,
                             corsLevel,
                             corsAuthor,
                             corsRating,
                             corsUserId, }
        })
        .on('file', (keyName, file) => {
            console.log(file);
            const fileName = file.name;
            multipart = {...multipart, fileName};
        })
        .on('end', () => {
            console.log('-> upload to storage done');
            req.dataCourse = multipart;
            next();
        });
}

export default {
    upload,
    uploadMultipart
}