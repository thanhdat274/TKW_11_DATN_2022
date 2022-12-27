import Users from "../models/user";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
export const signup = async (req, res) => {
  try {
    const existUser = await Users.findOne({ phoneNumber : req.body.phoneNumber }).exec();
    if (existUser) {
      return res.status(400).json({
        message: "Tài khoản đã tồn tại",
      });
    }
    const user = await new Users(req.body).save();
    return res.json({
      user: {
        _id: user._id,
        phoneNumber: user.phoneNumber,
        name: user.name,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const signin = async (req,res) => {
  const {password,phoneNumber} = req.body
  try {
    const user = await Users.findOne({phoneNumber}).exec()
  if(!user){
    return res.status(400).json({
      message : "Số điện thoại không hợp lệ."
    })
  }
  if(user.status == 0){
    return res.status(400).json({
      message : "Tài khoản bạn chưa xác thực",
      code : 'NEEDVERIFY'
    })
  }
  else if(user.status == 2){
    return res.status(400).json({
      message : "Tài khoản bạn bị khoá",
      code : 'LOCKACCOUNT'
    })
  }
  else if(user.status == 1){
    const token = jwt.sign({_id: user._id,role : user.role,employeeId : user.employeeId},"datn",{expiresIn : "7d"},{algorithm :'HS256'})
    const refreshToken = jwt.sign({_id: user._id,role : user.role,employeeId : user.employeeId},"datn",{expiresIn : "30d"},{algorithm :'HS256'})
    const match = await bcrypt.compare(password,user.password)
    if(match){
     if(user.employeeId){
      return res.json({
        message : 'Login Success',
        id : user._id,
        phoneNumber : user.phoneNumber,
        name : user.name,
        avatar : user.avatar,
        token,
        refreshToken,
        role : user.role,
        employeeId : user.employeeId
      })
     }
     else{
      return res.json({
        message : 'Login Success',
        id : user._id,
        phoneNumber : user.phoneNumber,
        name : user.name,
        avatar : user.avatar,
        token,
        refreshToken,
        role : user.role,
      })
     }
    }
    else{
      return res.status(400).json({
        message : "Số điện thoại / Email hoặc mật khẩu không đúng"
      })
    }
  }
  } catch (error) {
    return res.status(400).json({
      message : error.message
    })
  }
}
export const changeStatusAccount = async (req,res) => {
  const {status,phone} = req.query

  try {
    const user = await Users.findOneAndUpdate({phoneNumber : phone},{status : status},{new : true}).select('-password').exec()
    return res.json({
      message : "Success",
      user
    })
  } catch (error) {
    return res.status(400).json({
      message : error.message
    })
  }
}