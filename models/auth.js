const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const crypt = require("crypt");
const { use } = require("react");

const userSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true,
            max: 32,
        },
        email:{
             type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },
        hashed_password:{
            type: String,
            required: true,
            min: 6,

        },
        salt: String,
        role:{
            type: String,
            default: "user",
    },
    { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
    encryptPassword: function (password) {
        if (!password) return "";
        try {
            return crypt
            .createHmac("sha1", this.salt)
            .update(password)
            .digest("hex");
        }
        catch (err) {
            return "";
    }
},
makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
}

module.exports = mongoose.model("User", userSchema);
