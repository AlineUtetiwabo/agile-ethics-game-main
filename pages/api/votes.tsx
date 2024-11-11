// connect to the database
import connectDB from "../../lib/mongodb";
import Vote from "../../models/Votes";

import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await connectDB();
    if (req.method === 'POST') {

        console.log("Find the route.....")
        console.log(req.body);
        const { id, precept, session, poll_id, simulation, round, netid, role, vote, vote_text } = req.body;
        const vOte = new Vote({
            id: id,
            precept: precept,
            session: session,
            poll_id: poll_id,
            simulation: simulation,
            round: round, 
            netid: netid,
            role: role,
            vote: vote,
            vote_text: vote_text
        });
        await vOte.save();
        res.status(201).json(vote);
    }

    if (req.method === 'DELETE') {
        try {
            const { id } = req.body;
            const vote = await Vote.findOneAndDelete({id: id});
            if (!vote) {
                return res.status(404).json({message: 'Setting not found'});
            }
            res.status(200).json({ message: 'Setting deleted successfully' });

        } catch (error) {
            res.status(500).json({message: 'Internal Server Error'})
        }
    }
}