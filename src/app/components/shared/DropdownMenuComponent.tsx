import React, { useContext } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/app/context/AuthContext";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

type Props = {
  children: React.ReactNode;
};

const DropdownMenuComponent = ({ children }: Props) => {
  const {toast} = useToast();

    const {logOut, isAuthenticated} = useContext(AuthContext);

    const onClickLogout = () => {
        logOut();
        toast({
            title: "Logged out successfully"
        });
    }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="bg-mainBackground text-text-default">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {
            isAuthenticated ? (
                <>
                    <DropdownMenuItem className="cursor-pointer" >
                    <Link className="inline-block w-full" href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
                    <DropdownMenuItem className="cursor-pointer" onClick={onClickLogout}>Logout</DropdownMenuItem>
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
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuComponent;
