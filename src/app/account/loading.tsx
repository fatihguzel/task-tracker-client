// app/loading.tsx
import React from "react";
import { Spin } from "antd";
import "antd/dist/reset.css"; // Ant Design stil dosyasını ekleyin

const Loading: React.FC = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f0f2f5", // Arka plan rengini belirleyin (isteğe bağlı)
    }}
  >
    <Spin size="large" />
  </div>
);

export default Loading;
