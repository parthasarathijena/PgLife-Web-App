const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    propertyName: {
        type: String,
        required: true,
        unique: true,
        default: ''
    },
    propertyAddress: {
        type: String,
        required: true,
        default: ''
    },
    city: {
        type: String,
        required: true,
        default: ''
    },
    propertyGender: {
        type: String,
        default: ''
    },
    propertyRent: {
        type: String,
        required: true,
        default: ''
    },
    propertyAmenities: {
        type: Array,
        default: []
    },
    propertyAbout: {
        type: String,
        default: ''
    },
    propertyRating: {
        type: Array,
        default: []
    },
    propertyTestimonials: {
        type: Array,
        default: []
    },
    images: {
        type: Array,
        default: ['defaultImg.jpg']
    },
    likes: {
        type: Array,
        default: []
    }
}
    , { timestamps: true }
)


const User = mongoose.model('PROPERTY', propertySchema);
module.exports = User;