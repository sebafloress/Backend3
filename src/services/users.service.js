import { UserModel } from '../models/user.model.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

class UserService {
    static async createMany(users) {
        const usersWithEncryptedPass = await Promise.all(
            users.map(async user => ({
                ...user,
                password: await bcrypt.hash(user.password, saltRounds)
            }))
        );
        return await UserModel.insertMany(usersWithEncryptedPass);
    }

    static async getAll() {
        return await UserModel.find().populate('pets');
    }

    static async deleteAll() {
        return await UserModel.deleteMany();
    }
}

export { UserService };
