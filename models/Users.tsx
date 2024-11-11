import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    id : {
        type: String,
        required: true
    },
    netid : {
        type: String,
        required: true
    },

    role : {
        type: String,
        required: true
    },

    admin : {
        type: Boolean,
        required: true
    }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;