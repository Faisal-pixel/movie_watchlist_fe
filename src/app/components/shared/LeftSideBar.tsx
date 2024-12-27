"use client";
import { Input } from "../ui/input";
import SearchIcon from "../../../assets/icons/search.svg";
import Link from "next/link";
import { sidebarLinks } from "@/constants/SideBarLinks";
import { TNavLink } from "@/types";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import GuestAvatar from "../../../assets/icons/GuestAvatar.svg";
import { AuthContext } from "@/app/context/AuthContext";
import WatchLists from "../WatchLists";
import AccountDropdown from "../AccountDropdown";

const LeftSideBar = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [isMounted, setIsMounted] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const onClickHamBurger = () => {
    setShowSideBar(!showSideBar);
  };
  console.log(user.profile_picture);

  return (
    <>
      <div
        className={`fixed top-5 left-3 z-20 bg-[#1F1F1F] px-6 py-6 rounded-full lg:hidden cursor-pointer transition-all ${
          showSideBar && "left-80"
        }`}
        onClick={onClickHamBurger}
      >
        <Menu className="text-white" />
      </div>
      <nav
        className={`flex px-6 flex-col min-w-[270px] bg-black h-screen lg:overflow-y-scroll transform lg:translate-x-0 transition-transform ${
          showSideBar
            ? "translate-x-0 fixed z-10 flex"
            : "translate-x-[-100%] hidden lg:flex"
        }`}
      >
        <h2 className="text-[#F33F3F] font-extrabold text-[40px] text-center mb-[20px] mt-[19px]">
          MovieZone
        </h2>

        <div className="relative w-full mb-[40px]">
          <SearchIcon className="absolute inset-y-2 left-3 flex items-center pointer-events-none" />
          <Input
            type="search"
            className="pl-12 placeholder:text-xl placeholder:text-[#D9D9D94D]"
            placeholder="Search"
          />
        </div>

        <ul className="flex flex-col gap-y-[30px]">
          {sidebarLinks.map((link: TNavLink) => {
            const isActive = pathname === link.route;
            return (
              <li key={link.label}>
                <Link
                  href={link.route}
                  className={`flex px-[11px] py-[12px] rounded-md ${
                    isActive && "bg-[#1F1F1F]"
                  }`}
                >
                  <Image
                    src={link.imgURL}
                    alt={link.label}
                    width={24}
                    height={24}
                  />
                  <span className="font-normal text-[16px] text-[#E1E1E1] ml-[14.2px]">
                    {link.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div>
          <Link href="/create-watchlist">
          <Button className="bg-[#F33F3F] text-[#141414] font-bold text-[16px] text-center py-[11px] px-[56px] mt-[30px] cursor-pointer">
            + Create watchlist
          </Button>
          </Link>
        </div>

        {/* Will only show my list when a user is logged in */}

        <hr className="mt-[20px] max-w-[260px] bg-[#D9D9D94D] border-none h-[1px]" />
        <div className="mt-[19px] ">
          <h3 className="text-[#9A9A9A] text-base ml-[12px]">My Lists</h3>
          <div className="h-[10rem] mt-5 overflow-y-auto flex flex-col gap-y-3">
          <WatchLists />
          </div>
        </div>

        <div className="flex justify-between mt-auto mb-[30px] py-[0.4rem] px-[0.625rem] cursor-pointer border border-[#E1E1E1] rounded-[4px]">
          {/* Profile picture */}
          <div className="flex">
            {/* Create here a div with height and width 32px and border-radius 50% and background-image with the user's profile picture */}
            {isAuthenticated && user ? (
              <>
                {
                  user.profile_picture ? (
                    <div className="h-[32px] w-[32px] rounded-full overflow-hidden">
                      <Image
                        src={user.profile_picture}
                        alt="Profile Picture"
                        width={32}
                        height={32}
                      />
                    </div>
                  ) : (
                    <GuestAvatar />
                  )
                }
                <span className="text-[#E1E1E1] text-xs self-center ml-[0.625rem]">
                  {user.username}
                </span>
              </>
            ) : (
              <>
                <span>
                  <GuestAvatar />
                </span>

                <span className="text-[#E1E1E1] text-xs self-center ml-[0.625rem]">
                  Guest
                </span>
              </>
            )}
          </div>

          {/* Elipse */}
          <AccountDropdown />
          {/* <DropdownMenuComponent>
            <div className="flex justify-center items-center">
              <span>
                <DotDotDot />
              </span>
            </div>
          </DropdownMenuComponent> */}
        </div>
      </nav>
    </>
  );
};

export default LeftSideBar;
