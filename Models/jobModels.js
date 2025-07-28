import mongoose from "mongoose";



const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        require:[true, 'Company name is required']
    },
    position: {
        type:String,
        require:[true, 'Position name is required'],
        maxlength:100
    },
    status:{
        type:String,
        enum:['Pending', 'Reject','Interview'],
        default:'pending'
    },
    workType:{
        type:String,
        enum:['Full-Time','Pat-Time','Internship','Contract'],
        default:'Full-Time'
    },
    workLocatiom:{
        type:String,
        default:"Mumbai",
        require:[true, 'Work location is require']
    },

    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: "user"
    }
},{timestamps:true})

export default mongoose.model("job", jobSchema)