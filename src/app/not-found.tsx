"use client";
// app/notfound.tsx
import React from "react";
import { Result, Button } from "antd";
import { useRouter } from "next/navigation";

const NotFound: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/"); // Kullanıcıyı ana sayfaya yönlendirme
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Üzgünüz, aradığınız sayfa bulunamadı."
        extra={
          <Button type="primary" onClick={handleBack}>
            Ana Sayfaya Dön
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
