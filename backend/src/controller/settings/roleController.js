import Role from "../../model/settings/roleModel.js";
import mongoose from "mongoose";

const CreateRole = async (req, res) => {
    try {
        const { name, permissions, description, status } = req.body;

        // Validation: Check if name is provided
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return res.status(400).json({
                message: "Role name is required and must be a non-empty string"
            });
        }

        // Validation: Name length check
        if (name.trim().length < 2) {
            return res.status(400).json({
                message: "Role name must be at least 2 characters long"
            });
        }

        if (name.trim().length > 50) {
            return res.status(400).json({
                message: "Role name must not exceed 50 characters"
            });
        }

        // Validation: Check for valid characters in name (alphanumeric, spaces, hyphens, underscores)
        const nameRegex = /^[a-zA-Z0-9\s\-_]+$/;
        if (!nameRegex.test(name.trim())) {
            return res.status(400).json({
                message: "Role name can only contain letters, numbers, spaces, hyphens, and underscores"
            });
        }

        // Validation: Check if permissions is an object (if provided)
        if (permissions !== undefined && (typeof permissions !== 'object' || Array.isArray(permissions))) {
            return res.status(400).json({
                message: "Permissions must be a valid object"
            });
        }

        // Validation: Check if description is a string (if provided)
        if (description !== undefined && typeof description !== 'string') {
            return res.status(400).json({
                message: "Description must be a string"
            });
        }

        // Validation: Description length check
        if (description && description.length > 500) {
            return res.status(400).json({
                message: "Description must not exceed 500 characters"
            });
        }

        // Validation: Check if status is valid (if provided)
        if (status !== undefined && !['Active', 'Inactive'].includes(status)) {
            return res.status(400).json({
                message: "Status must be either 'Active' or 'Inactive'"
            });
        }

        // Check for duplicate role (case-insensitive)
        const existingRole = await Role.findOne({
            name: { $regex: new RegExp(`^${name.trim()}$`, 'i') }
        });

        if (existingRole) {
            return res.status(409).json({
                message: "A role with this name already exists"
            });
        }

        // Create new role
        const role = new Role({
            name: name.trim(),
            permissions: permissions || {},
            description: description?.trim() || "",
            status: status || "Active"
        });

        await role.save();

        res.status(201).json({
            message: "Role created successfully",
            data: { ...role._doc, id: role._id }
        });
    } catch (error) {
        console.error("Error creating role:", error);

        // Handle mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                message: "Validation failed",
                errors: messages
            });
        }

        // Handle duplicate key error (unique constraint)
        if (error.code === 11000) {
            return res.status(409).json({
                message: "A role with this name already exists"
            });
        }

        res.status(500).json({
            message: "An error occurred while creating the role"
        });
    }
};

const GetRoles = async (req, res) => {
    try {
        const { page, limit, status, search, sortBy, sortOrder } = req.query;

        // Build filter object
        const filter = {};

        // Validation: Filter by status if provided
        if (status) {
            if (!['Active', 'Inactive'].includes(status)) {
                return res.status(400).json({
                    message: "Invalid status. Must be 'Active' or 'Inactive'"
                });
            }
            filter.status = status;
        }

        // Validation: Search by name if provided
        if (search && typeof search === 'string') {
            filter.name = { $regex: search.trim(), $options: 'i' };
        }

        // Pagination validation
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

        // Sorting validation
        const validSortFields = ['name', 'createdAt', 'updatedAt', 'status'];
        const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
        const sortDirection = sortOrder === 'asc' ? 1 : -1;

        const skip = (pageNum - 1) * limitNum;

        // Fetch roles with pagination and sorting
        const roles = await Role.find(filter)
            .sort({ [sortField]: sortDirection })
            .skip(skip)
            .limit(limitNum);

        // Get total count for pagination
        const totalRoles = await Role.countDocuments(filter);

        const mappedRoles = roles.map(role => ({
            ...role._doc,
            id: role._id
        }));

        res.status(200).json({
            message: "Roles fetched successfully",
            data: mappedRoles,
            pagination: {
                currentPage: pageNum,
                totalPages: Math.ceil(totalRoles / limitNum),
                totalRoles,
                limit: limitNum
            }
        });
    } catch (error) {
        console.error("Error fetching roles:", error);
        res.status(500).json({
            message: "An error occurred while fetching roles"
        });
    }
};

