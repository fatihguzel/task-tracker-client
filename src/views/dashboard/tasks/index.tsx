"use client";

import React, { useEffect } from "react";
import { Card, Row, Col, Progress, Typography, Avatar, Tooltip } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getTasksAction } from "@/redux/reducers/task/action";

const { Title, Text } = Typography;

const users = [
  "/assets/users/avatar-8.png",
  "/assets/users/avatar-1.png",
  "/assets/users/avatar-7.png",
  "/assets/users/avatar-4.png",
  "/assets/users/avatar-10.png",
  "/assets/users/avatar-3.png",
  "/assets/users/avatar-5.png",
  "/assets/users/avatar-2.png",
  "/assets/users/avatar-6.png",
  "/assets/users/avatar-9.png",
];

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { tasks } = useAppSelector((state) => state.task);

  useEffect(() => {
    dispatch(getTasksAction());
  }, []);

  return (
    <div>
      <Title level={1}>Görevler</Title>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        {tasks &&
          tasks.map((task) => (
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={8}
              key={task.id}
              className="flex flex-col w-full"
            >
              <Card
                title={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <CheckCircleOutlined />
                    <span style={{ marginLeft: 8 }}>{task.title}</span>
                  </div>
                }
                bordered={true}
                extra={<Text type="secondary">{task.status}</Text>}
                className="rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out bg-white p-4 flex-1 flex flex-col justify-between h-full w-full"
              >
                <p>{task.description}</p>
                <Progress
                  percent={task.progress || 50}
                  strokeColor={
                    task.status === "Completed" ? "#52c41a" : "#1890ff"
                  }
                  showInfo={false}
                  style={{ marginBottom: 16 }}
                />
                <Text type="secondary">İlerleme: {task.progress || 50}%</Text>
                <div style={{ marginTop: 16 }}>
                  {task && task.users && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {task.users.length > 5 ? (
                        <div style={{ position: "relative", display: "flex" }}>
                          {task.users.slice(0, 5).map((user, index) => (
                            <Avatar
                              key={user.id}
                              src={users[index]}
                              style={{ marginRight: 8 }}
                            />
                          ))}
                          <Avatar
                            style={{
                              backgroundColor: "#f56a00",
                              marginRight: 8,
                              cursor: "pointer",
                            }}
                          >
                            +{task.users.length - 5}
                          </Avatar>
                        </div>
                      ) : (
                        task.users.map((user, index) => (
                          <Tooltip title={user.username} key={user.id}>
                            <Avatar
                              src={users[(Math.random() * users.length) | 0]}
                              style={{ marginRight: 8 }}
                            />
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
