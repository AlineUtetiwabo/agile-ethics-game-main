import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
    id : {
        type: String,
        required: true
    },
    setting_key: {
        type: String,
        required: true
    },
    setting_value: {
        type: String,
        required: true
    } 
    
});

const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);

export default Settings;