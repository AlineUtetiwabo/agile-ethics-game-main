// pages/api/roleplays.tsx
import { NextApiRequest, NextApiResponse } from 'next';
import { RoleplayService } from '../../services/roleplayService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case 'GET':
                if (req.query.id) {
                    const roleplay = await RoleplayService.getRoleplayById(req.query.id as string);
                    if (!roleplay) {
                        return res.status(404).json({ message: 'Roleplay not found' });
                    }
                    return res.status(200).json(roleplay);
                }
                const roleplays = await RoleplayService.getAllRoleplays();
                return res.status(200).json(roleplays);

            case 'POST':
                const newRoleplay = await RoleplayService.createRoleplay(req.body);
                return res.status(201).json(newRoleplay);

            case 'PUT':
                const { id, ...updateData } = req.body;
                const updatedRoleplay = await RoleplayService.updateRoleplay(id, updateData);
                if (!updatedRoleplay) {
                    return res.status(404).json({ message: 'Roleplay not found' });
                }
                return res.status(200).json(updatedRoleplay);

            case 'DELETE':
                const deleted = await RoleplayService.deleteRoleplay(req.body.id);
                if (!deleted) {
                    return res.status(404).json({ message: 'Roleplay not found' });
                }
                return res.status(200).json({ message: 'Roleplay deleted successfully' });

            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
        }
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}