import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
//Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Name is required"],
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      require: [true, "Email is required"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      require: [true, "Password is required"],
      minlength: [6, "Password length should be greater then 6 character"],
      select: true,
    },
    location: {
      type: String,
      default: "Indore",
    },
  },
  { timestamps: true }
);

//middleware
userSchema.pre("save", async function () {
  if(!this.isModified) return; // password modify single line code
  if (!this.isModified) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Compared password
userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

//jsonwebtoken
userSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
export default mongoose.model("user", userSchema);
