import mongoose from 'mongoose';
import { RoleplayService } from '../../services/roleplayService';
import Roleplay from '../../models/Roleplays';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define MONGODB_URI in your .env file');
}

describe('RoleplayService Integration Tests', () => {
    // Connect to the database before any tests run
    beforeAll(async () => {
        try {
            await mongoose.connect(MONGODB_URI);
            console.log('Connected to MongoDB for testing');
        } catch (error) {
            console.error('MongoDB connection error:', error);
            throw error;
        }
    });

    // Cleanup and close connection after all tests are done
    afterAll(async () => {
        try {
            await mongoose.connection.close();
            console.log('MongoDB connection closed');
        } catch (error) {
            console.error('Error closing MongoDB connection:', error);
            throw error;
        }
    });

    // Clean up test data after each test
    afterEach(async () => {
        try {
            await Roleplay.deleteMany({ id: { $regex: '^test-' } });
            console.log('Test data cleaned up');
        } catch (error) {
            console.error('Error cleaning up test data:', error);
            throw error;
        }
    });

    const testRoleplay = {
        id: 'test-integration-1',
        title: 'Integration Test Roleplay',
        slug: 'integration-test-roleplay',
        data: 'Test data for integration'
    };

    describe('Database Operations', () => {
        it('should successfully create and retrieve a roleplay', async () => {
            // Create roleplay
            const created = await RoleplayService.createRoleplay(testRoleplay);
            expect(created).toBeTruthy();
            expect(created.id).toBe(testRoleplay.id);

            // Retrieve the created roleplay
            const retrieved = await RoleplayService.getRoleplayById(testRoleplay.id);
            expect(retrieved).toBeTruthy();
            expect(retrieved?.title).toBe(testRoleplay.title);
        });

        it('should perform full CRUD operations', async () => {
            // Create
            const created = await RoleplayService.createRoleplay({
                ...testRoleplay,
                id: 'test-integration-2'
            });
            expect(created).toBeTruthy();

            // Read
            const retrieved = await RoleplayService.getRoleplayById('test-integration-2');
            expect(retrieved).toBeTruthy();

            // Update
            const updated = await RoleplayService.updateRoleplay('test-integration-2', {
                title: 'Updated Title'
            });
            expect(updated?.title).toBe('Updated Title');

            // Delete
            const deleted = await RoleplayService.deleteRoleplay('test-integration-2');
            expect(deleted).toBe(true);

            // Verify deletion
            const notFound = await RoleplayService.getRoleplayById('test-integration-2');
            expect(notFound).toBeNull();
        });

        it('should handle multiple roleplays', async () => {
            // Create multiple roleplays
            const roleplays = await Promise.all([
                RoleplayService.createRoleplay({
                    ...testRoleplay,
                    id: 'test-multi-1',
                    title: 'Multi Test 1'
                }),
                RoleplayService.createRoleplay({
                    ...testRoleplay,
                    id: 'test-multi-2',
                    title: 'Multi Test 2'
                })
            ]);

            expect(roleplays).toHaveLength(2);

            // Test getAllRoleplays
            const allRoleplays = await RoleplayService.getAllRoleplays();
            const testRoleplays = allRoleplays.filter(rp => rp.id.startsWith('test-multi'));
            expect(testRoleplays).toHaveLength(2);
        });

        it('should handle search functionality', async () => {
            // Create roleplays with searchable titles
            await RoleplayService.createRoleplay({
                ...testRoleplay,
                id: 'test-search-1',
                title: 'Searchable Roleplay'
            });

            await RoleplayService.createRoleplay({
                ...testRoleplay,
                id: 'test-search-2',
                title: 'Another Searchable'
            });

            const searchResults = await RoleplayService.searchRoleplays('Searchable');
            expect(searchResults.length).toBeGreaterThanOrEqual(2);
        });

        it('should handle errors appropriately', async () => {
            // Test duplicate ID
            await RoleplayService.createRoleplay(testRoleplay);
            await expect(RoleplayService.createRoleplay(testRoleplay))
                .rejects
                .toBeTruthy();

            // Test invalid ID for retrieval
            const nonExistent = await RoleplayService.getRoleplayById('non-existent-id');
            expect(nonExistent).toBeNull();
        });
    });
});