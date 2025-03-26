import connectDB from "../lib/mongodb";
import Roleplay from "../models/Roleplays";

export interface IRoleplay {
    id: string;
    title: string;
    slug: string;
    data: string;
}

export class RoleplayService {
    // Initialize database connection
    private static async init() {
        await connectDB();
    }

    // Create a new roleplay
    static async createRoleplay(roleplayData: IRoleplay): Promise<IRoleplay> {
        await this.init();
        const roleplay = new Roleplay(roleplayData);
        return await roleplay.save();
    }

    // Get all roleplays
    static async getAllRoleplays(): Promise<IRoleplay[]> {
        await this.init();
        return await Roleplay.find({});
    }

    // Get roleplay by ID
    static async getRoleplayById(id: string): Promise<IRoleplay | null> {
        await this.init();
        return await Roleplay.findOne({ id });
    }

    // Get roleplay by slug
    static async getRoleplayBySlug(slug: string): Promise<IRoleplay | null> {
        await this.init();
        return await Roleplay.findOne({ slug });
    }

    // Update roleplay
    static async updateRoleplay(id: string, updateData: Partial<IRoleplay>): Promise<IRoleplay | null> {
        await this.init();
        return await Roleplay.findOneAndUpdate(
            { id },
            { $set: updateData },
            { new: true }
        );
    }

    // Delete roleplay
    static async deleteRoleplay(id: string): Promise<boolean> {
        await this.init();
        const result = await Roleplay.findOneAndDelete({ id });
        return result !== null;
    }

    // Search roleplays by title
    static async searchRoleplays(searchQuery: string): Promise<IRoleplay[]> {
        await this.init();
        return await Roleplay.find({
            title: { $regex: searchQuery, $options: 'i' }
        });
    }
}