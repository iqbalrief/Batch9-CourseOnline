//import { Result } from 'postcss';
import { sequelize } from '../../config/config-db';
/* import index from '../models/index'
import users from '../models/users';
 */

//findAll = select * from regions
const findAll = async (req, res) => {
    const coursecontent = await req.context.models.CourseContent.findAll();
    return res.send(coursecontent);
}

//mencari satu id
const findOne = async (req, res) => {
    const coursecontent = await req.context.models.CourseContent.findOne({
        where: { cont_id: req.params.id }
    });
    return res.send(coursecontent);
}

//create
const create = async (req, res) => {
    const coursecontent = await req.context.models.CourseContent.create(
    {   cont_title: req.body.cont_title,
        cont_duration: req.body.cont_duration, 
        cont_type: req.body.cont_type, 
        cont_resource_link: req.body.cont_resource_link,  
        cont_cors_id: req.body.cont_cors_id
    });
    return res.send(coursecontent);
}

//update
const update = async (req, res) => {
    const { cont_id } = req.body;
    const coursecontent = await req.context.models.CourseContent.update(
        {   cont_title: req.body.cont_title,
            cont_duration: req.body.cont_duration, 
            cont_type: req.body.cont_type, 
            cont_resource_link: req.body.cont_resource_link,  
            cont_cors_id: req.body.cont_cors_id,  }, 
        { returning: true, where: { cont_id: req.params.id } }
    );
    return res.send(coursecountent); 
}

//remove
const remove = async (req, res) => {
    const coursecontent = await req.context.models.CourseContent.destroy({
        where: { cont_id: req.params.id }
    })
    .then(result =>{
        console.log(result);
        return res.send("delete "+result+" rows.");
    });
}

const created = async (req, res,next) => {
    const {contDuration, contResourceLink, contCorsId, fileName, fileType, contTitle} = req.dataCourseContent
    // jika gunakan spread operator
    let type = fileType.split('/')
    type = type[0] === 'image' || type[0] === 'video'? type[0] : type[1]
    console.log(type)
    const test = await req.context.models.CourseContent.create({
        cont_title: contTitle,
        cont_duration : contDuration,
        cont_resource_link: contResourceLink,
        cont_cors_id: contCorsId,
        fileName: fileName,
        cont_type: type,
    }).catch(error=>{
        console.log(error);
    });

    // using middleware
    res.send(test);


}

 const createType = async (req, res,data) => {
    const{contDuration,contResourceLink,contCorsId,fileName,fileType, contTitle} = data;
    await req.context.models.CourseContent.create({
        cont_title: contTitle,
        cont_duration : contDuration,
        cont_resource_link: contResourceLink,
        cont_cors_id: contCorsId,
        fileName: fileName,
        fileType: fileType,
    }).catch(error=>{
        console.log(error);
    });
    
} 


//row sql
const rawSQL = async (req, res) => {
    await sequelize.query('SELECT * FROM users where users_id = :usersId',
        { replacements: { corsID: parseInt(req.params.id) }, type: sequelize.QueryTypes.SELECT,}
    ).then(result => {
        return res.send(result);
    })
}

export default {
    findAll,
    findOne,
    create,
    update,
    remove,
    rawSQL,
    createType,
    created,
}