const {Sequelize,DataTypes} = require('sequelize');
require('dotenv').config();
const sequelizedb = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

const postdb=sequelizedb.define('post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

const user = sequelizedb.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false

    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true,
        isUnique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
user.hasMany(postdb);
try {
    sequelizedb.sync();
    console.log('Table created successfully!');
} catch (error) {
    console.error('Unable to create table:', error);
}


module.exports = { sequelizedb,user,postdb };