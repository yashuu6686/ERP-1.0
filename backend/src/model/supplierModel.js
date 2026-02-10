import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
    // Step 0: Information
    evaluationNo: { type: String, required: true, unique: true },
    supplierName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    contactPerson: { type: String, required: true },
    title: { type: String, required: true },
    phone: { type: String, required: true },

    // Step 1: Facilities
    yearEstablished: { type: String, required: true },
    totalSquareFootage: { type: String, required: true },
    numberOfEmployees: { type: Number, required: true },
    qaTitle: { type: String, required: true },
    numberOfQAEmployees: { type: Number, required: true },
    productServices: { type: String, required: true },

    // Step 2: Questionnaire
    questionnaire: { type: Object, default: {} },
    additionalComments: { type: String },

    // Step 3: Approval
    completedBy: { type: String, required: true },
    completedByTitle: { type: String, required: true },
    completedDate: { type: String, required: true },

    supplierApproved: { type: String },
    approvalComments: { type: String },
    reviewedBy: { type: String },
    reviewedDate: { type: String },
    approvedBy: { type: String },
    approvedDate: { type: String },

    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    },
    evaluationDate: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

const Supplier = mongoose.model("Supplier", supplierSchema);
export default Supplier;
