import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

interface NotificationProps {
  type: NotificationType;
  message: string;
  description: string;
}

export const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  const showNotification = ({
    type,
    message,
    description,
  }: NotificationProps) => {
    api[type]({
      message,
      description,
    });
  };

  return { showNotification, contextHolder };
};
