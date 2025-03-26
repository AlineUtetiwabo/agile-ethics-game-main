import connectDB from "../lib/mongodb";
import Vote from "../models/Votes";

export interface IVote {
    id: string;
    userId: string;
    roleplayId: string;
    vote: number;
}

export class VoteService {
    // Initialize database connection
    private static async init() {
        await connectDB();
    }

    // Create a new vote
    static async createVote(voteData: IVote): Promise<IVote> {
        await this.init();
        const vote = new Vote(voteData);
        return await vote.save();
    }

 
    // TODO: get votes for a single question

}