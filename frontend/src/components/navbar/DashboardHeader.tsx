import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { BiBell } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { DashboardContext } from "../../context/DashboardContext";
import { AiOutlineUser } from "react-icons/ai";
interface MyComponentProps {
  component: React.ReactNode;
}

const DashboardHeader: React.FC<MyComponentProps> = ({ component }) => {
  const [infoActive, setInfoActive] = useState(false);
  const [bellActive, setBellActive] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { setSidebarActive, sidebarActive } = useContext(DashboardContext);
  return (
    <>
      <div className="bg-[rgb(248,249,250)] flex flex-col">
        <div className="px-4 flex flex-row justify-between select-none">
          {/* HAMBURGER/NAMA AWAL */}
          <h1 className="text-[#464646] py-4 text-[25px] overflow-hidden text-ellipsis whitespace-nowrap max-w-[256px] font-normal leading-[1.2] hidden md:block">{user?.username}</h1>
          <span
            className={`bg-transparent border-none items-center text-[#a33caa] flex shrink-0 h-16 justify-center p-0 w-16 overflow-visible normal-case m-0 leading-[1.15] cursor-pointer transition-transform md:hidden hover:text-white hover:bg-[#a33caa] focus:text-white focus:bg-[#a33caa] active:text-white active:bg-[#a33caa]`}
            onClick={() => setSidebarActive((prev) => !prev)}
            tabIndex={1}
          >
            <span className="inline-block h-6 relative align-middle w-6 normal-case leading-[1.15] transition-transform" tabIndex={2}>
              <GiHamburgerMenu className="fill-current h-full left-0 top-0 absolute w-full" />
            </span>
          </span>
          {/* HAMBURGER/NAMA AKHIR */}
          {/* LOGO -AWAL */}
          <div className="flex items-center h-auto">
            <span className="rounded-full overflow-hidden">
              <img className="w-16" src="/static/img/logo-himatekia.png" alt="logo-itera" />
            </span>
            <span>HIMATEKIA</span>
          </div>
          {/* LOGO -AKHIR */}
          <div className=" flex flex-row hover:text-[#495057] focus:text-[#495057] text-[#555555]">
            {/* Bell -awal */}
            <div
              className={`min-w-[64px] max-w-[64px] p-4 hover:bg-[rgba(0,0,0,0.025)] focus:bg-[rgba(0,0,0,0.025)] hidden md:flex justify-center cursor-pointer items-center relative ${
                bellActive &&
                'before:content-[""] before:cursor-default before:block before:h-full before:left-0 before:top-0 before:fixed before:w-full before:z-[2] after:border-solid after:h-0 after:w-0 after:border-[transparent_transparent_#fff] after:border-8 after:border-t-0 after:-bottom-4 after:content-[""] after:cursor-default after:absolute after:right-4 after:z-[11]'
              }`}
              onClick={() => setBellActive((prev) => !prev)}
              tabIndex={-1}
            >
              <BiBell className="text-base h-6 w-6 inline-block align-middle relative text-[100%]" />
            </div>
            {/* Bel -akhir */}
            {/* Informasi Akun -awal */}
            <a
              title="Informasi Akun"
              tabIndex={-1}
              className="hover:bg-[rgba(0,0,0,0.025)] p-4  items-center cursor-pointer  transition-all duration-200 relative focus:bg-[rgba(0,0,0,0.025)] active:bg-[rgba(0,0,0,0.025)] hidden md:flex"
              onClick={() => setInfoActive((prev) => !prev)}
            >
              <p className="text-base inline-block ">{user?.email}</p>
              <div
                className={`bg-[#3c5daa] rounded-full inline-block h-8 w-8 overflow-hidden align-middle ml-2
              ${
                infoActive &&
                "after:content-[''] after:border-solid after:h-0 after:w-0 after:border-[transparent_transparent_#fff] after:border-8 after:border-t-0 after:cursor-default after:absolute after:-bottom-4 after:right-4 after:z-[11] before:content-[''] before:cursor-default before:block before:h-full before:left-0 before:top-0 before:fixed before:w-full before:z-10"
              }`}
              >
                <img src="/static/img/fotodiri.jpg" alt="" className="" />
              </div>
            </a>
            {/* Informasi Akun -akhir */}
            {/* Informasi Akun -awal (mobile) */}
            <button className="">
              <AiOutlineUser />
            </button>
            {/* Informasi Akun -akhir (mobile) */}
          </div>
        </div>
        {/* Dropdown informasi akun -awal */}
        {infoActive && (
          <section className="right-3 top-16 rounded-[4px] shadow-[0_0_4px_rgba(0,0,0,0.2)] mt-4 max-h-[512px] absolute w-[256px] z-10 bg-white">
            <div className="p-4">
              <div className="text-slate-500">
                <h4 className="tracking-widest uppercase text-ellipsis whitespace-nowrap text-[#6c757d] text-[0.64em] m-0 leading-[1.2]">User</h4>
                <div>
                  <div className="flex items-center ">
                    <span className="w-full overflow-hidden text-ellipsis max-w-[100%] whitespace-nowrap pr-2  text-[100%]">{user?.email}</span>
                    <a
                      className="border-0 h-8 min-w-0 pl-0 pr-0 align-middle w-8 text-[#07addc] inline-flex bg-transparent appearance-none items-center cursor-pointer font-semibold justify-center leading-8 m-[0_4px] max-w-[100%] overflow-hidden p=[0_8px] text-center transition-all duration-200 hover:bg-[#3c5daa] focus:bg-[#3c5daa] hover:text-white focus:text-white hover:rounded-[4px] focus:rounded-[4px] focus:shadow-[0_0_0_2px_#fff,0_0_0_4px_#3c5daa]"
                      href="#"
                    >
                      <span className="h-[18px] w-[18px] inline-block relative align-middle flex-shrink-0 text-center">
                        <CiSettings className="text-[18px]" />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="tracking-widest uppercase text-ellipsis whitespace-nowrap text-[#6c757d] text-[0.64em] m-0 leading-[1.2]">Profil</h4>
                <div>
                  <div className="block text-slate-500">
                    <span className="text-[16px]]">{user?.username}</span>
                    <br />
                    <span className="text-xs">{user?.nim}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={logout}
                className="uppercase tracking-widest block mx-0 w-full border-0 min-w-0 text-[#d3385c] bg-transparent border-[1px_solid_currentColor] rounded-[4px] cursor-pointer font-semibold leading-[32px] max-w-[100%] overflow-hidden px-2 text-center transition-all align-middle hover:text-white hover:bg-[#871e36] focus:text-white focus:bg-[#871e36] active:text-white active:bg-[#871e36] focus:shadow-[0_0_0_2px_#fff,0_0_0_4px_#871e36]"
                tabIndex={-1}
              >
                <span>Logout</span>
              </button>
            </div>
          </section>
        )}
        {/* Dropdown informasi akun -akhir */}
        {/* Dropdown bell -awal */}
        {bellActive && (
          <section className="right-64 top-16 rounded-[4px] shadow-[0_0_4px_rgba(0,0,0,0.2)] mt-4 max-h-[512px] absolute w-[256px] z-10 text-slate-500 bg-white">
            <div className="p-4">
              <div className="flex justify-center items-center min-h-[256px] flex-col">
                <BiBell className="text-[72px]" />
                <div className="mt-4">No New Notifications</div>
              </div>
            </div>
          </section>
        )}
        {/* Dropdown bell -akhir */}
        <div className={`m-[10px_20px_0_16px] h-auto min-h-[100%] relative text-[#3c434a] text-[13px] leading-[1.4em] min-w-[600px] `}>{component}</div>
      </div>
    </>
  );
};

export default DashboardHeader;
