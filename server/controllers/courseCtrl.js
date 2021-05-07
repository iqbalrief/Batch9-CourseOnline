//import { Result } from 'postcss';
import { sequelize } from '../../config/config-db';
/* import index from '../models/index'
import users from '../models/users';
 */

//findAll = select * from regions
const findAll = async (req, res) => {
    const course = await req.context.models.Course.findAll(
    {
        include: [{
            model: req.context.models.Users
        }],
        order: [
            ['cors_user_id', 'ASC'],
        ],
    }
    );
    return res.send(course);
}

//mencari satu id
const findOne = async (req, res) => {
    const course = await req.context.models.Course.findOne({
        where: { cors_id: req.params.id }
    });
    return res.send(course);
}

//create new region
const create = async (req, res) => {
    const course = await req.context.models.Course.create({
        cors_name: req.body.cors_name,
        cors_description: req.body.cors_description, 
        cors_category: req.body.cors_category, 
        cors_price: req.body.cors_price,  
        cors_duration: req.body.cors_duration,
        cors_total_materi: req.body.cors_total_materi,
        cors_level: req.body.cors_level,
        cors_author: req.body.cors_author,
        cors_rating: req.body.cors_rating,
        cors_user_id: req.body.cors_user_id,
    });
    return res.send(course);
}

//update
const update = async (req, res) => {
    const { cors_user_id } = req.body;
    const course = await req.context.models.Course.update(
        {   cors_name: req.body.cors_name,
            cors_description: req.body.cors_description, 
            cors_category: req.body.cors_category, 
            cors_price: req.body.cors_price,  
            cors_duration: req.body.cors_duration,
            cors_total_materi: req.body.cors_total_materi,
            cors_level: req.body.cors_level,
            cors_author: req.body.cors_author,
            cors_rating: req.body.cors_rating,
            cors_user_id: req.body.cors_user_id  }, 
        { returning: true, where: { cors_id: req.params.id } }
    );
    return res.send(course); 
}
//upload
/* const updated = async (req, res) => {
    console.log(req.fileName);
    const result = await req.context.models.Course.update(
        { cors_image: req.fileName },
        { returning: true, where: { cors_id: parseInt(req.params.id) } }
    );
    return res.send(result);
} */

//remove
const remove = async (req, res) => {
    const course = await req.context.models.Course.destroy({
        where: { cors_id: req.params.id }
    })
    .then(result =>{
        console.log(result);
        return res.send("delete "+result+" rows.");
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

const created = async (req, res,next) => {
    // jika gunakan spread operator
    await req.context.models.Course.create({
        cors_name : req.dataCourse.corsName,
        cors_description: req.dataCourse.corsDesc,
        cors_category: req.dataCourse.corsCate,
        cors_price: req.dataCourse.corsPrice,
        cors_duration: req.dataCourse.corsDuration,
        cors_total_materi: req.dataCourse.corsTtlMtr,
        cors_level: req.dataCourse.corsLevel,
        cors_author: req.dataCourse.corsAuthor,
        cors_rating: req.dataCourse.corsRating,
        cors_image: req.dataCourse.fileName,
        cors_user_id: parseInt(req.dataCourse.corsUserId)
    }).catch(error=>{
        console.log(error);
    });

    // using middleware
    next();


}

 const createImage = async (req, res,data) => {
    const{corsId,fileName,fileSize,fileType} = data;
    await req.context.models.CourseImages.create({
        cors_name : corsName,
        cors_description: corsDesc,
        cors_category: corsCate,
        cors_price: corsPrice,
        cors_duration: corsDuration,
        cors_total_materi: corsTtlMtr,
        cors_level: corsLevel,
        cors_author: corsAuthor,
        cors_rating: corsRating,
        cors_image: fileName,
        cors_user_id: parseInt(corsUserId)
    }).catch(error=>{
        console.log(error);
    });
    
} 


export default {
    findAll,
    findOne,
    create,
    update,
    remove,
    rawSQL,
    //updated,
    created,
    createImage,
}