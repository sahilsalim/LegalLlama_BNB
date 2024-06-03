"use client";

import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

const address = "0x48e6a467852Fa29710AaaCDB275F85db4Fa420eBcx";
const Navbar = () => {
    const router = useRouter();
    return (
        <div>
            <nav className="absolute top-0 right-0 w-screen h-12">
                <Link href="/">
                    <img
                        src="logo.jpg"
                        alt="logo"
                        className="w-40  relative top-3 left-3 hover:cursor-pointer"
                        onClick={() => router.push("/")}
                    />
                </Link>
                <ul className="absolute flex space-x-7 right-10 top-4">
                    
                    <li
                        className="px-6 py-2 text-black bg-[#F4C376] hover:bg-[#bd7e46] hover:cursor-pointer ease-in-out duration-500 rounded-md md:ml-5 border-2 border-[#8a652e]"
                        onClick={() => router.push("/inventory")}
                    >
                        Inventory
                    </li>
                    <li
                        className="px-6 py-2 text-black bg-[#F4C376] hover:bg-[#bd7e46] hover:cursor-pointer ease-in-out duration-500 rounded-md md:ml-5 border-2 border-[#8a652e]"
                        onClick={() => router.push("/marketplace")}
                    >
                        Secretive Assets
                    </li>
                    <li>
                      <ConnectButton showBalance={false} />
                    </li>
                </ul>
            </nav>
        </div>
    );
};
export default Navbar;
