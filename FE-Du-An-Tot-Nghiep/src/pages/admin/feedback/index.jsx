import { Badge, Button, Descriptions, Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { httpGet, httpGetAllService } from "../../../api/services";
import FeedbackComponent from "./FeedbackList";

const ReplyFeedback = () => {
  const [listService, setListService] = useState([]);
  const listFeedback = async (id) => {
    const res = await httpGet("/feedback/service", id);
    return res;
  };
  useEffect(() => {
    const listService = async () => {
      const res = await httpGetAllService();
      setListService(res);
      console.log("list services", res);
    };
    listService();
  }, []);
  return (
    <>
      <div className="w-full px-6 py-6 mx-auto ">
        <div>
          <h1 className="w-[1200px] m-auto text-center mb-0 font-bold text-white capitalize pb-[20px]  text-[50px] ">
            <div>Feedback</div>
          </h1>
        </div>
      </div>
      <div className="w-full px-6 py-6 mx-auto bg-white ">
        <div className="border-2  rounded-lg p-5 ">
          <Tabs defaultActiveKey="1">
            {listService?.map((item, index) => (
              <Tabs.TabPane tab={item.name} key={index + 1}>
                {/* <FeedbackComponent id={item?._id} /> */}
              </Tabs.TabPane>
            ))}
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default ReplyFeedback;
