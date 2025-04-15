import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, min: 0 },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }]
}, { timestamps: true });

userSchema.index({ email: 1 }, { unique: true });

export const UserModel = mongoose.model('User', userSchema);