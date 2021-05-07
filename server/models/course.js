const course = (sequelize, DataTypes) => {
const Course =  sequelize.define('course', {
    cors_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      cors_name: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      cors_description: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      cors_category: {
        type: DataTypes.STRING(15),
        allowNull: true
      },
      cors_price: {
        type: DataTypes.DECIMAL,
        allowNull: true
      },
      cors_duration: {
        type: DataTypes.STRING(5),
        allowNull: true
      },
      cors_total_materi: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      cors_level: {
        type: DataTypes.STRING(15),
        allowNull: true
      },
      cors_author: {
        type: DataTypes.STRING(55),
        allowNull: true
      },
      cors_rating: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      cors_image: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      cors_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id'
        }
      }
    }, {
      sequelize,
      tableName: 'course',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: "course_pkey",
          unique: true,
          fields: [
            { name: "cors_id" },
          ]
        },
      ]
  });

   // table Countries belong to Regions, pastikan relasi fk di set sesuai relasi di table, 
   Course.associate = models => {
    Course.belongsTo(models.Users,{foreignKey: 'cors_user_id'});
  };
  return Course;
};
export default course;