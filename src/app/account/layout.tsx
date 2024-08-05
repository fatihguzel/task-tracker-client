import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { APP_CONFIG } from "@/config/app-config";
import { Col, Image, Row } from "antd";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: APP_CONFIG.APP_NAME + " - Account",
  description: "Task Tracker",
};

export default function AccountLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <Row style={{ minHeight: "100vh" }}>
      <Col
        xs={{ span: 24, order: 1 }}
        sm={{ span: 24, order: 1 }}
        md={{ span: 12, order: 1 }}
        lg={{ span: 16, order: 1 }}
        className="md:h-screen lg:h-screen xl:h-screen 2xl:h-screen w-full"
      >
        <Image
          src={"/assets/login/img-auth-sideimg.png"}
          alt="Login Image"
          width={"100%"}
          height={"100%"}
          className="object-contain object-top w-auto h-screen"
          preview={false}
        />
      </Col>
      <Col
        xs={{ span: 24, order: 2 }}
        sm={{ span: 24, order: 2 }}
        md={{ span: 12, order: 2 }}
        lg={{ span: 8, order: 2 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="flex justify-center items-center bg-white shadow-md p-4"
      >
        {children}
      </Col>
    </Row>
  );
}
