'use client'
import Link from "next/link";
import {useRouter} from 'next/navigation';

const address ="0x48e6a467852Fa29710AaaCDB275F85db4Fa420eBcx";
const Navbar = () => {
    const router = useRouter();
  return (
    <div >
      <nav className="absolute top-0 right-0 w-screen h-12">
        <ul className="absolute flex space-x-7 right-10 top-4">
          <li className="px-6 py-2 text-black bg-[#F4C376] hover:bg-[#e9d1aa] hover:cursor-pointer ease-in-out duration-500 rounded-md md:ml-5 border-2 border-[#8a652e]" onClick={() => router.push("/inventory")}>Inventory</li>
          <li className="px-6 py-2 text-black bg-[#F4C376] hover:bg-[#e9d1aa] hover:cursor-pointer ease-in-out duration-500 rounded-md md:ml-5 border-2 border-[#8a652e]" onClick={() => router.push("/marketplace")}>
            MarketPlace
          </li>
          <li>
          <button
  className="px-6 py-2 text-black border-2 border-black bg-white ease-in-out duration-500 rounded-md md:ml-5"
>
  {`${address.substring(0, 10)}...`}
</button>

          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Navbar;
