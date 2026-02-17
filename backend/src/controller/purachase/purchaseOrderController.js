import PurchaseOrder from "../../model/purachase/purchaseOrderModel.js";
import mongoose from "mongoose";

const CreatePurchaseOrder = async (req, res) => {
    try {
        const {
            items,
            taxRate,
            discount,
            shippingCharges,
            otherDiscount,
            orderInfo,
            supplier,
            delivery,
            status,
            totals,
            creatorId,
            creatorName
        } = req.body;

        // Validation: Check if items array is provided and not empty
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                message: "At least one item is required"
            });
        }

        // Validation: Validate each item
        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            if (!item.name || typeof item.name !== 'string' || item.name.trim().length === 0) {
                return res.status(400).json({
                    message: `Item ${i + 1}: Name is required and must be a non-empty string`
                });
            }

            if (!item.qty || isNaN(parseFloat(item.qty)) || parseFloat(item.qty) <= 0) {
                return res.status(400).json({
                    message: `Item ${i + 1}: Quantity must be a positive number`
                });
            }

            if (!item.price || isNaN(parseFloat(item.price)) || parseFloat(item.price) <= 0) {
                return res.status(400).json({
                    message: `Item ${i + 1}: Price must be a positive number`
                });
            }

            if (item.total === undefined || isNaN(item.total) || item.total < 0) {
                return res.status(400).json({
                    message: `Item ${i + 1}: Total must be a non-negative number`
                });
            }
        }

        // Validation: Tax rate
        if (taxRate !== undefined && (isNaN(taxRate) || taxRate < 0 || taxRate > 100)) {
            return res.status(400).json({
                message: "Tax rate must be between 0 and 100"
            });
        }

        // Validation: Discount
        if (discount !== undefined && (isNaN(discount) || discount < 0)) {
            return res.status(400).json({
                message: "Discount must be a non-negative number"
            });
        }

        // Validation: Shipping charges
        if (shippingCharges !== undefined && (isNaN(shippingCharges) || shippingCharges < 0)) {
            return res.status(400).json({
                message: "Shipping charges must be a non-negative number"
            });
        }

        // Validation: Other discount
        if (otherDiscount !== undefined && (isNaN(otherDiscount) || otherDiscount < 0)) {
            return res.status(400).json({
                message: "Other discount must be a non-negative number"
            });
        }

        // Validation: Order info
        if (!orderInfo || typeof orderInfo !== 'object') {
            return res.status(400).json({
                message: "Order information is required"
            });
        }

        if (!orderInfo.orderNumber || typeof orderInfo.orderNumber !== 'string' || orderInfo.orderNumber.trim().length === 0) {
            return res.status(400).json({
                message: "Order number is required"
            });
        }

        if (!orderInfo.orderDate || typeof orderInfo.orderDate !== 'string') {
            return res.status(400).json({
                message: "Order date is required"
            });
        }

        if (!orderInfo.expectedDelivery || typeof orderInfo.expectedDelivery !== 'string') {
            return res.status(400).json({
                message: "Expected delivery date is required"
            });
        }

        // Check for duplicate order number
        const existingOrder = await PurchaseOrder.findOne({
            'orderInfo.orderNumber': orderInfo.orderNumber
        });

        if (existingOrder) {
            return res.status(409).json({
                message: "An order with this order number already exists"
            });
        }

        // Validation: Supplier
        if (!supplier || typeof supplier !== 'object') {
            return res.status(400).json({
                message: "Supplier information is required"
            });
        }

        const requiredSupplierFields = ['companyName', 'contactPerson', 'address', 'email', 'phone', 'pan', 'gstin'];
        for (const field of requiredSupplierFields) {
            if (!supplier[field] || typeof supplier[field] !== 'string' || supplier[field].trim().length === 0) {
                return res.status(400).json({
                    message: `Supplier ${field} is required`
                });
            }
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(supplier.email)) {
            return res.status(400).json({
                message: "Supplier email is invalid"
            });
        }

        // Phone validation (10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(supplier.phone.replace(/\s/g, ''))) {
            return res.status(400).json({
                message: "Supplier phone must be a 10-digit number"
            });
        }

        // PAN validation (10 characters)
        if (supplier.pan.length !== 13) {
            return res.status(400).json({
                message: "Supplier PAN must be 13 characters"
            });
        }

        // GSTIN validation (15 characters)
        if (supplier.gstin.length !== 13) {
            return res.status(400).json({
                message: "Supplier GSTIN must be 13 characters"
            });
        }

        // Validation: Delivery
        if (!delivery || typeof delivery !== 'object') {
            return res.status(400).json({
                message: "Delivery information is required"
            });
        }

        const requiredDeliveryFields = ['invoiceTo', 'deliverTo', 'deliveryAddress', 'contactPerson', 'phone', 'email'];
        for (const field of requiredDeliveryFields) {
            if (!delivery[field] || typeof delivery[field] !== 'string' || delivery[field].trim().length === 0) {
                return res.status(400).json({
                    message: `Delivery ${field} is required`
                });
            }
        }

        // Delivery email validation
        if (!emailRegex.test(delivery.email)) {
            return res.status(400).json({
                message: "Delivery email is invalid"
            });
        }

        // Delivery phone validation
        if (!phoneRegex.test(delivery.phone.replace(/\s/g, ''))) {
            return res.status(400).json({
                message: "Delivery phone must be a 10-digit number"
            });
        }

        // Validation: Status
        const validStatuses = ["Pending", "Confirmed", "In Progress", "Completed", "Cancelled"];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({
                message: `Status must be one of: ${validStatuses.join(', ')}`
            });
        }

        // Validation: Totals
        if (!totals || typeof totals !== 'object') {
            return res.status(400).json({
                message: "Totals information is required"
            });
        }

        const requiredTotalFields = ['subtotal', 'taxAmount', 'discountAmount', 'otherDiscountAmount', 'grandTotal'];
        for (const field of requiredTotalFields) {
            if (totals[field] === undefined || isNaN(totals[field]) || totals[field] < 0) {
                return res.status(400).json({
                    message: `Totals ${field} must be a non-negative number`
                });
            }
        }

        // Validation: Creator info
        if (!creatorId || typeof creatorId !== 'string' || creatorId.trim().length === 0) {
            return res.status(400).json({
                message: "Creator ID is required"
            });
        }

        if (!creatorName || typeof creatorName !== 'string' || creatorName.trim().length === 0) {
            return res.status(400).json({
                message: "Creator name is required"
            });
        }

        // Create purchase order
        const purchaseOrder = new PurchaseOrder({
            items,
            taxRate: taxRate || 18,
            discount: discount || 0,
            shippingCharges: shippingCharges || 0,
            otherDiscount: otherDiscount || 0,
            orderInfo,
            supplier,
            delivery,
            status: status || "Pending",
            totals,
            isEdited: false,
            creatorId,
            creatorName
        });

        await purchaseOrder.save();

        res.status(201).json({
            message: "Purchase order created successfully",
            data: { ...purchaseOrder._doc, id: purchaseOrder._id }
        });
    } catch (error) {
        console.error("Error creating purchase order:", error);

        // Handle mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                message: "Validation failed",
                errors: messages
            });
        }

        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(409).json({
                message: "An order with this order number already exists"
            });
        }

        res.status(500).json({
            message: "An error occurred while creating the purchase order"
        });
    }
};

