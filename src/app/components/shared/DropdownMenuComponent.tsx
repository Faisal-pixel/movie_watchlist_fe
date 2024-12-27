import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";

type DropdownMenuItemProps = {
  label: string;
  onClick?: () => void; // Optional click handler
  href?: string; // Optional link
  className?: string; // Optional custom styles
};

type Props = {
  children: React.ReactNode;
  menuLabel?: string;
  menuItems: DropdownMenuItemProps[];
  className?: string;
};

const DropdownMenuComponent = ({
  children,
  menuLabel,
  menuItems,
}: Props) => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="bg-mainBackground text-text-default">
        {menuLabel && <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>}

        {menuItems.map((item, index) => {
          return (
            <DropdownMenuItem
              key={index}
              className={`cursor-pointer ${item.className}`}
              onClick={item?.onClick}
            >
              {/* If the item has an href, render a link, otherwise just the label */}
              {item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                item.label
              )}
            </DropdownMenuItem>
          );
        })}

        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        {/*
            isAuthenticated ? (
                <>
                    <DropdownMenuItem className="cursor-pointer" >
                    <Link className="inline-block w-full" href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
        {/*  <DropdownMenuItem className="cursor-pointer" onClick={onClickLogout}>Logout</DropdownMenuItem>
                </>
            ) : (
                <>
                    <DropdownMenuItem className="cursor-pointer">
                        <Link className="inline-block w-full" href="/login">Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                        <Link className="inline-block w-full" href="/signup">Sign up</Link>
                    </DropdownMenuItem>
                </>
            )
        } */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuComponent;
