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
            "PHONE_DETECTED",
            "TAB_SWITCH",
            "FACE_NOT_MATCHED",
            "MULTIPLE_FACES",
            "NO_FACE_DETECTED",
            "COPY_PASTE_ATTEMPT",
            "FULLSCREEN_EXIT",
        ],
        required: true,
    },
    confidence:{
        type: Number,
    },
    timestamp:{
        type: Date,
        default: Date.now,

    },
});

const ViolationLog = mongoose.model("ViolationLog", ViolationLogSchema);

export default ViolationLog;