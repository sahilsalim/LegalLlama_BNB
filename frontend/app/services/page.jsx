"use client";
import { useState } from "react";

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
    <div className=" flex flex-col items-center ">
    <img src="/upload.jpg" alt="upload" className="w-screen h-screen"/>

      <div className=" text-2xl text-slate-600 absolute p-10">
      <h1 className=" p-24 border-red rounded-xl font-bold text-white text-3xl ">Upload Document File to S3 Bucket</h1>
      
      <form onSubmit={handleSubmit} className="bg-white pt-3 pb-3 pr-5 pl-5  rounded-2xl">
        <input type="file" accept="docx" onChange={handleFileChange} className=""/>
        <button type="submit" disabled={!file || uploading} className="bg-blue-950 p-1 text-white rounded-lg ">
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
