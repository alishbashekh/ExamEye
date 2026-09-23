import mongoose from "mongoose"

const ViolationLogSchema = new mongoose.Schema({
    studentId:{
      type: String,
      required: true,
    },
    examId:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        enum: [
            "TAB_SWITCH",
            "FULLSCREEN_EXIT",
            "COPY_ATTEMPT",
            "PASTE_ATTEMPT",
            "DEV_TOOLS_OPEN",
            "PHONE_DETECTED",
            "FACE_NOT_MATCHED",
            "MULTIPLE_FACES",
            "NO_FACE_DETECTED",
              
        ],
        required: true,
    },
    confidence:{
        type: Number,
        default: 1.0,
    },
    timestamp:{
        type: Date,
        default: Date.now,

    },
});

const ViolationLog = mongoose.model("ViolationLog", ViolationLogSchema);

export default ViolationLog;