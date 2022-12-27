import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Table, Tabs } from "antd";
import { httpGetOneService } from "../../../api/services";
const FeedbackComponent = ({ data }) => {
  // const [listFeedback, setListFeedback] = useState();
  // useEffect(() => {
  //   const listFeedback = async () => {
  //     const res = await httpGetOneService(id);
  //     setListFeedback(res);
  //   };
  //   listFeedback();
  // }, []);
  console.log(":", data);
  return (
    <>
      .
      {/* <div className="" key={item._id}>
        <Descriptions title={`${item.user.name}`} bordered>
          <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>

          <Descriptions.Item label="Config Info">
            Data disk type: MongoDB
            <br />
            Database version: 3.4
            <br />
            Package: dds.mongo.mid
            <br />
            Storage space: 10 GB
            <br />
            Replication factor: 3
            <br />
            Region: East China 1<br />
          </Descriptions.Item>
        </Descriptions>
      </div> */}
    </>
  );
};

export default FeedbackComponent;
