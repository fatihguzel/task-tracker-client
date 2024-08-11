"use client";
import React from "react";
import { Card, Row, Col, Progress, Typography, Avatar, Tooltip } from "antd";
import {
  FileDoneOutlined,
  CalendarOutlined,
  CodeOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const tasks = [
  {
    id: 1,
    title: "Complete project documentation",
    description: "Finalize the documentation for the new project.",
    status: "In Progress",
    progress: 50,
    icon: <FileDoneOutlined />,
    assignedUsers: [
      { id: 1, name: "Alice", color: "#87d068" },
      { id: 2, name: "Bob", color: "#f56a00" },
      { id: 3, name: "Charlie", color: "#108ee9" },
      { id: 4, name: "David", color: "#2db7f5" },
      { id: 5, name: "Eva", color: "#5bc0de" },
      { id: 6, name: "Frank", color: "#87d068" },
    ],
  },
  {
    id: 2,
    title: "Design meeting with team",
    description: "Discuss the new design proposals with the team.",
    status: "Scheduled",
    progress: 20,
    icon: <CalendarOutlined />,
    assignedUsers: [
      { id: 6, name: "Frank", color: "#87d068" },
      { id: 7, name: "Grace", color: "#f56a00" },
    ],
  },
  {
    id: 3,
    title: "Code review",
    description: "Review the latest code submissions.",
    status: "Pending",
    progress: 10,
    icon: <CodeOutlined />,
    assignedUsers: [{ id: 8, name: "Hannah", color: "#108ee9" }],
  },
  {
    id: 4,
    title: "Client presentation",
    description: "Prepare slides for the client presentation.",
    status: "Completed",
    progress: 100,
    icon: <CheckCircleOutlined />,
    assignedUsers: [
      { id: 9, name: "Ivy", color: "#2db7f5" },
      { id: 10, name: "John", color: "#5bc0de" },
      { id: 11, name: "Karen", color: "#87d068" },
    ],
  },
  {
    id: 4,
    title: "Client presentation",
    description: "Prepare slides for the client presentation.",
    status: "Completed",
    progress: 100,
    icon: <CheckCircleOutlined />,
    assignedUsers: [
      { id: 9, name: "Ivy", color: "#2db7f5" },
      { id: 10, name: "John", color: "#5bc0de" },
      { id: 11, name: "Karen", color: "#87d068" },
    ],
  },
  {
    id: 4,
    title: "Client presentation",
    description: "Prepare slides for the client presentation.",
    status: "Completed",
    progress: 100,
    icon: <CheckCircleOutlined />,
    assignedUsers: [
      { id: 9, name: "Ivy", color: "#2db7f5" },
      { id: 10, name: "John", color: "#5bc0de" },
      { id: 11, name: "Karen", color: "#87d068" },
    ],
  },
  {
    id: 4,
    title: "Client presentation",
    description: "Prepare slides for the client presentation.",
    status: "Completed",
    progress: 100,
    icon: <CheckCircleOutlined />,
    assignedUsers: [
      { id: 9, name: "Ivy", color: "#2db7f5" },
      { id: 10, name: "John", color: "#5bc0de" },
      { id: 11, name: "Karen", color: "#87d068" },
    ],
  },
  {
    id: 4,
    title: "Client presentation",
    description: "Prepare slides for the client presentation.",
    status: "Completed",
    progress: 100,
    icon: <CheckCircleOutlined />,
    assignedUsers: [
      { id: 9, name: "Ivy", color: "#2db7f5" },
      { id: 10, name: "John", color: "#5bc0de" },
      { id: 11, name: "Karen", color: "#87d068" },
    ],
  },
  {
    id: 4,
    title: "Client presentation",
    description: "Prepare slides for the client presentation.",
    status: "Completed",
    progress: 100,
    icon: <CheckCircleOutlined />,
    assignedUsers: [
      { id: 9, name: "Ivy", color: "#2db7f5" },
      { id: 10, name: "John", color: "#5bc0de" },
      { id: 11, name: "Karen", color: "#87d068" },
    ],
  },
  {
    id: 4,
    title: "Client presentation",
    description: "Prepare slides for the client presentation.",
    status: "Completed",
    progress: 100,
    icon: <CheckCircleOutlined />,
    assignedUsers: [
      { id: 9, name: "Ivy", color: "#2db7f5" },
      { id: 10, name: "John", color: "#5bc0de" },
      { id: 11, name: "Karen", color: "#87d068" },
    ],
  },
];

const Home: React.FC = () => {
  return (
    <div>
      <Title level={1}>Tasks</Title>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        {tasks.map((task) => (
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            key={task.id}
            className="flex flex-col"
          >
            <Card
              title={
                <div style={{ display: "flex", alignItems: "center" }}>
                  {task.icon}
                  <span style={{ marginLeft: 8 }}>{task.title}</span>
                </div>
              }
              bordered={true}
              extra={<Text type="secondary">{task.status}</Text>}
              className="rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out bg-white p-4 flex-1 flex flex-col justify-between h-full"
            >
              <p>{task.description}</p>
              <Progress
                percent={task.progress}
                strokeColor={
                  task.status === "Completed" ? "#52c41a" : "#1890ff"
                }
                showInfo={false}
                style={{ marginBottom: 16 }}
              />
              <Text type="secondary">Progress: {task.progress}%</Text>
              <div style={{ marginTop: 16 }}>
                {task.assignedUsers.length > 0 && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {task.assignedUsers.length > 5 ? (
                      <div style={{ position: "relative", display: "flex" }}>
                        {task.assignedUsers.slice(0, 5).map((user) => (
                          <Avatar
                            key={user.id}
                            style={{
                              backgroundColor: user.color,
                              marginLeft: -12,
                            }}
                          >
                            {user.name.charAt(0)}
                          </Avatar>
                        ))}
                        <Avatar
                          style={{
                            backgroundColor: "#f0f0f0",
                            marginLeft: -12,
                          }}
                        >
                          +{task.assignedUsers.length - 5}
                        </Avatar>
                      </div>
                    ) : (
                      task.assignedUsers.map((user) => (
                        <Tooltip title={user.name} key={user.id}>
                          <Avatar
                            key={user.id}
                            style={{
                              backgroundColor: user.color,
                              marginRight: 8,
                            }}
                          >
                            {user.name.charAt(0)}
                          </Avatar>
                        </Tooltip>
                      ))
                    )}
                  </div>
                )}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
