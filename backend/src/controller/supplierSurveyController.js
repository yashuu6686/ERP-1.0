import SupplierSurvey from "../model/supplierSurveyModel.js";

export const createSupplierSurvey = async (req, res) => {
    try {
        const survey = new SupplierSurvey({
            ...req.body,
            createdBy: req.userId
        });
        await survey.save();
        res.status(201).json({ ...survey._doc, id: survey._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSupplierSurveys = async (req, res) => {
    try {
        const surveys = await SupplierSurvey.find().sort({ createdAt: -1 });
        const mappedSurveys = surveys.map(s => ({ ...s._doc, id: s._id }));
        res.status(200).json(mappedSurveys);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSupplierSurveyById = async (req, res) => {
    try {
        const survey = await SupplierSurvey.findById(req.params.id);
        if (!survey) return res.status(404).json({ message: "Survey not found" });
        res.status(200).json({ ...survey._doc, id: survey._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSupplierSurvey = async (req, res) => {
    try {
        const survey = await SupplierSurvey.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        );
        if (!survey) return res.status(404).json({ message: "Survey not found" });
        res.status(200).json({ ...survey._doc, id: survey._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteSupplierSurvey = async (req, res) => {
    try {
        const survey = await SupplierSurvey.findByIdAndDelete(req.params.id);
        if (!survey) return res.status(404).json({ message: "Survey not found" });
        res.status(200).json({ message: "Survey deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
