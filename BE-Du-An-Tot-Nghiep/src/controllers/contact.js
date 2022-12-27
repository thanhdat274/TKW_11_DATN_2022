
import Contact from "../models/contact";
export const createContact = async (req, res) => {
    try {
      const contact = await new Contact(req.body).save();
      return res.json(contact);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  };
  
  export const getListContact= async (req, res) => {
    try {
      const contact = await Contact.find().sort({ timeStart: 1 }).exec();
      return res.json(contact);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  };

  export const deleteContact = async (req,res) =>{
    try {
      const contact = await Contact.findOneAndDelete({_id : req.params.id}).exec()
      res.json({
        message : 'Success',
        contact
      })
    } catch (error) {
      res.status(400).json({
        message : error.message
      })
    }
  }