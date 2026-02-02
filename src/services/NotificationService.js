import axiosInstance from "../axios/axiosInstance";

const NotificationService = {
    // Fetch all notifications for a specific user role (simplified for demo)
    getNotifications: async (userRole) => {
        try {
            const response = await axiosInstance.get("/notifications");
            console.log("All Raw Notifications:", response.data);

            const filtered = response.data.filter(n => {
                const nRole = (n.targetRole || n.toRole || "").toLowerCase();
                const uRole = (userRole || "").toLowerCase();
                const isUnread = !(n.read === true || n.isRead === true);

                return nRole === uRole && isUnread;
            });

            console.log(`Filtered for ${userRole}:`, filtered);
            return filtered;
        } catch (error) {
            console.error("Error fetching notifications:", error);
            return [];
        }
    },

    // Create a new notification
    createNotification: async (notificationData) => {
        try {
            const data = {
                ...notificationData,
                timestamp: new Date().toISOString(),
                read: false
            };
            return await axiosInstance.post("/notifications", data);
        } catch (error) {
            console.error("Error creating notification:", error);
        }
    },

    // Mark a notification as read
    markAsRead: async (notificationId) => {
        try {
            return await axiosInstance.patch(`/notifications/${notificationId}`, { read: true });
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    },

    // Clear notifications for a specific PO
    clearByPoId: async (poId) => {
        try {
            const response = await axiosInstance.get("/notifications");
            const notifications = response.data.filter(n => {
                const isMatch = n.poId === poId;
                const isUnread = !(n.read === true || n.isRead === true);
                return isMatch && isUnread;
            });

            for (const n of notifications) {
                // Support both key styles for update
                const updateData = n.isRead !== undefined ? { isRead: true } : { read: true };
                await axiosInstance.patch(`/notifications/${n.id}`, updateData);
            }
        } catch (error) {
            console.error("Error clearing notifications by poId:", error);
        }
    }
};

export default NotificationService;
