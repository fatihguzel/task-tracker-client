"use client";
import React, { useEffect } from "react";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Dropdown,
  Avatar,
  Typography,
  Divider,
  notification,
} from "antd";
import Link from "next/link";
import { APP_CONFIG } from "@/config/app-config";
import { getRoutes, userMenuItems, Route } from "@/utils/getRoutes";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getUserInfoAction } from "@/redux/reducers/auth/actions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AuthRole } from "@/constants/auth-role.enum";
import Image from "next/image";
import { useNotification } from "@/hooks/useNotification";

const { Header, Content, Footer } = Layout;

interface HomeLayoutProps {
  children?: React.ReactNode;
}

const HomeLayout = ({ children: child }: HomeLayoutProps) => {
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const routes = getRoutes();

  const pathname = usePathname();

  const router = useRouter();

  const { showNotification } = useNotification();

  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const route = routes.find((route) => route.path === path);
    return {
      key: index.toString(),
      breadcrumbName:
        route?.breadcrumb || segment.charAt(0).toUpperCase() + segment.slice(1),
      href: path,
    };
  });

  const generateMenuItems = (routes: Route[]): any[] =>
    routes.map((route: Route) => {
      const IconComponent = route.icon;
      if (route.children && route.children.length > 0) {
        return {
          key: route.path,
          label: route.label,
          icon: IconComponent ? <IconComponent /> : null,
          children: generateMenuItems(route.children),
        };
      }
      return {
        key: route.path,
        label: <Link href={route.path}>{route.label}</Link>,
        icon: IconComponent ? <IconComponent /> : null,
      };
    });

  const menuItems = generateMenuItems(routes);

  const handleLogout = () => {
    Cookies.remove("access_token");
    router.push("/account/login");

    notification.success({
      message: "Çıkış Yapıldı",
      description: "Çıkış başarılı bir şekilde gerçekleşti.",
    });
  };

  const userMenu = (
    <Menu
      style={{ width: 250, padding: "10px" }}
      defaultValue={userMenuItems[0].label}
    >
      <Menu.Item
        key="user-info"
        disabled
        style={{ padding: "10px 15px", cursor: "default" }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            size={48}
            icon={
              <Image
                src={"/assets/users/avatar-1.png"}
                width={48}
                height={48}
                alt="User Avatar"
              />
            }
            style={{ marginRight: "10px" }}
          />
          <div>
            <Typography.Text style={{ fontSize: "16px" }}>
              {user?.username}
            </Typography.Text>
            <br />
            <Typography.Text style={{ fontSize: "14px" }}>
              {user?.role === AuthRole.ADMIN
                ? "Admin"
                : user?.role === AuthRole.USER
                ? "Kullanıcı"
                : user?.role === AuthRole.MODERATOR
                ? "Moderatör"
                : "Misafir"}
            </Typography.Text>
          </div>
        </div>
      </Menu.Item>
      <Divider style={{ margin: "8px 0" }} />
      {userMenuItems.map((item) => (
        <Menu.Item
          key={item.label}
          icon={item.icon ? <item.icon /> : null}
          onClick={() => {
            if (item.label === "Çıkış Yap") {
              handleLogout();
            } else {
              router.push(`/${item.path}`);
            }
          }}
        >
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  useEffect(() => {
    dispatch(getUserInfoAction());
  }, [dispatch]);

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
        }}
      >
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["0"]}
            items={menuItems}
            style={{ flex: 1, minWidth: 0, lineHeight: "64px" }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Dropdown
            overlay={userMenu}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Avatar
              size={40}
              icon={
                <Image
                  src={"/assets/users/avatar-1.png"}
                  width={48}
                  height={48}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                  alt="User Avatar"
                />
              }
              style={{ cursor: "pointer" }}
            />
          </Dropdown>
        </div>
      </Header>
      <Content style={{ padding: "0 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          {breadcrumbItems.map((item) => (
            <Breadcrumb.Item key={item.key}>
              {item.href ? (
                <Link href={item.href}>{item.breadcrumbName}</Link>
              ) : (
                item.breadcrumbName
              )}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {child}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        {APP_CONFIG.APP_NAME} ©{new Date().getFullYear()} Created by{" "}
        {APP_CONFIG.APP_AUTHOR}
      </Footer>
    </Layout>
  );
};

export default HomeLayout;
