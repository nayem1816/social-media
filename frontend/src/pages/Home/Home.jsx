import React from "react";
import LeftSide from "../../components/Home/LeftSide/LeftSide";
import RightSide from "../../components/Home/RightSide/RightSide";
import MiddlePart from "../../components/Home/MiddlePart/MiddlePart";

const Home = () => {
  return (
    <div className="pt-14 grid grid-cols-7 gap-5 bg-[#F0F2F5] h-[99.8vh]">
      <div className="col-span-2">
        <LeftSide />
      </div>
      <div className="col-span-3">
        <MiddlePart />
      </div>
      <div className="col-span-2">
        <RightSide />
      </div>
    </div>
  );
};

export default Home;
