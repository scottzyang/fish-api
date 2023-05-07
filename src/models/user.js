const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  logs: [{ type: Schema.Types.ObjectId, ref: 'Log' }]
}, { timestamps: true });

// execute password checking prior to save
userSchema.pre('save', function (next) {
  const user = this;
  console.log("This ran hehee")

  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (_, hash) => {
      user.password = hash;
      next();
    });
  });
});

// Authenticate login by comparing DB password and user PW
userSchema.methods.comparePassword = function (password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    done(err, isMatch);
  })
}


const User = model("User", userSchema)

module.exports = User;
