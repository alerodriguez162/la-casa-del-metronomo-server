// Iteration #1
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    lastName: String,
    passwordHash: {
      type: String,
      required: [true, "Ingresar contraseña válida"],
    },
    picture: { type: String, default: "https://res.cloudinary.com/di9gjsobh/image/upload/v1634893573/pngkey.com-notas-musicales-png-1059739_vbxbwk.png" },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    roles: String,
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

userSchema.options.toJSON = {
  transform: function (doc, ret) {
    delete ret.passwordHash;
    delete ret.__v;
  },
};

const User = mongoose.model("User", userSchema);

module.exports = User;
