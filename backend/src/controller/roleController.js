import Role from "../model/roleModel.js";

const CreateRole = async (req, res) => {
    try {
        const { name, permissions, description } = req.body;
        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            return res.status(400).json({ message: "Role already exists" });
        }

        const role = new Role({ name, permissions, description });
        await role.save();
        res.status(201).json({ ...role._doc, id: role._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating role" });
    }
};

const GetRoles = async (req, res) => {
    try {
        const roles = await Role.find({});
        const mappedRoles = roles.map(role => ({
            ...role._doc,
            id: role._id
        }));
        res.status(200).json(mappedRoles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching roles" });
    }
};

const GetRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }
        res.status(200).json({ ...role._doc, id: role._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching role" });
    }
};

const UpdateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { permissions, description, name } = req.body;
        const role = await Role.findByIdAndUpdate(
            id,
            { permissions, description, name },
            { new: true }
        );
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }
        res.status(200).json({ ...role._doc, id: role._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating role" });
    }
};

const DeleteRole = async (req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id);
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }
        res.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting role" });
    }
};

export { CreateRole, GetRoles, GetRoleById, UpdateRole, DeleteRole };
