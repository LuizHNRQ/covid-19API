const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  })

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password)
  }

  User.prototype.generateToken = function () {
    return jwt.sign({ userId: this.id }, process.env.APP_SECRET)
  }

  User.associate = (models) => {
    User.hasMany(models.Message, {
      as: 'message',
      foreignKey: 'user_id',
      targetKey: 'id',
    })
  }

  return User
}
