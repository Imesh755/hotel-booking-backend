import mongoose from "mongoose";
import { type } from "os";
import { start } from "repl";

const bookingSchima = new mongoose.Schema({
    bookingId : {
        type : Number,
        required : true,
        unique : true
    },
    roomid : {
        type : Number,
        required : true,
    },
    email : {
        type : String,
        required : true
    },
    sattus : {
        type : String,
        required : true,
        default : "panding"
    },
    reason : {
        type : String,
        default : ""
    },
    start : {
        type : Date,
        required : true
    },
    end : {
        type : Date,
        required : true
    },
    notes : {
        type : String,
        default : ""
    }

})

const Booking = mongoose.model("Bookings",bookingSchema)
export default Booking;