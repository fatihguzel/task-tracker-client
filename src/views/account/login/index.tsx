"use client";

import React from "react";
import { Form, Input, Button, Row, Col, notification } from "antd";
import Title from "antd/es/typography/Title";
import { PlusOutlined } from "@ant-design/icons";
import { APP_CONFIG } from "@/config/app-config";
import { loginAction } from "@/redux/reducers/auth/actions";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const router = useRouter();

  const [loading, setLoading] = React.useState<boolean>(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const { username, password } = values;
      const response = await loginAction({ username, password });
      Cookies.set("access_token", response.access_token, { expires: 7 });
      if (response.access_token) {
        setLoading(false);
        // showNotification({
        //   message: "Başarılı",
        //   description: "Giriş başarılı bir şekilde gerçekleşti.",
        //   type: "success",
        // });
        notification.success({
          message: "Başarılı",
          description: "Giriş başarılı bir şekilde gerçekleşti.",
        });

        router.push("/home");
      }
    } catch (error: any) {
      setLoading(false);

      notification.error({
        message: "Hata",
        description: error.message,
      });
    }
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Title level={2} style={{ textAlign: "center" }}>
          {APP_CONFIG.APP_NAME}
        </Title>
      </Col>

      <Col span={24}>
        <Form name="basic" onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Title level={5}>Kullanıcı Adı*</Title>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Lütfen kullanıcı adınızı girin!",
                  },
                ]}
              >
                <Input
                  placeholder="Kullanıcı Adı Girin*"
                  allowClear
                  variant="filled"
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Title level={5}>Şifre*</Title>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Lütfen şifrenizi girin!" }]}
              >
                <Input.Password
                  placeholder="Şifre Girin*"
                  allowClear
                  variant="filled"
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<PlusOutlined />}
                  block
                  color="red"
                  shape="round"
                  danger
                  loading={loading}
                >
                  Giriş Yap
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
