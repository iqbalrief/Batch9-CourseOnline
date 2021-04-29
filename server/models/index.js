import users from './users';
import course from './course';
import Sequelize from 'sequelize';
import { sequelize } from '../../config/config-db';
import coursecontent from './courseContent';
import orders from './orders';

const models = {
    Users: users(sequelize, Sequelize),
    Course: course(sequelize, Sequelize),
    CourseContent: coursecontent(sequelize, Sequelize),
    Orders: orders(sequelize, Sequelize),
    
}
//4. create relation OneToMany | ManyToMany
Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

// 5. export sequalize agar bisa di-call di module lain
export default models;