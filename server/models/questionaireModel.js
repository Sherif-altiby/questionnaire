import mongoose from "mongoose";

const questionaireSchema = mongoose.Schema(
    {
        title: {
            type: String,
            require: true
        },
        rating: [
            {
                name: {
                    type: String,
                    require: true
                },
                rate: {
                    type: Number,
                    require: true,
                },
                image: {
                    type: String,
                }
            }
        ]
    }
);


export const Questionaire = mongoose.model('Cat', questionaireSchema)