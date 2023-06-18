const { ObjectID } = require("mongodb");
const { adminsCollection } = require("../database/db");

class AdminModel {
  constructor(id, name, email, password, additionalInfo) {
    this._id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.additionalInfo = additionalInfo;
  }

  static async findByEmail(email) {
    const admin = await adminsCollection.findOne({ email: email });
    return admin;
  }

  static async findById(id) {
    console.log(id);
    const admin = await adminsCollection.findOne({ _id: ObjectID(id) });
    return admin;
  }

  static async createAdmin(name, email, password, additionalInfo) {
    const newAdmin = { name, email, password, additionalInfo };
    console.log(newAdmin);
    const result = await adminsCollection.insertOne(newAdmin);
    const createdAdmin = {
      _id: result.insertedId,
      ...newAdmin,
    };
    return createdAdmin;
  }
}

module.exports = AdminModel;
