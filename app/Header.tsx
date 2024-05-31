import Link from "next/link"
const Header =()=>{
    return(
        <nav>
        <ul className="relative flex flex-row p-3 bg-slate-500 font-bold justify-between border-red-700">
          <li>
            <Link href="/" className="hover:cursor-pointer p-1 rounded-sm ">
 
            NOTICE READER
            </Link>
          </li>
          

          <li>
            <Link href="/services" className="hover:bg-slate-400 p-1 rounded-xl ">

            Services
            </Link>
          </li>
        </ul>
      </nav>
    )
}
export default Header