import axios from "axios";

const { REACT_APP_CLOUD_SECRET, REACT_APP_CLOUD_NAME } = process.env;

export const uploadFiles = async (files) => {
  let formData = new FormData();
  formData.append("upload_preset", REACT_APP_CLOUD_SECRET);
  let uploaded = [];
  for (const f of files) {
    const { file, type } = f;
    formData.append("file", file);
    let res = await uploadToCloudinary(formData);
    uploaded.push({
      file: res,
      type: type,
    });
  }
  return uploaded;
};

const uploadToCloudinary = async (formData) => {
  return new Promise(async (resolve) => {
    return await axios
      .post(
        `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/raw/upload`,
        formData
      )
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
