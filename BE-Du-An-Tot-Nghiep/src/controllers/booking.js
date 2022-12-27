import { mongoose } from "mongoose";
import Booking from "../models/booking";
import User from "../models/user";
import moment from "moment";
import Voucher from "../models/voucher";
import Service from "../models/service";
import service from "../models/service";
export const createBooking = async (req, res) => {
  const { user } = req.query;
  try {
    if (!user) {
      const booking = await new Booking({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        note: req.body.note,
        services: req.body.services,
        employeeId: req.body.employeeId,
        status: req.body.status,
        date: req.body.date,
        time: req.body.time,
        age: req.body.age,
        gender: req.body.gender,
        bookingPrice: req.body.bookingPrice,
      }).save();
      return res.json(booking);
    } else if (user) {
      const booking = await new Booking({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        note: req.body.note,
        userId: req.query.user,
        services: req.body.services,
        employeeId: req.body.employeeId,
        status: req.body.status,
        date: req.body.date,
        time: req.body.time,
        age: req.body.age,
        gender: req.body.gender,
        bookingPrice: req.body.bookingPrice,
      }).save();
      return res.json(booking);
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const listBooking = async (req, res) => {
  try {
    const booking = await Booking.find({})
      .sort({ createdAt: -1 })
      .populate({ path: "userId", select: "-password" })
      .populate("services.serviceId")
      .populate({ path: "employeeId", select: "-idCard" })

      .exec();
    return res.json(booking);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const read = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id }).exec();
    res.json(booking);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    if (req.body.status == 4) {
      const booking = await Booking.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      ).exec();
      await User.findOneAndUpdate(
        { _id: booking.userId },
        { $push: { serviceUsed: booking.services } }
      );
      if (booking.voucher) {
        const voucher = await Voucher.findOne({ _id: booking.voucher }).exec();
        await Voucher.findOneAndUpdate(
          { _id: booking.voucher },
          { quantity: voucher.quantity - 1 }
        ).exec();
        if (booking.userId) {
          await Voucher.findOneAndUpdate(
            { _id: booking.voucher },
            { $push: { userUsed: booking.userId } }
          ).exec();
        }
      }
      return res.json(booking);
    } else {
      const booking = await Booking.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      )
        .populate("employeeId")
        .exec();
      return res.json(booking);
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const userBookingList = async (req, res) => {
  try {
    const listBooking = await Booking.find({ userId: req.params.id })
      .populate("services.serviceId")
      .populate({ path: "employeeId", select: ["name"] })
      .exec();
    return res.json(listBooking);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const employeeBookingList = async (req, res) => {
  try {
    const listBooking = await Booking.find({
      employeeId: req.params.id,
    }).exec();
    return res.json(listBooking);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const bookingGenderStatistics = async (req, res) => {
  const { svid, timeStart, timeEnd } = req.query;
  try {
    if ((svid && !timeStart) || !timeEnd) {
      const male = await Booking.countDocuments({
        gender: "male",
        status: 4,
        services: { $in: [svid] },
      }).exec();
      const female = await Booking.countDocuments({
        gender: "female",
        status: 4,
        services: { $in: [svid] },
      }).exec();
      return res.json({ male, female });
    } else if (timeStart && timeEnd && !svid) {
      const male = await Booking.countDocuments({
        gender: "male",
        status: 4,
        date: {
          $gte: new Date(Number(timeStart) * 1000).toISOString(),
          $lte: new Date(Number(timeEnd) * 1000).toISOString(),
        },
      }).exec();
      const female = await Booking.countDocuments({
        gender: "female",
        status: 4,
        date: {
          $gte: new Date(Number(timeStart) * 1000).toISOString(),
          $lte: new Date(Number(timeEnd) * 1000).toISOString(),
        },
      }).exec();
      return res.json({ male, female });
    } else if (timeStart && timeEnd && svid) {
      const male = await Booking.countDocuments({
        gender: "male",
        status: 4,
        services: { $in: [svid] },
        date: {
          $gte: new Date(Number(timeStart) * 1000).toISOString(),
          $lte: new Date(Number(timeEnd) * 1000).toISOString(),
        },
      }).exec();
      const female = await Booking.countDocuments({
        gender: "female",
        status: 4,
        services: { $in: [svid] },
        date: {
          $gte: new Date(Number(timeStart) * 1000).toISOString(),
          $lte: new Date(Number(timeEnd) * 1000).toISOString(),
        },
      }).exec();
      return res.json({ male, female });
    } else {
      const male = await Booking.countDocuments({
        gender: "male",
        status: 4,
      }).exec();
      const female = await Booking.countDocuments({
        gender: "female",
        status: 4,
      }).exec();
      return res.json({ male, female });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const employeeBookingList2 = async (req, res) => {
  try {
    const listBooking = await Booking.find({
      employeeId: req.user.employeeId,
    }).exec();
    return res.json(listBooking);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const statusStatistic = async (req, res) => {
  
  const year = Number(req.query.year);
  try {
    let allData = []
   const serviceId = await Service.distinct('_id')
    for(let svid of serviceId){
      let datas = []
      const service = await Service.findOne({_id : svid}).exec()
      for(let i = 1 ; i<13; i++){
        const documents = await Booking.aggregate([{$match:
          {$and : [
            {$expr:{$eq:[{$month:"$date"},i]}},
            {$expr:{$eq:[{$year:"$date"},year]}},
            {$expr:{$eq:["$status" ,2]}},
            {"services.serviceId" :svid}
          ]}
        }])
       
        
        datas.push(documents.length)
      }
      allData.push({
        service,
        datas
      })
    }
    return res.json({
      allData,
      totalServices : serviceId.length
    })
  } catch (error) {
    return res.status(400).json(error.message)
  }
};
