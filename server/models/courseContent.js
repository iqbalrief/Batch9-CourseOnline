const coursecontent = (sequelize, DataTypes) => {
const CourseContent = sequelize.define('course_content', {
    cont_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cont_title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cont_duration: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    cont_type: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    cont_resource_link: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cont_cors_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'course',
        key: 'cors_id'
      }
    }
  }, {
    sequelize,
    tableName: 'course_content',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "course_content_pkey",
        unique: true,
        fields: [
          { name: "cont_id" },
        ]
      },
    ]
  });
  return CourseContent;
};
export default coursecontent;