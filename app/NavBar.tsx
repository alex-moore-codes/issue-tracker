"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { useSession } from "next-auth/react";

export default function NavBar() {
	const currentPath = usePathname();
	const { status, data: session } = useSession();

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
		<nav className="flex mx-auto space-x-6 h-16 border-b mb-5 px-5 items-center">
			<Link href={"/"}>
				<AiFillBug />
			</Link>
			<ul className="flex space-x-6">
				{links.map((link, index: number) => (
					<li key={link.id}>
						<Link
							className={classNames({
								"text-zinc-500": link.href !== currentPath,
								"text-zinc-900": link.href === currentPath,
								"hover:text-zinc-800 transition-colors": true,
							})}
							href={link.href}
						>
							{link.label}
						</Link>
					</li>
				))}
			</ul>
			{status === "authenticated" && (
				<Link href={"/api/auth/signout"}>Sign out</Link>
			)}
			{status !== "authenticated" && (
				<Link href={"/api/auth/signin"}>Sign in</Link>
			)}
		</nav>
	);
}
