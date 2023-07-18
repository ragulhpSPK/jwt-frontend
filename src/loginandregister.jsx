import "./App.css";
import React, { useState } from "react";
import { Button, Form, Input, InputNumber, notification } from "antd";
import { useEffect } from "react";
import { isEmpty } from "lodash";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginAndRegister() {
  const [register, setRegiser] = useState(true);
  const [login, setLogin] = useState(false);
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  console.log(process.env.REACT_APP_LOCAL_URL, "kwemk");

  const handleSubmit = async () => {
    if (login === true) {
      try {
        const result = await axios.post(
          `https://jwt-frontend-snowy.vercel.app/api/user/login`,
          inputs,
          { withCredentials: true }
        );

        notification.success({ message: "login successfully" });
        if (result) {
          navigate("name");
        }
      } catch (err) {
        console.log(err);
        notification.error({ message: "Invalid User" });
      }
    } else {
      try {
        const result = await axios.post(
          `https://jwt-frontend-snowy.vercel.app/api/user/register`,
          inputs,
          { withCredentials: true }
        );

        notification.success({
          message: "Register successfully lets login and continue",
        });
      } catch (err) {
        console.log(err);
        notification.error({
          message: "Existing User please Login and Continue",
        });
      }
    }
  };

  return (
    <div className="flex items-center bg-black/100 backdrop-blur-sm justify-center w-screen h-screen bg-center bg-cover bg-no-repeat">
      <div className="xl:w-[20vw] xsm:w-[80vw] py-5 bg-white/70 backdrop-blur-sm rounded-md  flex items-center justify-center">
        <Form
          className="xsm:w-[80vw] xl:w-[20vw]    p-4"
          layout="vertical"
          onFinish={handleSubmit}
        >
          <h1 className="text-3xl text-blue-500 font-medium pb-2 text-center">
            Admin Login
          </h1>
          <Form.Item
            label="UserName"
            name="email"
            rules={[
              {
                required: true,
              },
            ]}
            onChange={handleChange}
          >
            <Input type="text" size="large" name="username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            onChange={handleChange}
          >
            <Input.Password size="large" name="password" />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" className="w-full" size="large">
              {login ? "Login" : "Register"}
            </Button>
          </Form.Item>
          {login ? (
            <p
              className="text-blue-500 font-medium cursor-pointer text-center"
              onClick={() => {
                setRegiser(true);
                setLogin(false);
              }}
            >
              New user?<span className="p-1">Register here</span>
            </p>
          ) : (
            <p
              className="text-blue-500 font-medium cursor-pointer text-center"
              onClick={() => {
                setRegiser(false);
                setLogin(true);
              }}
            >
              Already Login User?<span className="p-1">Login here</span>
            </p>
          )}
        </Form>
      </div>
    </div>
  );
}

export default LoginAndRegister;
