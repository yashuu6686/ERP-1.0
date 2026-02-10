import mongoose from "mongoose";

const supplierSurveySchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },

    management: [
        {
            name: { type: String },
            title: { type: String },
            email: { type: String }
        }
    ],

    customerServiceContact: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true }
    },

    qualityContact: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true }
    },

    fax: { type: String },
    website: { type: String },
    vatTin: { type: String },
    pan: { type: String },

    businessStatus: {
        soleOwnership: { type: Boolean, default: false },
        partnership: { type: Boolean, default: false },
        privateCorp: { type: Boolean, default: false },
        publicCorp: { type: Boolean, default: false }
    },

    financials: {
        yearsInBusiness: { type: String },
        totalEmployees: { type: String },
        qaEmployees: { type: String },
        revenuePrevYear: { type: String },
        revenueThisYear: { type: String },
        incomePrevYear: { type: String },
        incomeThisYear: { type: String }
    },

    facilities: {
        manufacturingSpace: { type: String },
        warehouseSpace: { type: String },
        laboratorySpace: { type: String }
    },

    parentCompany: { type: String },
    otherLocations: { type: String },

    supplierType: {
        product: { type: Boolean, default: false },
        service: { type: Boolean, default: false }
    },

    productCapabilities: {
        customComponentMfg: { type: Boolean, default: false },
        standardComponentMfg: { type: Boolean, default: false },
        componentDistributor: { type: Boolean, default: false },
        processingItemSupplier: { type: Boolean, default: false },
        contractProductMfg: { type: Boolean, default: false },
        contractPackager: { type: Boolean, default: false },
        productsDescription: { type: String }
    },

    serviceCapabilities: {
        advertising: { type: Boolean, default: false },
        consultant: { type: Boolean, default: false },
        contractProcessor: { type: Boolean, default: false },
        contractDistributor: { type: Boolean, default: false },
        contractSterilizer: { type: Boolean, default: false },
        languageTranslation: { type: Boolean, default: false },
        maintenance: { type: Boolean, default: false },
        it: { type: Boolean, default: false },
        transportation: { type: Boolean, default: false },
        qaRegulatory: { type: Boolean, default: false },
        testLab: { type: Boolean, default: false },
        other: { type: Boolean, default: false },
        servicesDescription: { type: String }
    },

    underConsideration: { type: String },
    majorCustomers: [{ type: String }],
    majorSuppliers: [{ type: String }],

    signOff: {
        name: { type: String, required: true },
        position: { type: String, required: true },
        date: { type: String, required: true }
    },

    scanboReview: {
        reviewedBy: { type: String },
        reviewedDate: { type: String },
        approvedBy: { type: String },
        approvedDate: { type: String }
    },

    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

const SupplierSurvey = mongoose.model("SupplierSurvey", supplierSurveySchema);
export default SupplierSurvey;
