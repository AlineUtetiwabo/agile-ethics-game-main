import mongoose from 'mongoose';

const VoteSchema = new mongoose.Schema({
    id : {
        type: String,
        required: true
    },
    precept : {
        type: String,
        required: true
    },
    session : {
        type: String,
        required: true
    },
    poll_id : {
        type: String,
        required: true
    },
    simulation : {
        type: String,
        required: true
    },
    round : {
        type: Number,
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
    vote : {
        type: String,
        required: true
    },
    vote_text : {
        type: String,
        required: true
    }
});

const Vote = mongoose.models.Vote || mongoose.model('Vote', VoteSchema);

export default Vote;
