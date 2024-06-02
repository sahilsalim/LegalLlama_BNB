"use client";
import React from "react";
import Typewriter from "typewriter-effect";
import { ReactTyped } from "react-typed";

const Hero = () => {
  return (
    <div className="bg-black h-[100vh] border-slate-100 ">
    
      <div className="flex justify-end items-center pt-[30vh] pr-[20vh]">
        <img src="./supreme.jpg" alt="court" className="w-[50vh] " />
      </div>

      <div>
      <h1 className="text-white font-bold h-4 text-2xl -top-5 ">
        Welcome to{" "}
        <ReactTyped strings={["Notice Reader Website"]} typeSpeed={100} loop />
      </h1>
      </div>
    </div>
  );
};
export default Hero;
