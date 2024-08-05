"use client";
/*********************/
/*** Login Page ***/

import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import Title from "antd/es/typography/Title";
import { PlusOutlined } from "@ant-design/icons";
import { APP_CONFIG } from "@/config/app-config";

const Login: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      gutter={[16, 16]}
    >
      <Col span={24}>
        <Title level={2} style={{ textAlign: "center" }}>
          {APP_CONFIG.APP_NAME}
        </Title>
      </Col>
      <br />

      <Col span={24}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="w-full"
          style={{
            width: "100%",
            gap: "1rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Form.Item
            name="username"
            label="Kullanıcı Adı"
            layout="vertical"
            rules={[
              { required: true, message: "Lütfen kullanıcı adınızı girin!" },
            ]}
          >
            <Input placeholder="Kullanıcı Adı" allowClear />
          </Form.Item>

          <Form.Item
            name="password"
            label="Şifre"
            layout="vertical"
            rules={[{ required: true, message: "Lütfen şifrenizi girin!" }]}
          >
            <Input.Password placeholder="Password" allowClear />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusOutlined />}
              className="flex items-center justify-center w-full"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
