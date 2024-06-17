"use client";

import Link from "next/link";
import { LayoutGrid, Loader, LogOut, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Session } from "lucia";
import { GearIcon } from "@radix-ui/react-icons";
import { api } from "@/lib/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UserNavProps {
  user: User;
  session: Session;
}

export function UserNav({ user, session }: UserNavProps) {
  const router = useRouter();
  const userProfile = api.user.getUserProfile.useQuery();

  if (!userProfile.data?.success) {
    router.push(userProfile.data?.redirect ?? "/login");
  }

  const fname = userProfile.data?.data?.firstname ?? "";
  const lname = userProfile.data?.data?.lastname ?? "";

  const logoutMutation = api.auth.logout.useMutation({
    onMutate: () => {
      toast.info("Logging out...");
    },
    onSuccess: (data) => {
      toast.success("Logged out");
      router.push(data.redirect);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function handleLogout() {
    logoutMutation.mutate();
  }

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  {/* <AvatarImage src="#" alt="Avatar" /> */}
                  <AvatarFallback className="bg-transparent">
                    {fname.charAt(0)}
                    {lname.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {fname} {lname}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/dashboard" className="flex items-center">
              <LayoutGrid className="w-4 h-4 mr-3 text-muted-foreground" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/settings" className="flex items-center">
              <GearIcon className="w-4 h-4 mr-3 text-muted-foreground" />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
