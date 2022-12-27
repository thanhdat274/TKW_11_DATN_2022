import Service from "../models/service";
import slugify from "slugify";
import Booking from "../models/booking";

export const createService = async (req, res) => {
  req.body.slug = slugify(req.body.name);
  try {
    const service = await new Service(req.body).save();
    return res.json(service);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
//list service
export const list = async (req, res) => {
  const status = req.query.status;
  try {
    if (status == 0) {
      const ListServices = await Service.find({ status: 0 });
      return res.json(ListServices);
    }
    const ListServices = await Service.find({}).exec();
    return res.json(ListServices);
  } catch (error) {
    res.status(400).json({
      message: "Không tìm được dich vu anh eiii",
    });
  }
};
//update service
export const update = async (req, res) => {
  try {
    const UpdateService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).exec()
    res.json(UpdateService);
  } catch (error) {
    res.status(400).json({
      message: "Không tìm được dich vu anh eiii",
    });
  }
};
// delete service
export const remove = async (req, res) => {
  try {
    const removeService = await Service.findByIdAndDelete(req.params.id).exec();
    res.json(removeService);
  } catch (error) {
    res.status(400).json({
      message: "Không tìm được dich vu anh eiii",
    });
  }
};
// readID service
export const read = async (req, res) => {
  try {
    const serviceId = await Service.findById(req.params.id).exec();
    
    res.json(serviceId);
  } catch (error) {
    res.status(400).json({
      message: "Không tìm được dich vu anh eiii",
    });
  }
};
export const readslug = async (req, res) => {
  try {
    const serviceId = await Service.findOne({ slug: req.params.slug }).exec();
   
    res.json(serviceId);
  } catch (error) {
    res.status(400).json({
      message: "Không tìm được dich vu anh eiii",
    });
  }
};
 //Done xxxxxx
export const groupAgeByService = async (req, res) => {
  try {
    const serviceId = await Service.distinct("_id");
    let groupAge = [];
    for (let svid of serviceId) {
      const service = await Service.findOne({ _id: svid }).exec();
      const group1 = await Booking.countDocuments({
        status: 4,
        "services.serviceId": svid,
        age: { $gte: 0, $lte: 16 },
      });
      const group2 = await Booking.countDocuments({
        status: 4,
       "services.serviceId": svid,
        age: { $gte: 17, $lte: 24 },
      });
      const group3 = await Booking.countDocuments({
        status: 4,
       "services.serviceId": svid,
        age: { $gte: 25, $lte: 34 },
      });
      const group4 = await Booking.countDocuments({
        status: 4,
       "services.serviceId": svid,
        age: { $gte: 35, $lte: 45 },
      });
      const group5 = await Booking.countDocuments({
        status: 4,
       "services.serviceId": svid,
        age: { $gte: 46, $lte: 60 },
      });
      const group6 = await Booking.countDocuments({
        status: 4,
       "services.serviceId": svid,
        age: { $gt: 60 },
      });

      groupAge.push({
        name: service.name,
        data: [group1, group2, group3, group4, group5, group6],
      });
    }
    return res.json({
      groupAge,
      categories: ["0-16", "17-24", "25-34", "35-45", "46-60", ">60"],
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
//Done
export const groupGenderByService = async (req, res) => {
  try {
    const serviceId = await Service.distinct("_id");
    let groupGender = [];
    for (let svid of serviceId) {
      const service = await Service.findOne({ _id: svid }).exec();
      const group1 = await Booking.countDocuments({
        status: 4,
       "services.serviceId": svid,
        gender: 0,
      });
      const group2 = await Booking.countDocuments({
        status: 4,
       "services.serviceId": svid,
        gender: 1,
      });

      groupGender.push({
        name: service.name,
        data: [group1, group2],
      });
    }
    return res.json({
      groupGender,
      categories: ["Nam", "Nữ"],
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
//Done
export const servicesStatistic = async (req, res) => {
  const month = Number(req.query.month)
  const year = Number(req.query.year)
  try {
    const serviceId = await Service.distinct("_id");
    let services = [];
    let total = 0;
    if (!month && !year) {
      
      for (let svid of serviceId) {
        const service = await Service.findOne({ _id: svid }).exec();
        const documents = await Booking.aggregate([{$match:
          {$and : [
            {$expr:{$eq:["$status" , 4]}},
            {"services.serviceId" :svid}
          ]}
        }])
        let servicesPrices = 0
        for(let i = 0 ; i < documents.length; i++){
          const servicePrice = documents[i].services.find(item => item.serviceId == svid.toString())
          servicesPrices += servicePrice.price
        }
        total += servicesPrices
        const serviceElement = {
          service,
          complete: documents.length,
          turnover : servicesPrices
        };
        services.push(serviceElement);
      }
      for (let i = 0; i < services.length; i++) {
        services[i].percentage = Number(services[i].turnover / total) * 100;
      }
      return res.json({
        services,
        totalService : serviceId.length
      });
    } else if (month && year) {
    
      for (let svid of serviceId) {
        const service = await Service.findOne({ _id: svid }).exec();
        const documents = await Booking.aggregate([{$match:
          {$and : [
            {$expr:{$eq:[{$month:"$date"},month]}},
            {$expr:{$eq:[{$year:"$date"},year]}},
            {$expr:{$eq:["$status" , 4]}},
            {"services.serviceId" :svid}
           
          ]}
        }])
        let servicesPrices = 0
        for(let i = 0 ; i < documents.length; i++){
          const servicePrice = documents[i].services.find(item => item.serviceId == svid.toString())
          servicesPrices += servicePrice.price
        }
        total += servicesPrices
        const serviceElement = {
          service,
          complete: documents.length,
          turnover: servicesPrices,
        };
        services.push(serviceElement);
      }
      for (let i = 0; i < services.length; i++) {
        services[i].percentage = Number(services[i].turnover / total) * 100;
      }
      return res.json(services);
    }
    else if(!month && year){
    
      for (let svid of serviceId) {
        const service = await Service.findOne({ _id: svid }).exec();
        const documents = await Booking.aggregate([{$match:
          {$and : [
            {$expr:{$eq:[{$year:"$date"},year]}},
            {$expr:{$eq:["$status" , 4]}},
            {"services.serviceId" :svid}
          ]}
        }
        ])
        let servicesPrices = 0
        for(let i = 0 ; i < documents.length; i++){
          const servicePrice = documents[i].services.find(item => item.serviceId == svid.toString())
          servicesPrices += servicePrice.price
        }
        total += servicesPrices
        const serviceElement = {
          service,
          complete: documents.length,
          turnover: servicesPrices,
        };
        services.push(serviceElement);
      }
      for (let i = 0; i < services.length; i++) {
        services[i].percentage = Number(services[i].turnover / total) * 100;
      }
      return res.json(services);
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export const turnoverServicesMonth = async (req,res) => {
 const year = Number(req.query.year)
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
            {$expr:{$eq:["$status" , 4]}},
            {"services.serviceId" :svid}
          ]}
        }])
        let turnoverMonth  = 0
        for(let i = 0 ; i < documents.length; i++){
          const servicePrice = documents[i].services.find(item => item.serviceId == svid.toString())
          turnoverMonth += servicePrice.price
        }
        
        datas.push(turnoverMonth)
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
}