const GetPurchaseOrders = async (req, res) => {
    try {
        const { page, limit, status, search, sortBy, sortOrder, startDate, endDate } = req.query;

        // Build filter object
        const filter = {};

        // Filter by status
        if (status) {
            const validStatuses = ["Pending", "Confirmed", "In Progress", "Completed", "Cancelled"];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({
                    message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
                });
            }
            filter.status = status;
        }

        // Search by order number or supplier name
        if (search && typeof search === 'string') {
            filter.$or = [
                { 'orderInfo.orderNumber': { $regex: search.trim(), $options: 'i' } },
                { 'supplier.companyName': { $regex: search.trim(), $options: 'i' } }
            ];
        }

        // Filter by date range
        if (startDate || endDate) {
            filter['orderInfo.orderDate'] = {};
            if (startDate) {
                filter['orderInfo.orderDate'].$gte = startDate;
            }
            if (endDate) {
                filter['orderInfo.orderDate'].$lte = endDate;
            }
        }

        // Pagination
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 10;

        if (pageNum < 1) {
            return res.status(400).json({
                message: "Page number must be greater than 0"
            });
        }

        if (limitNum < 1 || limitNum > 100) {
            return res.status(400).json({
                message: "Limit must be between 1 and 100"
            });
        }

        // Sorting
        const validSortFields = ['createdAt', 'updatedAt', 'orderInfo.orderDate', 'totals.grandTotal', 'status'];
        const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
        const sortDirection = sortOrder === 'asc' ? 1 : -1;

        const skip = (pageNum - 1) * limitNum;

        // Fetch orders
        const orders = await PurchaseOrder.find(filter)
            .sort({ [sortField]: sortDirection })
            .skip(skip)
            .limit(limitNum);

        const totalOrders = await PurchaseOrder.countDocuments(filter);

        const mappedOrders = orders.map(order => ({
            ...order._doc,
            id: order._id
        }));

        res.status(200).json({
            message: "Purchase orders fetched successfully",
            data: mappedOrders,
            pagination: {
                currentPage: pageNum,
                totalPages: Math.ceil(totalOrders / limitNum),
                totalOrders,
                limit: limitNum
            }
        });
    } catch (error) {
        console.error("Error fetching purchase orders:", error);
        res.status(500).json({
            message: "An error occurred while fetching purchase orders"
        });
    }
};

const GetPurchaseOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "Purchase order ID is required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid purchase order ID format"
            });
        }

        const order = await PurchaseOrder.findById(id);

        if (!order) {
            return res.status(404).json({
                message: "Purchase order not found"
            });
        }

        res.status(200).json({
            message: "Purchase order fetched successfully",
            data: { ...order._doc, id: order._id }
        });
    } catch (error) {
        console.error("Error fetching purchase order:", error);
        res.status(500).json({
            message: "An error occurred while fetching the purchase order"
        });
    }
};

const UpdatePurchaseOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!id) {
            return res.status(400).json({
                message: "Purchase order ID is required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid purchase order ID format"
            });
        }

        // Check if order exists
        const existingOrder = await PurchaseOrder.findById(id);
        if (!existingOrder) {
            return res.status(404).json({
                message: "Purchase order not found"
            });
        }

        // Mark as edited
        updateData.isEdited = true;

        // If order number is being updated, check for duplicates
        if (updateData.orderInfo && updateData.orderInfo.orderNumber) {
            const duplicateOrder = await PurchaseOrder.findOne({
                'orderInfo.orderNumber': updateData.orderInfo.orderNumber,
                _id: { $ne: id }
            });

            if (duplicateOrder) {
                return res.status(409).json({
                    message: "An order with this order number already exists"
                });
            }
        }

        const updatedOrder = await PurchaseOrder.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: "Purchase order updated successfully",
            data: { ...updatedOrder._doc, id: updatedOrder._id }
        });
    } catch (error) {
        console.error("Error updating purchase order:", error);

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                message: "Validation failed",
                errors: messages
            });
        }

        if (error.code === 11000) {
            return res.status(409).json({
                message: "An order with this order number already exists"
            });
        }

        res.status(500).json({
            message: "An error occurred while updating the purchase order"
        });
    }
};

const DeletePurchaseOrder = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "Purchase order ID is required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid purchase order ID format"
            });
        }

        const order = await PurchaseOrder.findById(id);
        if (!order) {
            return res.status(404).json({
                message: "Purchase order not found"
            });
        }

        // Optional: Prevent deletion of completed orders
        if (order.status === "Completed") {
            return res.status(409).json({
                message: "Cannot delete a completed purchase order"
            });
        }

        await PurchaseOrder.findByIdAndDelete(id);

        res.status(200).json({
            message: "Purchase order deleted successfully",
            data: {
                deletedOrder: {
                    id: order._id,
                    orderNumber: order.orderInfo.orderNumber
                }
            }
        });
    } catch (error) {
        console.error("Error deleting purchase order:", error);
        res.status(500).json({
            message: "An error occurred while deleting the purchase order"
        });
    }
};

export {
    CreatePurchaseOrder,
    GetPurchaseOrders,
    GetPurchaseOrderById,
    UpdatePurchaseOrder,
    DeletePurchaseOrder
};
