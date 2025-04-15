import { PetModel } from '../models/Pet.model.js';

class PetService {
    static async createMany(pets) {
        return await PetModel.insertMany(pets);
    }

    static async getAll() {
        return await PetModel.find().populate('owner');
    }

    static async deleteAll() {
        return await PetModel.deleteMany();
    }
}

export { PetService };
