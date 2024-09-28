import Feed from "@/components/Feed";
import React from "react";

const Home = () => {
  return (
    <section className=" w-full flex-center flex-col">
      <h1 className=" head_text text-center">
        Discover & Share
        <br className=" max-md:hidden" />
        <span className=" orange_gradient text-center">
          Ai Powered Propmpts
        </span>
      </h1>
      <p className=" desc text-center">
        Propmtopia Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
        illo reiciendis veritatis.
      </p>
      {/* feed */}
      <Feed/>
    </section>
  );
};

export default Home;
