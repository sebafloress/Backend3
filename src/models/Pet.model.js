import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specie: { type: String, enum: ['dog', 'cat', 'bird'], required: true },
    birthDate: Date,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export const PetModel = mongoose.model('Pet', petSchema);