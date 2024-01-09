"use client";

import { Skeleton } from "@/app/components";
import {
   Avatar,
   Box,
   Container,
   DropdownMenu,
   Flex,
   Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

export default function NavBar() {
   return (
      <nav className="p-4 border-b mb-5 px-5">
         <Container>
            <Flex justify={"between"}>
               <Flex align={"center"} gap={"3"}>
                  <NavLinks />
               </Flex>
               <Box>
                  <AuthStatus />
               </Box>
            </Flex>
         </Container>
      </nav>
   );
}

function NavLinks() {
   const currentPath = usePathname();

   const links = [
      {
         id: 0,
         label: "Dashboard",
         href: "/",
      },
      {
         id: 1,
         label: "Issues",
         href: "/issues/list",
      },
   ];

   return (
      <>
         <Link href={"/"}>
            <AiFillBug />
         </Link>
         <ul className="flex space-x-6">
            {links.map((link) => (
               <li key={link.id}>
                  <Link
                     className={classNames({
                        "nav-link": true,
                        "!text-zinc-900": link.href === currentPath,
                     })}
                     href={link.href}
                  >
                     {link.label}
                  </Link>
               </li>
            ))}
         </ul>
      </>
   );
}

function AuthStatus() {
   const { status, data: session } = useSession();
   if (status === "loading") return <Skeleton width={"3rem"} />;
   if (status === "unauthenticated")
      return (
         <Link className="nav-link" href={"/api/auth/signin"}>
            Sign in
         </Link>
      );

   return (
      <DropdownMenu.Root>
         <DropdownMenu.Trigger>
            <Avatar
               src={session!.user!.image!}
               fallback="?"
               referrerPolicy="no-referrer"
               className="cursor-pointer"
            />
         </DropdownMenu.Trigger>
         <DropdownMenu.Content>
            <DropdownMenu.Label>
               <Text size="2">{session!.user!.name}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
               <Link href={"/api/auth/signout"}>Sign out</Link>
            </DropdownMenu.Item>
         </DropdownMenu.Content>
      </DropdownMenu.Root>
   );
}
