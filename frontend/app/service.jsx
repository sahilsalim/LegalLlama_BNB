"use client";

import { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";
import { setExportingVariable1 , setExportingKey , getExportingKey } from "../config";
import { createAssetOnChain, fetchInventoryAssets } from "../utils";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [s3Url, setS3Url] = useState("");
  const [key, setKey] = useState("");
  const [fileName, setFileName] = useState("");
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);

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

    setTimeout(() => {
      setUploading(false);
      window.location.href = "/solutions";
    }, 52000);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/s3-upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      const s3 = data.s3Url;
      setS3Url(s3);

      const s3key = data.Key;
      setKey(s3key);
      setExportingVariable1(s3); // Set s3Url in config
      console.log("s3key:", s3key);
      await  setExportingKey(s3key);
      await getExportingKey(s3key);

      fetchInventory(s3); // Pass s3Url to fetchInventory
      setLoading(true);
      const assetResponse = await createAssetOnChain(s3);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

 

  // Use useEffect to log s3Url after it's updated
  useEffect(() => {
    console.log("s3url:", s3Url);
  }, [s3Url]);

  return (
    <>
      <div>
        <div className="absolute left-0 top-0 h-full w-2/3 overflow-hidden">
          <div className="w-72 h-72 absolute left-0 -top-2 rounded-ee-full bg-gradient-to-r from-[#fee6b7] via-[#fff2da] to-[#fef9ec]"></div>
        </div>
        <div className="flex">
          <div>
            <img
              src="/upload.jpg"
              alt="upload"
              className="w-[600px] h-[350px] relative top-80 left-40 rounded-lg"
            />
          </div>

          <div className="text-2xl text-slate-600 absolute p-15 right-10 items-end">
            <div className="p-24 rounded-xl font-bold text-[#ffffff] text-3xl ">
              <h1 className="text-black font-bold h-4 text-3xl relative top-36  right-20">
                Upload your{" "}
                <ReactTyped
                  strings={["Docx"]}
                  typeSpeed={100}
                  loop
                />
              </h1>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-24 bg-white p-2 rounded-2xl right-24"
            >
              <input
                type="file"
                accept="docx"
                onChange={handleFileChange}
                className="bg-slate-100 rounded-xl font-thin text-lg right-12"
              />
              <button
                type="submit"
                disabled={!file || uploading}
                className="bg-[#33BF92] py-1 px-4 text-black border-2 border-[#8DD8F4] rounded-md hover:bg-[#9aedd4] shadow-2xl relative top-20 right-28 cursor-pointer text-lg ease-in-out duration-500"
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
