import {
  HomeOutlined,
  LogoutOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";

export type Route = {
  path: string;
  label: string;
  breadcrumb?: string;
  children?: Route[];
  icon?: React.ElementType;
};

export const routes: Route[] = [
  {
    path: "/",
    label: "Ana Sayfa",
    breadcrumb: "Ana Sayfa",
    children: [],
    icon: HomeOutlined,
  },
  {
    path: "/home/task-manager",
    label: "Görev Yönetimi",
    breadcrumb: "Görev Yönetimi",
    icon: UnorderedListOutlined,
    children: [
      {
        label: "Görevler",
        path: "/home/task-manager/list",
        icon: UnorderedListOutlined,
      },
      {
        label: "Görev Ekle",
        path: "/home/task-manager/add",
        children: [],
        icon: PlusOutlined,
      },
    ],
  },
];

export const userMenuItems: Route[] = [
  {
    label: "Profil",
    path: "home/profile",
    icon: UserOutlined,
    breadcrumb: "Profil",
  },
  {
    label: "Çıkış Yap",
    path: "logout",
    icon: LogoutOutlined,
    breadcrumb: "Çıkış Yap",
  },
];

export function getRoutes(): Route[] {
  return routes;
}
