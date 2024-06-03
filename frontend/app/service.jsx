'use client'

import { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";
import { getExportingVariable1, setExportingVariable1 } from "../config"; // Importing the setter function
import { fetchInventoryAssets } from "../../utils";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [s3Url, setS3Url] = useState(""); // State to hold the S3 URL
  const [ket, setKey]=useState("");
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetchInventory();
}, []);

  async function fetchInventory() {
    const data = await fetchInventoryAssets();
    setInventory(data);
}

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
      console.log(data.s3url); // Logging S3 URL to console
      const s3 = data.s3Url;      // Set the S3 URL in the state
      setS3Url(s3);
      console.log(data.fileName);
      fetchInventory(s3Url);

      // Set the exportingVariable1 value
      
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false); // Reset uploading state after fetch
    }
  };

  // Use useEffect to log s3Url after it's updated
  useEffect(() => {
    console.log("s3url:", s3Url);
    setExportingVariable1(s3Url);
    console.log( getExportingVariable1(s3Url))
  }, [s3Url]);

  return (
    <>
      <div>
      <div className="absolute left-0 top-0 h-full w-2/3 overflow-hidden">
          <div className="w-72 h-72 absolute left-0 -top-2 rounded-ee-full bg-gradient-to-r from-[#fee6b7] via-[#fff2da] to-[#fef9ec]"></div>
        </div>
        <div className="flex">
          <div>

          <img src="/upload.jpg" alt="upload" className="w-[700px] h-[400px] relative top-36 left-20" />
          </div>

          <div className="text-2xl text-slate-600 absolute p-15 right-10 items-end">
            <div className="p-24 rounded-xl font-bold text-[#ffffff] text-3xl ">
              <h1 className="text-black font-bold h-4 text-3xl relative top-36  right-20">
                Upload your <ReactTyped strings={["Docx"]} typeSpeed={100} loop />
              </h1>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-24 bg-white p-2 rounded-2xl"
            >
              <input type="file" accept="docx" onChange={handleFileChange} className="bg-slate-100 rounded-xl" />
              <button
                type="submit"
                disabled={!file || uploading}
                className="bg-[#33BF92] py-1 px-4 text-black border-2 border-[#8DD8F4] rounded-md hover:bg-[#9aedd4] shadow-2xl relative top-20 right-24 cursor-pointer text-lg ease-in-out duration-500"
              >
                {uploading ? "Uploading.." : "Upload"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadForm;
