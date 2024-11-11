// connect to the database
import connectDB from "../../lib/mongodb";
import Setting from "../../models/Settings";

import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await connectDB();
    if (req.method === 'POST') {

        console.log("Find the route.....")
        console.log(req.body);
        const { id, setting_key, setting_value } = req.body;
        const setting = new Setting({
            id: id,
            setting_key: setting_key,
            setting_value: setting_value
        });
        await setting.save();
        res.status(201).json(setting);
    }

    if (req.method === 'DELETE') {
        try {
            const { id } = req.body;
            const role = await Setting.findOneAndDelete({id: id});
            if (!role) {
                return res.status(404).json({message: 'Setting not found'});
            }
            res.status(200).json({ message: 'Setting deleted successfully' });

        } catch (error) {
            res.status(500).json({message: 'Internal Server Error'})
        }
    }
}