export const isAdmin = (req, res, next) => {
  if (req.user.role !== 2) {
    return res.status(401).json({
      message: "Bạn không phải là admin.",
    });
  }
  next();
};

export const isEmployee = (req, res, next) => {
  if (req.user.role !== 1) {
    return res.status(401).json({
      message: "Bạn không phải là nhân viên.",
    });
  }
  next();
};

export const isAdminOrEmployee = (req, res, next) => {
  if (req.user.role == 0) {
    return res.status(401).json({
      message: "Bạn không phải nhân viên hoặc admin.",
    });
  }
  next();
};