const GetRoleById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validation: Check if ID is provided
        if (!id) {
            return res.status(400).json({
                message: "Role ID is required"
            });
        }

        // Validation: Check if ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid role ID format"
            });
        }

        const role = await Role.findById(id);

        if (!role) {
            return res.status(404).json({
                message: "Role not found with the provided ID"
            });
        }

        res.status(200).json({
            message: "Role fetched successfully",
            data: { ...role._doc, id: role._id }
        });
    } catch (error) {
        console.error("Error fetching role by ID:", error);
        res.status(500).json({
            message: "An error occurred while fetching the role"
        });
    }
};

const UpdateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, permissions, description, status } = req.body;

        // Validation: Check if ID is provided
        if (!id) {
            return res.status(400).json({
                message: "Role ID is required"
            });
        }

        // Validation: Check if ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid role ID format"
            });
        }

        // Validation: Check if at least one field is provided for update
        if (!name && !permissions && !description && !status) {
            return res.status(400).json({
                message: "At least one field (name, permissions, description, or status) must be provided for update"
            });
        }

        // Build update object
        const updateData = {};

        // Validation: Name validation if provided
        if (name !== undefined) {
            if (typeof name !== 'string' || name.trim().length === 0) {
                return res.status(400).json({
                    message: "Role name must be a non-empty string"
                });
            }

            if (name.trim().length < 2) {
                return res.status(400).json({
                    message: "Role name must be at least 2 characters long"
                });
            }

            if (name.trim().length > 50) {
                return res.status(400).json({
                    message: "Role name must not exceed 50 characters"
                });
            }

            const nameRegex = /^[a-zA-Z0-9\s\-_]+$/;
            if (!nameRegex.test(name.trim())) {
                return res.status(400).json({
                    message: "Role name can only contain letters, numbers, spaces, hyphens, and underscores"
                });
            }

            // Check for duplicate name (excluding current role)
            const existingRole = await Role.findOne({
                name: { $regex: new RegExp(`^${name.trim()}$`, 'i') },
                _id: { $ne: id }
            });

            if (existingRole) {
                return res.status(409).json({
                    message: "A role with this name already exists"
                });
            }

            updateData.name = name.trim();
        }

        // Validation: Permissions validation if provided
        if (permissions !== undefined) {
            if (typeof permissions !== 'object' || Array.isArray(permissions)) {
                return res.status(400).json({
                    message: "Permissions must be a valid object"
                });
            }
            updateData.permissions = permissions;
        }

        // Validation: Description validation if provided
        if (description !== undefined) {
            if (typeof description !== 'string') {
                return res.status(400).json({
                    message: "Description must be a string"
                });
            }

            if (description.length > 500) {
                return res.status(400).json({
                    message: "Description must not exceed 500 characters"
                });
            }

            updateData.description = description.trim();
        }

        // Validation: Status validation if provided
        if (status !== undefined) {
            if (!['Active', 'Inactive'].includes(status)) {
                return res.status(400).json({
                    message: "Status must be either 'Active' or 'Inactive'"
                });
            }
            updateData.status = status;
        }

        // Update the role
        const role = await Role.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!role) {
            return res.status(404).json({
                message: "Role not found with the provided ID"
            });
        }

        res.status(200).json({
            message: "Role updated successfully",
            data: { ...role._doc, id: role._id }
        });
    } catch (error) {
        console.error("Error updating role:", error);

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
                message: "A role with this name already exists"
            });
        }

        res.status(500).json({
            message: "An error occurred while updating the role"
        });
    }
};

const DeleteRole = async (req, res) => {
    try {
        const { id } = req.params;

        // Validation: Check if ID is provided
        if (!id) {
            return res.status(400).json({
                message: "Role ID is required"
            });
        }

        // Validation: Check if ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid role ID format"
            });
        }

        // Check if role exists before deletion
        const existingRole = await Role.findById(id);
        if (!existingRole) {
            return res.status(404).json({
                message: "Role not found with the provided ID"
            });
        }

        // Optional: Check if role is assigned to any users before deletion
        // Uncomment this section when User model is available
        /*
        const User = await import('../../model/userModel.js');
        const usersWithRole = await User.default.countDocuments({ role: id });
        
        if (usersWithRole > 0) {
            return res.status(409).json({ 
                message: `Cannot delete role. It is currently assigned to ${usersWithRole} user(s)`,
                usersCount: usersWithRole
            });
        }
        */

        // Delete the role
        await Role.findByIdAndDelete(id);

        res.status(200).json({
            message: "Role deleted successfully",
            data: {
                deletedRole: {
                    id: existingRole._id,
                    name: existingRole.name
                }
            }
        });
    } catch (error) {
        console.error("Error deleting role:", error);
        res.status(500).json({
            message: "An error occurred while deleting the role"
        });
    }
};

export { CreateRole, GetRoles, GetRoleById, UpdateRole, DeleteRole };
