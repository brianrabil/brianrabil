"use client";

import * as React from "react";
import {
	ActivityIcon,
	BoxIcon,
	CpuIcon,
	DatabaseIcon,
	GlobeIcon,
	HardDriveIcon,
	LayoutDashboardIcon,
	NetworkIcon,
	SearchIcon,
	ServerIcon,
	SettingsIcon,
	ShieldIcon,
	TerminalIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

const navMain = [
	{
		title: "Overview",
		url: "/dashboard",
		icon: LayoutDashboardIcon,
	},
	{
		title: "Services",
		url: "/dashboard/services",
		icon: BoxIcon,
	},
	{
		title: "Containers",
		url: "/dashboard/containers",
		icon: ServerIcon,
	},
	{
		title: "Network",
		url: "/dashboard/network",
		icon: NetworkIcon,
	},
	{
		title: "Storage",
		url: "/dashboard/storage",
		icon: HardDriveIcon,
	},
	{
		title: "Databases",
		url: "/dashboard/databases",
		icon: DatabaseIcon,
	},
];

const navSecondary = [
	{
		title: "Terminal",
		url: "/dashboard/terminal",
		icon: TerminalIcon,
	},
	{
		title: "Logs",
		url: "/dashboard/logs",
		icon: ActivityIcon,
	},
	{
		title: "Settings",
		url: "/dashboard/settings",
		icon: SettingsIcon,
	},
];

export function AppSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const { data: session } = authClient.useSession();

	const user = session?.user
		? {
				name: session.user.name,
				email: session.user.email,
				avatar: session.user.image || "/avatar.png",
			}
		: {
				name: "Admin",
				email: "admin@homelab",
				avatar: "/avatar.png",
			};

	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:!p-1.5"
						>
							<Link href="/dashboard">
								<Image
									src="/avatar.png"
									alt=""
									width={20}
									height={20}
									className="rounded-full"
								/>
								<span className="text-base font-semibold">
									Homelab
								</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={navMain} />
				<NavSecondary items={navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user} />
			</SidebarFooter>
		</Sidebar>
	);
}
