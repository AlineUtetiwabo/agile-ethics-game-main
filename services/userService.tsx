import connectDB from "../lib/mongodb";
import User from "../models/Users";

export interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
}

export class UserService {
    // Initialize database connection
    private static async init() {
        await connectDB();
    }

    // Create a new user
    static async createUser(userData: IUser): Promise<IUser> {
        await this.init();
        const user = new User(userData);
        return await user.save();
    }

    // Get all users
    static async getAllUsers(): Promise<IUser[]> {
        await this.init();
        return await User.find({});
    }

    // Delete users
    static async deleteUsers(): Promise<void> {
        await this.init();
        await User.deleteMany({});
    }
}