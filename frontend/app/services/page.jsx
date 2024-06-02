"use client";
import { useState } from "react";
import Typewriter from "typewriter-effect";
import { ReactTyped } from "react-typed";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);

        setTimeout(()=>{
      setUploading(false);
      window.location.href='/solutions';
    },2000);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/s3-upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      setUploading(data);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  }

  return (
    <>
    <div >
    <div className=" flex flex-col items-end  ">
    <img src="/upload.jpg" alt="upload" className="w-screen h-screen"/>

      <div className=" text-2xl text-slate-600 absolute p-10">
      
      <div className=" p-24 rounded-xl font-bold text-[#ffffff] text-3xl ">
      <h1 className="text-white font-bold h-4 text-5xl  ">
        Upload your{" "}
        <ReactTyped strings={["Docx"]} typeSpeed={100} loop />
      </h1>
    </div>
      
      
      <form onSubmit={handleSubmit} className=" mt-24 bg-white pt-2 pb-2 pr-1 pl-2  rounded-2xl">
        <input type="file" accept="docx" onChange={handleFileChange} className=""/>
        <button type="submit" disabled={!file || uploading} className="bg-[#ffff] py-2 px-6 text-black border-3 border-[#8DD8F4] rounded-xl hover:bg-gray-100 shadow-2xl shadow-black relative top-24 right-0 cursor-pointer">
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
      </div>
    </div>
    </div>
    </>
  );
};

export default UploadForm;
