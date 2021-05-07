const users = (sequelize, DataTypes) => {
const Users = sequelize.define('users', {
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    user_email: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    user_password: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    user_type: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    user_salt: {
      type: DataTypes.STRING(225),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
   // table Countries belong to Regions, pastikan relasi fk di set sesuai relasi di table, 
   Users.associate = models => {
    Users.hasMany(models.Course,{foreignKey: 'cors_user_id', onDelete: 'CASCADE'});
  };
  return Users;
};
export default users;