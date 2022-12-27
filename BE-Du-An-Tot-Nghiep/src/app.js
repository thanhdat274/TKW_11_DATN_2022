import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import {
  addNewUser,
  onlineUsers,
  getUser,
  removeUser,
  getAdmin,
  getEmployee,
} from "./utils/socketUser";
import "dotenv/config";
import Notification from "./models/notification";
import serviceRouter from "./routes/service";
import authRouter from "./routes/authenticate";
import bookingRouter from "./routes/booking";
import contactRouter from "./routes/contact";
import employeeRouter from "./routes/employee";
import blogRouter from "./routes/blog";
import noticationRouter from "./routes/notification";
import voucherRouter from "./routes/voucher";
import http from "http";
import { Server } from "socket.io";
import { initializeApp } from "firebase-admin/app";
import BannerRouter from "./routes/banner";
import userRouter from "./routes/user";
import feedbackRouter from "./routes/feedback";
const app = express();
import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json";
import jwt from "jsonwebtoken";
import {
  getEmployeeListNotification,
  getListAdminNotification,
  getUserListNotification,
  newNotification,
} from "./controllers/notification";
const httpServer = http.createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET"],
  },
});
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use("/api", authRouter);
app.use("/api", serviceRouter);
app.use("/api", bookingRouter);
app.use("/api", userRouter);
app.use("/api", contactRouter);
app.use("/api", employeeRouter);
app.use("/api", feedbackRouter);
app.use("/api", BannerRouter);
app.use("/api", blogRouter);
app.use("/api", noticationRouter);
app.use("/api", voucherRouter);
io.on("connection", async (socket) => {
  socket.on("newUser", (token) => {
    if (token) {
      jwt.verify(token, "datn", async (err, decoded) => {
        if (err) return new Error("Authentication error");
        const role = decoded.role;
        const id = decoded._id;
        const employeeId = decoded.employeeId;
        addNewUser(id, socket.id, role, employeeId);
        console.log("Danh sách user :", onlineUsers);
        const user = getUser(id);
        const admin = getAdmin();
        const employee = getEmployee(employeeId);
        if (user) {
          const userList = await getUserListNotification(id);
          io.to(user.socketId).emit("userListNotification", userList);
        }
        if (admin) {
          const adminList = await getListAdminNotification();
          io.to(admin.socketId).emit("notification", adminList);
        }
        if (employee) {
          const employeeList = await getEmployeeListNotification(employeeId);
          io.to(employee.socketId).emit("employeeNotification", employeeList);
        }
      });
    } else {
      return new Error("Authentication error");
    }
  });
  socket.on("newEmployeeNotification", async (data) => {
    const notification = {
      bookingId: data.id,
      notificationType: "employee",
      text: data.text,
      employeeId: data.employeeId,
    };
    const sendNotification = await newNotification(notification);
    const employee = getEmployee(data.employeeId);
    if (employee) {
      io.to(employee.socketId).emit(
        "myNewEmployeeNotification",
        sendNotification
      );
      const employeeList = await getEmployeeListNotification(data.employeeId);
      io.to(employee.socketId).emit("employeeNotification", employeeList);
    }
  });
  socket.on("newNotification", async (data) => {
    console.log(data);
    const notification = {
      bookingId: data.id,
      notificationType: data.type,
      text: data.text,
    };
    const sendNotification = await newNotification(notification);
    const admin = getAdmin();
    if (admin) {
      io.to(admin.socketId).emit("newNotification", sendNotification);
      const adminList = await getListAdminNotification();
      io.to(admin.socketId).emit("notification", adminList);
    }
  });
  socket.on("newUserNotification", async (data) => {
    const notification = {
      bookingId: data.id,
      from: data.from,
      notificationType: "user",
      text: data.text,
      userId: data.userId,
    };
    const response = await newNotification(notification);

    const sendNotification = await Notification.findOne({
      _id: response._id,
    }).exec();
    const receiver = getUser(data.userId);
    if (receiver) {
      io.to(receiver.socketId).emit("myNewNotification", sendNotification);
      const userList = await getUserListNotification(data.userId);
      io.to(receiver.socketId).emit("userListNotification", userList);
    }
  });
  socket.on("disconnect", (reason) => {
    removeUser(socket.id);
  });
});
httpServer.listen(process.env.PORT, () => {
  console.log(`Server is running`);
});

mongoose
  .connect(process.env.MONGODB_URL || 5000)
  .then(() => console.log("Connect DB Successfully"))
  .catch((error) => console.log(error));
