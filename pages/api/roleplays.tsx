// connect to the database
import connectDB from "../../lib/mongodb";
import Roleplay from "../../models/Roleplays";

import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await connectDB();
    if (req.method === 'POST') {

        console.log("Find the route.....")
        console.log(req.body);
        const { id, title, slug, data } = req.body;
        const role = new Roleplay({
            id: id,
            title: title,
            slug: slug,
            data: data
        });
        await role.save();
        res.status(201).json(role);
    }

    if (req.method === 'DELETE') {
        try {
            const { id } = req.body;
            const role = await Roleplay.findOneAndDelete({id: id});
            if (!role) {
                return res.status(404).json({message: 'Roleplay not found'});
            }
            res.status(200).json({ message: 'Roleplay deleted successfully' });

        } catch (error) {
            res.status(500).json({message: 'Internal Server Error'})
        }
    }
}