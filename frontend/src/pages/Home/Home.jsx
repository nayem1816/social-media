import React from "react";
import LeftSide from "../../components/Home/LeftSide/LeftSide";
import RightSide from "../../components/Home/RightSide/RightSide";
import MiddlePart from "../../components/Home/MiddlePart/MiddlePart";

const Home = () => {
  return (
    <div className="grid grid-cols-7 gap-5 bg-[#F0F2F5]">
      <div className="col-span-2 overflow-auto">
        <LeftSide />
      </div>
      <div className="col-span-3 overflow-auto h-[92vh]">
        <MiddlePart />
      </div>
      <div className="col-span-2 overflow-auto">
        <RightSide />
      </div>
    </div>
  );
};

export default Home;
