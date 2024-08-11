"use client";
import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  theme,
  Dropdown,
  Avatar,
  Typography,
  Divider,
  notification,
  Drawer,
  Button,
  Breadcrumb,
  Input,
} from "antd";
import { MenuOutlined, GlobalOutlined, FlagTwoTone } from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AuthRole } from "@/constants/auth-role.enum";
import Image from "next/image";
import { useNotification } from "@/hooks/useNotification";
import { APP_CONFIG } from "@/config/app-config";
import { Route, routes, userMenuItems } from "@/utils/getRoutes";
import { getUserInfoAction } from "@/redux/reducers/auth/actions";
import { MenuItemType } from "antd/es/menu/interface";

const { Header, Content, Footer, Sider } = Layout;

interface HomeLayoutProps {
  children?: React.ReactNode;
}

const HomeLayout = ({ children: child }: HomeLayoutProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const pathname = usePathname();
  const router = useRouter();
  const { showNotification } = useNotification();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Set up screen size detection
  useEffect(() => {
    const mediaQueryList = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQueryList.matches);

    const handleResize = (event: MediaQueryListEvent) =>
      setIsMobile(event.matches);
    mediaQueryList.addEventListener("change", handleResize);

    return () => {
      mediaQueryList.removeEventListener("change", handleResize);
    };
  }, []);

  // Recursive function to generate menu items
  const getMenuItems = (routes: Route[]): MenuItemType[] => {
    return routes.map((route) => {
      const { path, label, icon, children } = route;
      return {
        key: path,
        icon: icon ? React.createElement(icon) : null,
        label: <Link href={path}>{label}</Link>,
        children: children ? getMenuItems(children) : undefined,
      };
    });
  };

  const menuItems = getMenuItems(routes);

  const handleLogout = () => {
    Cookies.remove("access_token");
    router.push("/account/login");
    notification.success({
      message: "Çıkış Yapıldı",
      description: "Çıkış başarılı bir şekilde gerçekleşti.",
    });
  };

  useEffect(() => {
    dispatch(getUserInfoAction());
  }, [dispatch]);

  const userMenu = (
    <Menu style={{ width: 250, padding: "10px" }}>
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
          icon={item.icon ? React.createElement(item.icon) : null}
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

  const breadcrumbItems = pathname
    .split("/")
    .filter(Boolean)
    .map((segment, index) => {
      const path = `/${pathname
        .split("/")
        .slice(0, index + 1)
        .join("/")}`;
      return {
        key: index.toString(),
        breadcrumbName: segment.charAt(0).toUpperCase() + segment.slice(1),
        href: path,
      };
    });

  const handleDrawerOpen = () => {
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          background: colorBgContainer,
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={isMobile ? handleDrawerOpen : toggleCollapsed}
          style={{ marginRight: 16 }}
        />
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <Typography.Title
            level={3}
            style={{
              margin: 0,
              letterSpacing: "1rem",
              color: "#2c3e50",
              fontSize: "1.5rem",
              fontWeight: 600,
              fontFamily: "Poppins",
            }}
          >
            {APP_CONFIG.APP_NAME}
          </Typography.Title>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Input.Search
            placeholder="Ara..."
            style={{ width: 200, marginRight: 16 }}
          />
        </div>

        {/* Language Selector */}
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="tr" icon={<FlagTwoTone />}>
                Türkçe
              </Menu.Item>
              <Menu.Item key="en" icon={<FlagTwoTone />}>
                English
              </Menu.Item>
            </Menu>
          }
          trigger={["hover"]}
          placement="bottomRight"
        >
          <Button
            type="dashed"
            icon={<GlobalOutlined />}
            style={{ marginRight: 16 }}
            shape="default"
          >
            Dil
          </Button>
        </Dropdown>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Dropdown
            overlay={userMenu}
            trigger={["hover"]}
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
      <Layout>
        <Sider
          width={200}
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          collapsedWidth={0}
          style={{ background: colorBgContainer }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={[pathname]}
            style={{ height: "100%", borderRight: 0 }}
            items={menuItems}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
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
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {child}
          </Content>
        </Layout>
      </Layout>
      <Drawer
        title="Menu"
        placement="left"
        closable={true}
        onClose={handleDrawerClose}
        visible={drawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={[pathname]}
          style={{ height: "100%" }}
          items={menuItems}
        />
      </Drawer>
      <Footer style={{ textAlign: "center" }}>
        {APP_CONFIG.APP_NAME} ©{new Date().getFullYear()} Created by{" "}
        {APP_CONFIG.APP_AUTHOR}
      </Footer>
    </Layout>
  );
};

export default HomeLayout;
