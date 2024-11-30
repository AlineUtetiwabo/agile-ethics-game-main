import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { RoleplayService } from '../../services/roleplayService';
import Roleplay from '../../models/Roleplays';

describe('RoleplayService', () => {
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        // Create an in-memory MongoDB instance
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        // Clear the database before each test
        await Roleplay.deleteMany({});
    });

    const mockRoleplay = {
        id: 'test-id-1',
        title: 'Test Roleplay',
        slug: 'test-roleplay',
        data: 'Test roleplay data'
    };

    describe('createRoleplay', () => {
        it('should create a new roleplay', async () => {
            const roleplay = await RoleplayService.createRoleplay(mockRoleplay);
            
            expect(roleplay.id).toBe(mockRoleplay.id);
            expect(roleplay.title).toBe(mockRoleplay.title);
            expect(roleplay.slug).toBe(mockRoleplay.slug);
            expect(roleplay.data).toBe(mockRoleplay.data);
        });

        it('should throw error if required fields are missing', async () => {
            const invalidRoleplay = { id: 'test-id' };
            
            await expect(RoleplayService.createRoleplay(invalidRoleplay as any))
                .rejects
                .toThrow();
        });
    });

    describe('getRoleplayById', () => {
        it('should retrieve roleplay by id', async () => {
            await RoleplayService.createRoleplay(mockRoleplay);
            
            const roleplay = await RoleplayService.getRoleplayById(mockRoleplay.id);
            
            expect(roleplay).not.toBeNull();
            expect(roleplay?.title).toBe(mockRoleplay.title);
        });

        it('should return null for non-existent id', async () => {
            const roleplay = await RoleplayService.getRoleplayById('non-existent-id');
            
            expect(roleplay).toBeNull();
        });
    });

    describe('updateRoleplay', () => {
        it('should update roleplay successfully', async () => {
            await RoleplayService.createRoleplay(mockRoleplay);
            
            const updatedData = {
                title: 'Updated Title',
                data: 'Updated data'
            };
            
            const updated = await RoleplayService.updateRoleplay(mockRoleplay.id, updatedData);
            
            expect(updated?.title).toBe(updatedData.title);
            expect(updated?.data).toBe(updatedData.data);
            expect(updated?.id).toBe(mockRoleplay.id);
        });

        it('should return null when updating non-existent roleplay', async () => {
            const updated = await RoleplayService.updateRoleplay('non-existent-id', { title: 'New Title' });
            
            expect(updated).toBeNull();
        });
    });

    describe('deleteRoleplay', () => {
        it('should delete roleplay successfully', async () => {
            await RoleplayService.createRoleplay(mockRoleplay);
            
            const result = await RoleplayService.deleteRoleplay(mockRoleplay.id);
            const deletedRoleplay = await RoleplayService.getRoleplayById(mockRoleplay.id);
            
            expect(result).toBe(true);
            expect(deletedRoleplay).toBeNull();
        });

        it('should return false when deleting non-existent roleplay', async () => {
            const result = await RoleplayService.deleteRoleplay('non-existent-id');
            
            expect(result).toBe(false);
        });
    });

    describe('searchRoleplays', () => {
        it('should find roleplays by search query', async () => {
            await RoleplayService.createRoleplay(mockRoleplay);
            await RoleplayService.createRoleplay({
                ...mockRoleplay,
                id: 'test-id-2',
                title: 'Another Test'
            });
            
            const results = await RoleplayService.searchRoleplays('Test');
            
            expect(results.length).toBe(2);
        });

        it('should return empty array for no matches', async () => {
            const results = await RoleplayService.searchRoleplays('NonExistent');
            
            expect(results.length).toBe(0);
        });
    });
});