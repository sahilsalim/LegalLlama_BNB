"use client";

import { useEffect, useState } from "react";
import { fetchInventoryAssets } from "../../utils";

const inventory = () => {
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        fetchInventory();
    }, []);

    async function fetchInventory() {
        const data = await fetchInventoryAssets();
        setInventory(data);
    }

    return (
        <div>
            <div className="absolute left-0 top-0 h-full w-2/3 overflow-hidden">
                <div className="w-72 h-72 absolute left-0 -top-2 rounded-ee-full bg-gradient-to-r from-[#fee6b7] via-[#fff2da] to-[#fef9ec]"></div>
            </div>
            <div>
                <h1 className="text-4xl font-bold relative top-32 text-center underline">
                    Inventory
                </h1>
            </div>
            <div className="flex flex-wrap justify-center absolute top-24 left-12">
                {/* Map over the data array to render each box dynamically */}
                {inventory.map((item, index) => (
                    <div
                        key={index}
                        className="relative flex flex-col items-center p-16 mt-32 bg-white rounded shadow-2xl mx-4 my-4 border-2 border-slate-300 "
                    >
                        <div className="">
                            <div>
                                PDFHash:{" "}
                                {item.pdfHash}
                            </div>
                            <div>
                                URI:{" "}
                                <a
                                    href={item.uri}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {item.uri}
                                </a>
                            </div>
                        </div>
                        <p className="text-gray-600 text-ellipsis whitespace-nowrap overflow-hidden mt-2">
                            {/* You can add more dynamic content here if needed */}
                        </p>
                        <div className="">
                            <button className="p-1 px-20 text-black font-bold bg-[#F4C376] hover:bg-[#bd7e46] mt-2 rounded-md text-sm border-2 border-[#8a652e] ease-in-out duration-500">
                                Sell
                            </button>
                            {/* <button className="p-1 px-8 text-white bg-blue-600 hover:bg-blue-700 mt-2 rounded-md text-sm ml-2">
                            Pin for Reality
                        </button> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default inventory;
