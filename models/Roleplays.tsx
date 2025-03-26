import mongoose from 'mongoose';

type RoleType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' ;

type GroupType = 'Tech Writers' | 'End Users' | 'Board of Directors';

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
    },
    active: {
        type: Boolean,
        default: false
    },
    roles: {
        type: String as unknown as RoleType,
        required: true
    },
    group: {
        type: String as unknown as GroupType,
        required: true
    },
    admins: {
        type: [String],
        default: []
    },
});

const Roleplay = mongoose.models.Roleplay || mongoose.model('Roleplay', RoleplaySchema);

export default Roleplay;

// TODO: working on the role schema