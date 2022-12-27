import { Button, Form, Upload, message } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ImgCrop from "antd-img-crop";
import { uploadCloudinary } from "../../../api/upload";
import { httpGetOne, httpUpdateBanner } from "../../../api/banner";

const EditBanner = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [url, setUrl] = useState("");

  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  useEffect(() => {
    const getSerVice = async () => {
      const dataService = await httpGetOne(id);
      console.log("log service :", dataService);
      setUrl(dataService?.image);
      setFileList([{ url: dataService.image }]);
      form.setFieldsValue({
        image: dataService?.image,
      });
    };

    getSerVice();
  }, []);

  const uploadImage = async (options) => {
    const { onSuccess, onError, file } = options;
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "my_upload");
    try {
      const res = await uploadCloudinary(formData);
      onSuccess("Ok");
      message.success("Upload successfully !");
      console.log("server res: ", res);
      setUrl(res.data.secure_url);
    } catch (err) {
      onError({ err });
    }
  };
  const onFinish = async (data) => {
    console.log(data);
    const a = { ...data, image: url };
    try {
      await httpUpdateBanner(id, a).then(() => {
        message.success("cap nhat thành công", 4);
        navigate("/admin/banner");
      });
    } catch (error) {
      message.error(`${error.response.data.message}`, 4);
    }
  };
  return (
    <>
      <div className="w-[1200px] px-6 py-6 m-auto">
        <div>
          <h1 className="w-full text-center mb-0 font-bold text-white capitalize pb-[20px] text-[40px]">
            <div>Cập nhật banner</div>
          </h1>
        </div>
      </div>

      <div className=" px-6 py-6 ml-[30px]  ">
        <div className="mt-[150px] my-[20px]"></div>
        <Form
          className="m-auto text-center"
          form={form}
          name="basic"
          labelCol={{ span: 4, offset: 5 }}
          wrapperCol={{ span: 15, offset: 5 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          {/* Avater */}
          <Form.Item label="Ảnh banner">
            <ImgCrop>
              <Upload
                customRequest={uploadImage}
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                name="avatar"
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </ImgCrop>
          </Form.Item>
          <Form.Item>
            <Form.Item wrapperCol={{ offset: 10, span: 5 }}>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditBanner;
