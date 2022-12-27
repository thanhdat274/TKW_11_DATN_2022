import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Header from "../components/clients/Header";
import Footer from "../components/clients/Footer";

const { Content } = Layout;

const WebsiteLayout = () => {
  return (
    <>
      <div className="m-auto">
        <div className="fixed w-full z-40">
          <Header />
        </div>
        <div className="z-30 pt-20 m-auto">
          <Content>
            <Outlet />
          </Content>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default WebsiteLayout;
