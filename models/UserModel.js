const { ObjectID } = require("mongodb");
const { adminsCollection } = require("../database/db");

class UserModel {
  constructor(id, name, email, password) {
    this._id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static async findByEmail(email) {
    const user = await adminsCollection.findOne({ email });
    return user;
  }

  static async findById(id) {
    const user = await adminsCollection.findOne({ _id: ObjectID(id) });
    return user;
  }

  static async createUser(name, email, password) {
    const newUser = { name, email, password };
    const result = await adminsCollection.insertOne(newUser);
    const createdUser = {
      _id: result.insertedId,
      ...newUser,
    };
    return createdUser;
  }
}

module.exports = UserModel;
