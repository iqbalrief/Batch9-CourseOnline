//import { Result } from 'postcss';
import { sequelize } from '../../config/config-db';
/* import index from '../models/index'
import users from '../models/users';
 */

//findAll = select * from orders
const findAll = async (req, res) => {
    const orders = await req.context.models.Orders.findAll();
    return res.send(orders);
}

//mencari satu id
const findOne = async (req, res) => {
    const orders = await req.context.models.Orders.findOne({
        where: { orders_id: req.params.id }
    });
    return res.send(orders);
}

//create new region
const create = async (req, res) => {
    const orders = await req.context.models.Orders.create(
    {   orders_created_on: req.body.orders_created_on,
        orders_package: req.body.orders_package, 
        orders_price: req.body.orders_price, 
        orders_description: req.body.orders_description,  
        orders_user_id: req.body.orders_user_id,
        orders_cors_id: req.body.orders_cors_id
    });
    return res.send(orders);
}

//update
const update = async (req, res) => {
    const { orders_id } = req.body;
    const orders = await req.context.models.Orders.update(
        {   orders_created_on: req.body.orders_created_on,
            orders_package: req.body.orders_package, 
            orders_price: req.body.orders_price, 
            orders_description: req.body.orders_description,  
            orders_user_id: req.body.orders_user_id,
            orders_cors_id: req.body.orders_cors_id,  }, 
        { returning: true, where: { order_id: req.params.id } }
    );
    return res.send(orders); 
}

//remove
const remove = async (req, res) => {
    const coursecontent = await req.context.models.Orders.destroy({
        where: { orders_id: req.params.id }
    })
    .then(result =>{
        console.log(result);
        return res.send("delete "+result+" rows.");
    });
}

//row sql
const rawSQL = async (req, res) => {
    await sequelize.query('SELECT * FROM users where users_id = :usersId',
        { replacements: { ordersID: parseInt(req.params.id) }, type: sequelize.QueryTypes.SELECT,}
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
    rawSQL
}