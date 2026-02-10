import Supplier from "../model/supplierModel.js";

export const createSupplier = async (req, res) => {
    try {
        const supplier = new Supplier({
            ...req.body,
            createdBy: req.userId
        });
        await supplier.save();
        res.status(201).json({ ...supplier._doc, id: supplier._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find().sort({ createdAt: -1 });
        const mappedSuppliers = suppliers.map(s => ({ ...s._doc, id: s._id }));
        res.status(200).json(mappedSuppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) return res.status(404).json({ message: "Supplier not found" });
        res.status(200).json({ ...supplier._doc, id: supplier._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        );
        if (!supplier) return res.status(404).json({ message: "Supplier not found" });
        res.status(200).json({ ...supplier._doc, id: supplier._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findByIdAndDelete(req.params.id);
        if (!supplier) return res.status(404).json({ message: "Supplier not found" });
        res.status(200).json({ message: "Supplier deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
