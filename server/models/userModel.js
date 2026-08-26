import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        username: { type: String },
        bio: {type: String},
        availableForRides: { type: Boolean },
        phone: { type: String },
        role: { type: String, required: true },
        password: { type: String, required: true },
        profilePicture: { type: String },
        resetCode: {
              type: String,
              select: false,
        },
        resetCodeExpires: { type: Date, select: false },
}, { timestamps: true })

//Hash password input
userSchema.pre("save", async function(next){
       if(!this.isModified("password")){
             next();
       }
       const salt = await bcrypt.genSalt(10);
       this.password = await bcrypt.hash(this.password, salt);
})

//Hash password incase its changed during update
userSchema.pre(["findByIdAndUpdate", "findOneAndUpdate"], async function(next){
        const data = this.getUpdate();
        const salt = await bcrypt.genSalt(10);
        if(data.password){
             data.password = await bcrypt.hash(data.password, salt);
        }
        next();
});

//Compare hashed password with entered input
userSchema.methods.matchPasswords = async function(enteredPassword){
      return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);

export default User; 