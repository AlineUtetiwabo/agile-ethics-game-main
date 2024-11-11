import mongoose from 'mongoose';

const RoleplaySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    }
});

const Roleplay = mongoose.models.Roleplay || mongoose.model('Roleplay', RoleplaySchema);

export default Roleplay;