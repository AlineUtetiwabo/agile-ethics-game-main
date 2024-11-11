// connect to the database
import connectDB from "../../lib/mongodb";
import User from "../../models/Users";

import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await connectDB();
    if (req.method === 'POST') {

        console.log("Find the route.....")
        console.log(req.body);
        const { id, netid, role, admin } = req.body;
        const user = new User({
            id: id,
            netid: netid,
            role: role,
            admin: admin
        });
        await user.save();
        res.status(201).json(user);
    }

    if (req.method === 'DELETE') {
        try {
            const { id } = req.body;
            const user = await User.findOneAndDelete({id: id});
            if (!user) {
                return res.status(404).json({message: 'Setting not found'});
            }
            res.status(200).json({ message: 'Setting deleted successfully' });

        } catch (error) {
            res.status(500).json({message: 'Internal Server Error'})
        }
    }
}