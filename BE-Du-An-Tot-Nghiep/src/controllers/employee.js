
import Booking from "../models/booking";
import Employee from "../models/employee";
import User from "../models/user";
export const list = async (req, res) => {
  try {
    const employees = await Employee.find({}).sort({createdAt : -1}).exec();
    res.json(employees);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const create = async (req, res) => {
  try {
    const existUsers = await User.findOne({phoneNumber : req.body.phoneNumber}).exec()
    if(existUsers){
      return res.status(400).json({
        message : "Số điện thoại đã được sử dụng"
      })
    }
    else{
      const employees = await new Employee(req.body).save();
      const userData = {
        name : employees.name,
        phoneNumber : employees.phoneNumber,
        gender : employees.gender,
        role : 1,
        permission : req.body.permission,
        status : 1,
        password : req.body.password,
        employeeId : employees._id
      }
      await new User(userData).save()
      return res.json(employees)
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const update = async (req, res) => {
  try {
    const employee = await Employee.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.json(employee);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const read = async (req, res) => {
  try {
    const employee = await Employee.findOne({ _id: req.params.id }).exec();
    res.json(employee);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOneAndDelete(
      { _id: req.params.id },
      { new: true }
    ).exec();
    await User.findOneAndDelete({employeeId : req.params.id}).exec()
    res.json({
      message: "Xoá nhân viên  thành công.",
      employee,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const employeeOrderStatistics = async (req, res) => {
  const month = Number(req.query.month)
  const year = Number(req.query.year)
  let statistics = [];
  try {
    const employee = await Employee.find({}).select("-idCard").exec();
    if (!year && !month) {
      const getTotal = await Booking.aggregate([
        { $match: { status: 4 } },
        { $group: { _id: null, sum: { $sum: "$bookingPrice" } } },
      ]);
      let totalTurnOver  = 0
      if(getTotal.length){
        totalTurnOver = getTotal[0].sum;
      }
      for (let i = 0; i < employee.length; i++) {
        const finishedBooking = await Booking.find({
          employeeId: employee[i]._id,
          status: 4,
        }).exec();
        const turnover = finishedBooking.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.bookingPrice,
          0
        );

        const percentage = Number(turnover / totalTurnOver) * 100;
        const totalBooking = await Booking.countDocuments({
          employeeId: employee[i]._id,
        }).exec();
        const unConfimred = await Booking.countDocuments({
          employeeId: employee[i]._id,
          status: 0,
        }).exec();
        const confirmed = await Booking.countDocuments({
          employeeId: employee[i]._id,
          status: 1,
        }).exec();
        const canceled = await Booking.countDocuments({
          employeeId: employee[i]._id,
          status: 2,
        }).exec();
        const waitToPay = await Booking.countDocuments({
          employeeId: employee[i]._id,
          status: 3,
        }).exec();
        const finished = await Booking.countDocuments({
          employeeId: employee[i]._id,
          status: 4,
        }).exec();
        const status = {
          employee: employee[i],
          totalBooking,
          unConfimred,
          confirmed,
          finished,
          waitToPay,
          canceled,
          turnover,
          percentage,
        };
        statistics.push(status);
      }
      return res.json({
        statistics,
        totalEmployee: employee.length,
        totalTurnOver,
      });
    }
    else if(year && !month){
      const documents = await Booking.aggregate([{$match:
        {$and : [
          {$expr:{$eq:[{$year:"$date"},year]}},
          {$expr:{$eq:["$status" , 4]}},
        ]}
      }])
      const totalTurnOver = documents.reduce((previousValue, currentValue) =>
      previousValue + currentValue.bookingPrice,
    0)
      for (let i = 0; i < employee.length; i++) {
        const totalBooking = await Booking.aggregate([{$match:
          {$and : [
            {$expr:{$eq:["$employeeId" , employee[i]._id]}},
            {$expr:{$eq:[{$year:"$date"},year]}},
          ]}
        }])
        const unConfimred = await Booking.aggregate([{$match:
          {$and : [
            {$expr:{$eq:["$employeeId" , employee[i]._id]}},
            {$expr:{$eq:[{$year:"$date"},year]}},
            {$expr:{$eq:["$status" , 0]}},
    
          ]}
        }])
        const confirmed = await Booking.aggregate([{$match:
          {$and : [
            {$expr:{$eq:["$employeeId" , employee[i]._id]}},
            {$expr:{$eq:[{$year:"$date"},year]}},
            {$expr:{$eq:["$status" , 1]}},
          ]}
        }])
        const canceled = await Booking.aggregate([{$match:
          {$and : [
            {$expr:{$eq:["$employeeId" , employee[i]._id]}},
            {$expr:{$eq:[{$year:"$date"},year]}},
            {$expr:{$eq:["$status" , 2]}},
    
          ]}
        }])
        const waitToPay = await Booking.aggregate([{$match:
          {$and : [
            {$expr:{$eq:["$employeeId" , employee[i]._id]}},
            {$expr:{$eq:[{$year:"$date"},year]}},
            {$expr:{$eq:["$status" , 3]}},
    
          ]}
        }])
        const finished = await Booking.aggregate([{$match:
          {$and : [
            {$expr:{$eq:["$employeeId" , employee[i]._id]}},
            {$expr:{$eq:[{$year:"$date"},year]}},
            {$expr:{$eq:["$status" , 4]}},
    
          ]}
        }])
        const turnover = finished.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.bookingPrice,
          0
        );

        const percentage = Number(turnover / totalTurnOver) * 100;
        const status = {
          employee: employee[i],
          totalBooking : totalBooking.length,
          unConfimred : unConfimred.length,
          confirmed : confirmed.length,
          finished : finished.length,
          waitToPay : waitToPay.length,
          canceled : canceled.length,
          turnover : turnover,
          percentage
        };
        statistics.push(status);
      }
      return res.json({
        statistics,
        totalEmployee: employee.length,
        totalTurnOver,
      });
    }
    else if (month && year) {
      const documents = await Booking.aggregate([{$match:
        {$and : [
          {$expr:{$eq:[{$month:"$date"},month]}},
          {$expr:{$eq:[{$year:"$date"},year]}},
          {$expr:{$eq:["$status" , 4]}},
        ]}
      }])
      const totalTurnOver = documents.reduce((previousValue, currentValue) =>
      previousValue + currentValue.bookingPrice,
    0)
      for (let i = 0; i < employee.length; i++) {
        const totalBooking = await Booking.aggregate([{$match:
          {$and : [
            {$expr:{$eq:[{$month:"$date"},month]}},
            {$expr:{$eq:["$employeeId" , employee[i]._id]}},
            {$expr:{$eq:[{$year:"$date"},year]}},
          ]}
        }])
        const unConfimred = await Booking.aggregate([{$match:
          {$and : [
            {$expr:{$eq:[{$month:"$date"},month]}},
            {$expr:{$eq:["$employeeId" , employee[i]._id]}},
            {$expr:{$eq:[{$year:"$date"},year]}},
            {$expr:{$eq:["$status" , 0]}},
    
          ]}
        }])
        const confirmed = await Booking.aggregate([{$match:
          {$and : [
            {$expr:{$eq:[{$month:"$date"},month]}},
            {$expr:{$eq:["$employeeId" , employee[i]._id]}},
            {$expr:{$eq:[{$year:"$date"},year]}},
            {$expr:{$eq:["$status" , 1]}},
    
          ]}
        }])
        const canceled = await Booking.aggregate([{$match:
          {$and : [
            {$expr:{$eq:[{$month:"$date"},month]}},
            {$expr:{$eq:["$employeeId" , employee[i]._id]}},
            {$expr:{$eq:[{$year:"$date"},year]}},
            {$expr:{$eq:["$status" , 2]}},
    
          ]}
        }])
        const waitToPay = await Booking.aggregate([{$match:
          {$and : [
            {$expr:{$eq:[{$month:"$date"},month]}},
            {$expr:{$eq:["$employeeId" , employee[i]._id]}},
            {$expr:{$eq:[{$year:"$date"},year]}},
            {$expr:{$eq:["$status" , 3]}},
    
          ]}
        }])
        const finished = await Booking.aggregate([{$match:
          {$and : [
            {$expr:{$eq:[{$month:"$date"},month]}},
            {$expr:{$eq:["$employeeId" , employee[i]._id]}},
            {$expr:{$eq:[{$year:"$date"},year]}},
            {$expr:{$eq:["$status" , 4]}},
    
          ]}
        }])
        const turnover = finished.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.bookingPrice,
          0
        );

        const percentage = Number(turnover / totalTurnOver) * 100;
        const status = {
          employee: employee[i],
          totalBooking : totalBooking.length,
          unConfimred : unConfimred.length,
          confirmed : confirmed.length,
          finished : finished.length,
          waitToPay : waitToPay.length,
          canceled : canceled.length,
          turnover : turnover,
          percentage
        };
        statistics.push(status);
      }
      return res.json({
        statistics,
        totalEmployee: employee.length,
        totalTurnOver,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const statisticsForOneEmployee = async (req, res) => {
  const id = req.params.id;
  const month = Number(req.query.month)
  const year = Number(req.query.year)
  try {
    if(!month & !year){
      const getTotal = await Booking.aggregate([
        { $match: { status: 4 } },
        { $group: { _id: null, sum: { $sum: "$bookingPrice" } } },
      ]);
      let totalTurnOver = 0 
      if(getTotal.length){
         totalTurnOver = getTotal[0].sum;
      }
      const information = await Employee.findOne({ _id: id }).exec();
      const totalBooking = await Booking.countDocuments({
        employeeId: id,
      }).exec();
      const unConfimred = await Booking.countDocuments({
        employeeId: id,
        status: 0,
      }).exec();
      const confirmed = await Booking.countDocuments({
        employeeId: id,
        status: 1,
      }).exec();
      const canceled = await Booking.countDocuments({
        employeeId: id,
        status: 2,
      }).exec();
      const waitToPay = await Booking.countDocuments({
        employeeId: id,
        status: 3,
      }).exec();
      const finished = await Booking.countDocuments({
        employeeId: id,
        status: 4,
      }).exec();
      const finishedBooking = await Booking.find({
        employeeId: id,
        status: 4,
      }).exec();
      const turnover = finishedBooking.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.bookingPrice,
        0
      );
      const percentage = Number(turnover / totalTurnOver) * 100;
      res.json({
        information,
        totalBooking,
        unConfimred,
        confirmed,
        canceled,
        waitToPay,
        finished,
        turnover,
        percentage,
      });
    }
    else if(!month && year ){
      const documents = await Booking.aggregate([{$match:
        {$and : [
          {$expr:{$eq:[{$year:"$date"},year]}},
          {$expr:{$eq:["$status" , 4]}},
        ]}
      }])
      const totalTurnOver = documents.reduce((previousValue, currentValue) =>
      previousValue + currentValue.bookingPrice,
    0)
   
      const information = await Employee.findOne({ _id: id }).exec();
      const totalBooking = await Booking.aggregate([{$match:
        {$and : [
          {$expr:{$eq:["$employeeId" ,{ $toObjectId: id }]}},
          {$expr:{$eq:[{$year:"$date"},year]}},
        ]}
      }])
    
      const unConfimred = await Booking.aggregate([{$match:
        {$and : [
         
         {$expr:{$eq:["$employeeId" ,{ $toObjectId: id }]}},
          {$expr:{$eq:[{$year:"$date"},year]}},
          {$expr:{$eq:["$status" , 0]}},
  
        ]}
      }])
      const confirmed = await Booking.aggregate([{$match:
        {$and : [
         
         {$expr:{$eq:["$employeeId" ,{ $toObjectId: id }]}},
          {$expr:{$eq:[{$year:"$date"},year]}},
          {$expr:{$eq:["$status" , 1]}},
  
        ]}
      }])
      const canceled = await Booking.aggregate([{$match:
        {$and : [
         
         {$expr:{$eq:["$employeeId" ,{ $toObjectId: id }]}},
          {$expr:{$eq:[{$year:"$date"},year]}},
          {$expr:{$eq:["$status" , 2]}},
  
        ]}
      }])
      const waitToPay = await Booking.aggregate([{$match:
        {$and : [
         
         {$expr:{$eq:["$employeeId" ,{ $toObjectId: id }]}},
          {$expr:{$eq:[{$year:"$date"},year]}},
          {$expr:{$eq:["$status" , 3]}},
  
        ]}
      }])
      const finished = await Booking.aggregate([{$match:
        {$and : [
          {$expr:{$eq:["$employeeId" ,{ $toObjectId: id }]}},
          {$expr:{$eq:[{$year:"$date"},year]}},
          {$expr:{$eq:["$status" , 4]}},
        ]}
      }])
      const turnover = finished.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.bookingPrice,
        0
      );
      const percentage = Number(turnover / totalTurnOver) * 100;
      res.json({
        information,
        totalBooking : totalBooking.length,
        unConfimred : unConfimred.length,
        confirmed : confirmed.length,
        finished : finished.length,
        waitToPay : waitToPay.length,
        canceled : canceled.length,
        turnover : turnover,
        percentage
      });
    }
    else if (month && year){
      const documents = await Booking.aggregate([{$match:
        {$and : [
          {$expr:{$eq:[{$month:"$date"},month]}},
          {$expr:{$eq:[{$year:"$date"},year]}},
          {$expr:{$eq:["$status" , 4]}},
        ]}
      }])
      const totalTurnOver = documents.reduce((previousValue, currentValue) =>
      previousValue + currentValue.bookingPrice,
    0)
      const information = await Employee.findOne({ _id: id }).exec();
      const totalBooking = await Booking.aggregate([{$match:
        {$and : [
          {$expr:{$eq:[{$month:"$date"},month]}},
          {$expr:{$eq:["$employeeId" ,{ $toObjectId: id }]}},
          {$expr:{$eq:[{$year:"$date"},year]}},
        ]}
      }])
      const unConfimred = await Booking.aggregate([{$match:
        {$and : [
          {$expr:{$eq:[{$month:"$date"},month]}},
         {$expr:{$eq:["$employeeId" ,{ $toObjectId: id }]}},
          {$expr:{$eq:[{$year:"$date"},year]}},
          {$expr:{$eq:["$status" , 0]}},
  
        ]}
      }])
      const confirmed = await Booking.aggregate([{$match:
        {$and : [
          {$expr:{$eq:[{$month:"$date"},month]}},
         {$expr:{$eq:["$employeeId" ,{ $toObjectId: id }]}},
          {$expr:{$eq:[{$year:"$date"},year]}},
          {$expr:{$eq:["$status" , 1]}},
  
        ]}
      }])
      const canceled = await Booking.aggregate([{$match:
        {$and : [
          {$expr:{$eq:[{$month:"$date"},month]}},
         {$expr:{$eq:["$employeeId" ,{ $toObjectId: id }]}},
          {$expr:{$eq:[{$year:"$date"},year]}},
          {$expr:{$eq:["$status" , 2]}},
  
        ]}
      }])
      const waitToPay = await Booking.aggregate([{$match:
        {$and : [
          {$expr:{$eq:[{$month:"$date"},month]}},
         {$expr:{$eq:["$employeeId" ,{ $toObjectId: id }]}},
          {$expr:{$eq:[{$year:"$date"},year]}},
          {$expr:{$eq:["$status" , 3]}},
  
        ]}
      }])
      const finished = await Booking.aggregate([{$match:
        {$and : [
          {$expr:{$eq:[{$month:"$date"},month]}},
          {$expr:{$eq:["$employeeId" ,{ $toObjectId: id }]}},
          {$expr:{$eq:[{$year:"$date"},year]}},
          {$expr:{$eq:["$status" , 4]}},
  
        ]}
      }])
      const turnover = finished.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.bookingPrice,
        0
      );
      const percentage = Number(turnover / totalTurnOver) * 100;
      res.json({
        information,
        totalBooking : totalBooking.length,
        unConfimred : unConfimred.length,
        confirmed : confirmed.length,
        finished : finished.length,
        waitToPay : waitToPay.length,
        canceled : canceled.length,
        turnover : turnover,
        percentage
      });
    }
  } catch (error) {
    return res.json({
      message : error.message
    });
  }
};
