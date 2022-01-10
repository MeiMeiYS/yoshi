'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256]
      },
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'Images' }
    }
  }, {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
    },
  });

  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.Image, {foreignKey: 'imageId'});
    User.hasMany(models.Party, { foreignKey: 'ownerId' });

    const requestMapping = {
      through: 'Request',
      otherKey: 'partyId',
      foreignKey: 'userId'
    }
    User.belongsTo(models.Party, requestMapping);

    const partyUserMapping = {
      through: 'PartyUser',
      otherKey: 'partyId',
      foreignKey: 'userId'
    }
    User.belongsTo(models.Party, partyUserMapping);

    User.hasMany(models.PartyChat, { foreignKey: 'userId' });
  };

  //vvv User Model Methods
  //vvv This instance method will return an object with only the User instance information that is safe to save to a JWT
  User.prototype.toSafeObject = function() { // remember, this cannot be an arrow function
    const { id, username, email } = this; // context will be the User instance
    return { id, username, email };
  };

  //vvv This instance method will return a boolean, true is password is correct
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  //vvv This static method will return the current user
  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  /*vvv This static method will accept an object with a credential and password key.
  The method should search for one User with the specified credential, (a username
  or an email). If a user is found, then validate the password by passing it into
  the instance's .validatePassword method. If the password is valid, then return the
  user by using the currentUser scope. */
  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  /*vvv This static method will accept an object with a username, email and password key.
  Create a User with the username, email, and hashedPassword. Return the created user
  using the currentUser scope. */
  User.signup = async function ({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword,
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  return User;
};
