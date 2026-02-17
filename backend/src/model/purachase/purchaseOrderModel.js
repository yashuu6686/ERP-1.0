import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    qty: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
}, { _id: false });

const orderInfoSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    orderDate: {
        type: String,
        required: true
    },
    expectedDelivery: {
        type: String,
        required: true
    }
}, { _id: false });

const supplierSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    contactPerson: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    pan: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    gstin: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    }
}, { _id: false });

const deliverySchema = new mongoose.Schema({
    invoiceTo: {
        type: String,
        required: true,
        trim: true
    },
    deliverTo: {
        type: String,
        required: true,
        trim: true
    },
    deliveryAddress: {
        type: String,
        required: true,
        trim: true
    },
    contactPerson: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }
}, { _id: false });

const totalsSchema = new mongoose.Schema({
    subtotal: {
        type: Number,
        required: true,
        default: 0
    },
    taxAmount: {
        type: Number,
        required: true,
        default: 0
    },
    discountAmount: {
        type: Number,
        required: true,
        default: 0
    },
    otherDiscountAmount: {
        type: Number,
        required: true,
        default: 0
    },
    grandTotal: {
        type: Number,
        required: true,
        default: 0
    }
}, { _id: false });

const purchaseOrderSchema = new mongoose.Schema(
    {
        items: {
            type: [itemSchema],
            required: true,
            validate: {
                validator: function (items) {
                    return items && items.length > 0;
                },
                message: "At least one item is required"
            }
        },
        taxRate: {
            type: Number,
            required: true,
            default: 18,
            min: 0,
            max: 100
        },
        discount: {
            type: Number,
            default: 0,
            min: 0
        },
        shippingCharges: {
            type: Number,
            default: 0,
            min: 0
        },
        otherDiscount: {
            type: Number,
            default: 0,
            min: 0
        },
        orderInfo: {
            type: orderInfoSchema,
            required: true
        },
        supplier: {
            type: supplierSchema,
            required: true
        },
        delivery: {
            type: deliverySchema,
            required: true
        },
        status: {
            type: String,
            enum: ["Pending", "Confirmed", "In Progress", "Completed", "Cancelled"],
            default: "Pending"
        },
        totals: {
            type: totalsSchema,
            required: true
        },
        isEdited: {
            type: Boolean,
            default: false
        },
        creatorId: {
            type: String,
            required: true
        },
        creatorName: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

// Index for faster queries
purchaseOrderSchema.index({ 'orderInfo.orderNumber': 1 });
purchaseOrderSchema.index({ status: 1 });
purchaseOrderSchema.index({ createdAt: -1 });
purchaseOrderSchema.index({ 'supplier.companyName': 1 });

const PurchaseOrder = mongoose.model("PurchaseOrder", purchaseOrderSchema);

export default PurchaseOrder;
