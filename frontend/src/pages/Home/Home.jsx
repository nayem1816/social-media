import React from "react";
import LeftSide from "../../components/Home/LeftSide/LeftSide";

const Home = () => {
  return (
    <div className="pt-14 grid grid-cols-7 gap-5 bg-[#F0F2F5] h-[99.8vh]">
      <div className="col-span-2">
        <LeftSide />
      </div>
      <div className="col-span-3">2</div>
      <div className="col-span-2">3</div>
    </div>
  );
};

export default Home;
