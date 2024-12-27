"use client";
import React, { useContext } from "react";
import DropdownMenuComponent from "./shared/DropdownMenuComponent";
import DotDotDot from "../../assets/icons/dot dot dot.svg";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { WatchListsContext } from "../context/WatchListsContext";

// type Props = {}

const menuItemClasses = "inline-block w-full";

const AccountDropdown = () => {
  const { toast } = useToast();
  const { isAuthenticated, logOut } = useContext(AuthContext);
  const { setWatchlists } = useContext(WatchListsContext);

  const onClickLogout = () => {
    setWatchlists([]);
    logOut();
    toast({
      title: "Logged out successfully",
    });
  };

  const menuItems = isAuthenticated
    ? [
        {
          label: "Logout",
          className: menuItemClasses,
          onClick: onClickLogout,
        },
        {
          label: "Profile",
          className: menuItemClasses,
          href: "/profile",
        },
      ]
    : [
        {
          label: "Login",
          href: "/login",
          className: menuItemClasses,
        },
        {
          label: "Sign up",
          href: "/signup",
          className: menuItemClasses,
        },
      ];
  return (
    <DropdownMenuComponent menuLabel="My Account" menuItems={menuItems}>
      <div className="flex justify-center items-center">
        <span>
          <DotDotDot />
        </span>
      </div>
    </DropdownMenuComponent>
  );
};

export default AccountDropdown;
