// app/loading.tsx
import React from "react";
import { Spin } from "antd";
import "antd/dist/reset.css"; // Ant Design'in stilini eklemeyi unutmayın

const Loading: React.FC = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <Spin size="large" />
  </div>
);

export default Loading;
