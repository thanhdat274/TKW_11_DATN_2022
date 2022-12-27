import Voucher from "../models/voucher";
import Booking from "../models/booking";
import moment from 'moment-timezone'
let createVoucher = async (req, res) => {
  try {
    const existVoucher = await Voucher.findOne({ code: req.body.code }).exec();
    if (req.body.quantity < 1) {
      return res.status(400).json({
        message: "Số lượng Voucher phải lớn hơn 1.",
      });
    }
    if (existVoucher) {
      return res.status(400).json({
        message: "Mã Voucher này đã tồn tại.",
      });
    }
    const newVoucher = await new Voucher(req.body).save();
    return res.json(newVoucher);
  } catch (error) {
    return res.json(error.message);
  }
};
let updateVoucher = async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  try {
    const voucher = await Voucher.findOneAndUpdate({ _id: id }, update, {
      new: true,
    }).exec();
    return res.json({
      message: "Cập nhật voucher thành công.",
      voucher,
    });
  } catch (error) {
    return res.json(error.message);
  }
};

let removeVoucher = async (req, res) => {
  try {
    const voucher = await Voucher.findOneAndDelete({
      _id: req.params.id,
    }).exec();
    return res.json({
      message: "Xoá voucher thành công",
      voucher,
    });
  } catch (error) {
    return res.json(error.message);
  }
};
let detailVoucher = async (req, res) => {
  try {
    const voucher = await Voucher.findOne({ _id: req.params.id }).exec();
    return res.json(voucher);
  } catch (error) {
    return res.json(error.message);
  }
};
let listVoucher = async (req, res) => {
  try {
    const voucher = await Voucher.find({}).sort({ createdAt: -1 }).populate('service').exec();
    return res.json(voucher);
  } catch (error) {
    return res.json(error.message);
  }
};

let useVoucher = async (req, res) => {
  const now =  moment().unix()

  const { id } = req.params;
  const { code } = req.body;
  try {
    const booking = await Booking.findOne({ _id: id }).exec();
    const voucher = await Voucher.findOne({ code }).exec();
    if (!voucher) {
      return res.status(400).json({
        message: "Voucher không hợp lệ.",
      });
    }
    const expire = moment(voucher.expirationDate)
    if(now > expire.tz('Asia/Ho_Chi_Minh').format('X')){
      return res.status(400).json({
        message: "Voucher đã hết hạn sử dụng.",
      });
    }
    if (voucher.quantity < 1) {
      return res.status(400).json({
        message: "Voucher đã hết lượt sử dụng.",
      });
    }
    if(booking){
      if(voucher.userUsed.includes(booking.userId)){
        return res.status(400).json({
          message : "Người dùng đã sử dụng voucher này."
        })
      }
      const serviceApply = booking.services.find(
        (service) => service.serviceId == voucher.service.toString()
      );
      if (!serviceApply) {
        return res.status(400).json({
          message: "Voucher không áp dụng khuyến mãi cho dịch vụ này.",
        });
      } else {
        if (voucher.type == "direct") {
          serviceApply.price = serviceApply.price - voucher.discount;
        } else if (voucher.type == "percentage") {
          serviceApply.price =
            serviceApply.price - (serviceApply.price / 100) * voucher.discount;
        }
      }
      booking.bookingPrice = booking.services.reduce(
        (previousValue, currentValue) => previousValue + currentValue.price,0);
      booking['voucher'] = voucher._id
    }
    else{
      return res.status(400).json({
        message : "Đơn đặt lịch không tồn tại"
      })
    }
    return res.json(booking);
  } catch (error) {
    return res.json(error.message);
  }
};
export {
  createVoucher,
  updateVoucher,
  removeVoucher,
  detailVoucher,
  listVoucher,
  useVoucher,
};
