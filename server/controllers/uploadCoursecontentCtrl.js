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
            file.path = pathDir + file.type;
        })
        .on('field', (keyName, value) => {
            console.log(keyName, value);
        })
        .on('file', (keyName, file) => {
            console.log(keyName, file.type);
            req.fileType = file.type;
        })
        .on('end', () => {
            console.log('-> upload to storage done');
            next();
            //res.send("File Uploaded Successfully");
        });
}

const uploadMultipartType = async (req, res, next) => {
    // jika directory belum ada then create new one
    if (!fs.existsSync(pathDir)) {
        fs.mkdirSync(pathDir);
    }

    const dataCourseContent=[];
    let multipart = {};
    let contTitle = undefined;
    let contDuration = undefined;
    let contResourceLink = undefined;
    let contCorsId = undefined

    const form = formidable({ multiples: true, uploadDir: pathDir });
    form.parse(req);

    form
        .on('fileBegin', (keyName, file) => {
            file.path = pathDir + file.name;
        })
        .on('field', (keyName, value) => {
            contDuration = (keyName === 'cont_duration'? value: contDuration)
            contResourceLink = (keyName === 'cont_resource_link'?value: contResourceLink)
            contTitle = (keyName === 'cont_title'? value: contTitle)
            contCorsId =(keyName === 'cont_cors_id'? value: contCorsId)
            multipart = { ...multipart, contDuration, contResourceLink, contCorsId, contTitle }
        })
        .on('file', (keyName, file) => {
            console.log(file);
            const fileType = file.type;
            const fileName = file.name;
            multipart = {...multipart, fileType, fileName};
            dataCourseContent.push(multipart);
        })
        .on('end', () => {
            console.log('-> upload to storage done');
            req.dataCourseContent = multipart;
            next();
        });
}

export default {
    upload,
    uploadMultipartType
}