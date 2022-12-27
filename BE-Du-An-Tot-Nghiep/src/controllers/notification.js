import Notification from "../models/notification";

export const getListAdminNotification = async () => {
  try {
    const listNotification = await Notification.find({
      notificationType: "admin",
    })
      .populate("bookingId")
      .sort({ createdAt: -1 })
      .exec();

    const unRead = await Notification.countDocuments({
      readed: false,
      notificationType: "admin",
    }).exec();
    console.log(unRead);
    return {
      notification: listNotification,
      unRead,
    };
  } catch (error) {
    return error;
  }
};

export const newNotification = async (data) => {
  try {
    const newNotification = await new Notification(data).save();
    return newNotification;
  } catch (error) {
    return error;
  }
};

export const getUserListNotification = async (userId) => {
  try {
    const userListNotification = await Notification.find({ userId })
      .populate("bookingId")
      .sort({ createdAt: -1 })
      .exec();
    const unRead = userListNotification.filter(
      (item) => item.userId == userId && item.readed == false
    );
    return {
      notification: userListNotification,
      unRead: unRead.length,
    };
  } catch (error) {
    return error;
  }
};

export const getEmployeeListNotification = async (employeeId) => {
  try {
    const employeeList = await Notification.find({ employeeId })
      .populate("bookingId")
      .sort({ createdAt: -1 })
      .exec();
    const unRead = await Notification.countDocuments({
      employeeId,
      readed: false,
    }).exec();

    return {
      notification: employeeList,
      unRead,
    };
  } catch (error) {
    return error;
  }
};

export const readNotification = async (req, res) => {
  try {
    const readNotification = await Notification.findOneAndUpdate(
      { _id: req.params.id },
      { readed: true },
      { new: true }
    ).exec();
    if (readNotification.notificationType == "admin") {
      const data = await getListAdminNotification();
      return res.json(data);
    } else if (readNotification.notificationType == "user") {
      const data = await getUserListNotification(readNotification.userId);
      return res.json(data);
    } else if (readNotification.notificationType == "employee") {
      const data = await getEmployeeListNotification(
        readNotification.employeeId
      );
      return res.json(data);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const readAllNotification = async (req, res) => {
  const { role, _id, employeeId } = req.user;

  try {
    if (role == 0) {
      const update = {
        readed: true,
      };
      const notifications = await Notification.updateMany(
        {
          userId: _id,
        },
        update,
        { new: true }
      ).exec();
      console.log(notifications);
      const data = await getUserListNotification(userId);
      return res.json(data);
    } else if (role == 1) {
      const update = {
        readed: true,
      };
      const notifications = await Notification.updateMany(
        {
          employeeId: employeeId,
        },
        update,
        { new: true }
      ).exec();
      console.log(notifications);
      const data = await getEmployeeListNotification(employeeId);
      return res.json(data);
    } else if (role == 2) {
      const update = {
        readed: true,
      };
      const notifications = await Notification.updateMany(
        {
          notificationType: "admin",
        },
        update,
        { new: true }
      ).exec();
      console.log(notifications);
      const data = await getListAdminNotification();
      return res.json(data);
    }
  } catch (error) {}
};
