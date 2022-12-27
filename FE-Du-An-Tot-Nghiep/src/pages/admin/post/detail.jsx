import { Button } from "antd";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getOnePost } from "../../../api/post";
import { useState } from "react";

const DetailPost = () => {
  const { id } = useParams();
  const [post, setPosts] = useState();
  useEffect(() => {
    const data = async () => {
      const res = await getOnePost(id);
      setPosts(res);
      console.log(res);
    };
    data();
  }, []);

  return (
    <>
      <div className="w-full px-6 py-6 mx-auto ">
        <div>
          <h1 className="w-[1200px] m-auto text-center mb-0 font-bold text-white capitalize pb-[20px]  text-[50px] ">
            <div>Chi Tiết</div>
          </h1>
        </div>
        <div className="">
          <Link to={"/admin/post"}>
            <Button type="primary">Quay lại</Button>
          </Link>
        </div>
      </div>

      <div className="w-full px-6 py-6 mx-auto mt-[60px] ">
        <div className="myadmin">
          <h2 className="text-[#00502b] text-center text-3xl">{post?.title}</h2>
        </div>
        <div
          className="centerimage img"
          dangerouslySetInnerHTML={{ __html: post?.content }}
        ></div>
      </div>
    </>
  );
};

export default DetailPost;
