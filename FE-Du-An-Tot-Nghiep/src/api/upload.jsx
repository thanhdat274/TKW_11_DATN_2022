import axios from "axios";

export const uploadCloudinary = (data) => {
  const url = `https://api.cloudinary.com/v1_1/trung9901/image/upload`;

  const header = {
    "Content-Type": "application/x-www-formendcoded",
  };

  return axios.post(url, data, header);
};
