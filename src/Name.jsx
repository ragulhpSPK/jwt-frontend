import { Button, Form, Input, notification } from "antd";
import axios from "axios";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Name() {
  const [data, setData] = useState([]);
  const [name, setName] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const result = await axios.get(
        `https://jwt-backend.vercel.app/api/name`,
        {
          withCredentials: true,
        }
      );
      setData(get(result, "data.message"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFinish = async () => {
    try {
      const formData = { name: name };
      await axios.post(`${process.env.REACT_APP_LOCAL_URL}`, formData, {
        withCredentials: true,
      });
      notification.success({ message: "create successFully" });
      fetchData();
    } catch (err) {
      console.log(err);
      notification.error({ message: "Something went wrong" });
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    if (Cookies.get("token") === undefined) {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <Form
          layout="vertical"
          className="w-[100vw] flex flex-col items-center justify-center"
          onFinish={handleFinish}
        >
          <Form.Item label="Name">
            <Input
              type="text"
              name="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" className="bg-blue-500">
              Submit
            </Button>
          </Form.Item>
        </Form>

        <div className="flex flex-col items-center justify-center">
          {data.map((res, i) => {
            return (
              <div key={i}>
                <h1 className="bg-black/60 rounded-md text-white px-4 py-2">
                  User ID:{res.userId}
                </h1>
                <h1 className="bg-gray-400 rounded-md text-white px-4 py-2">
                  Username:{res.name}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="bg-blue-400 inline-block px-10 cursor-pointer py-1 text-white font-bold rounded-md mt-5"
        onClick={handleLogout}
      >
        Logout
      </div>
    </div>
  );
}

export default Name;
