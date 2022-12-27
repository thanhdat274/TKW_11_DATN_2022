import { Button, Form, Input, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/user";

const SignUp = (props) => {
  const navigate = useNavigate();
  const bgStaff = {
    width: "100%",
    height: "100%",
    backgroundImage:
      "url('https://res.cloudinary.com/df7kkrfoe/image/upload/v1663325104/tac-phong-lam-viec-nhan-vien-spa-1_mfbeu0.jpg')",
    backgroundRepeat: "no-repeat",
  };
  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const validateMessages = {
    required: "${label} Không được bỏ trống!",
    types: {
      email: "${label} không đúng định dạng!",
    },
  };
  const texHello = {
    backgroundColor: "white",
    color: "#002200",
    opacity: 0.8,
  };
  const onFinish = async (values) => {
    // console.log(values);

    const userValues = {
      name: values.name.name,
      phoneNumber: values.phoneNumber.phoneNumber,
      password: values.password.password,
    };
    // console.log(userValues);
    try {
      // localStorage.setItem('dataSignUp', JSON.stringify(userValues))
      await register(userValues);
      message.success("Đăng ký thành công");
      await navigate(`/verify?phone=${values.phoneNumber.phoneNumber}`);
      localStorage.setItem("signup", "true");
      //  eslint-disable-next-line react/prop-types
      props.handleSignUp(userValues);
    } catch (error) {
      // console.log(error);
      message.error(`${error.response.data.message}`, 2);
    }
  };

  return (
    <div>
      <div
        style={{ height: "350px", width: "100%" }}
        className=" border-green-600 ... 0 bg-white flex rounded-r-3xl rounded-l-2xl"
      >
        <div style={{ width: "40%" }} className="">
          <div
            className="pt-48 rounded-xl  flex justify-center text-white font-bold text-xl font-mono  ..."
            width="100px"
            style={bgStaff}
          >
            <div>
              <div style={texHello} className="p-2 text-center">
                Chào bạn đến với Tuyến Spa
              </div>
              <div style={texHello} className="text-center">
                Dịch vụ spa uy tín
              </div>
              <p
                style={{ backgroundColor: "black" }}
                className="text-white text-sm text-center mt-5 ..."
              >
                {" "}
                Hỗ trợ đăng ký: 012344567
              </p>
            </div>
          </div>
        </div>
        <div style={{ width: "60%" }} className="flex justify-center  ...">
          <div style={{ width: "100%" }} className="pl-5">
            <h3 className="font-bold text-2xl text-center mt-5 ...">
              Đăng Ký Tài Khoản
            </h3>
            <div className="pt-5 p-10">
              <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
                initialValues={{ prefix: +84 }}
              >
                <Form.Item
                  name={["name", "name"]}
                  label="Name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["phoneNumber", "phoneNumber"]}
                  label="PhoneNumber"
                  rules={[
                    {
                      required: true,
                      pattern: new RegExp(/((9|3|7|8|5)+([0-9]{8})\b)/g),
                      message: "Số điện thoại không đúng định dạng!",
                    },
                  ]}
                >
                  <Input style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  name={["password", "password"]}
                  label="Password"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 6,
                    span: 16,
                  }}
                >
                  <Button id="submitBtn" type="primary" htmlType="submit">
                    Đăng ký
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
