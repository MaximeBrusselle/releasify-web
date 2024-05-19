"use client";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeftToLine, Home, LineChart, PanelLeft, Search, Settings, Disc3, MailPlus, User, Users } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useContext, useEffect, useState } from "react";
import { doSignOut } from "@/auth/auth";
import { AuthContext } from "@/auth/AuthProvider";
import { breadCrumbMap } from "./breadCrumpMap";
import { DashboardNotLoggedIn } from "./DashboardNotLoggedIn";

type DashboardProps = {
	children: React.ReactNode;
};

export function DashboardContainer(props: DashboardProps) {
	const { children } = props;
	const location = useLocation();
	const { isLoggedIn, currentUser } = useContext(AuthContext);
	const [pfpUrl, setPfpUrl] = useState<string>("https://i.ibb.co/nPh6PCt/default-pfp.jpg");
	const [userType, setUserType] = useState<string>("user");
	useEffect(() => {
		if (isLoggedIn) {
			if (currentUser.photoURL === null) {
				if (localStorage.getItem("pfp") !== null) {
					setPfpUrl(localStorage.getItem("pfp")!);
					localStorage.removeItem("pfp");
				} else {
					setPfpUrl("https://i.ibb.co/nPh6PCt/default-pfp.jpg");
				}
			} else {
				setPfpUrl(currentUser.photoURL);
			}
			if (localStorage.getItem("userType") !== null) {
				setUserType(localStorage.getItem("userType")!);
				localStorage.removeItem("userType");
			} else {
				const userData: any = JSON.parse(localStorage.getItem("userData")!);
				setUserType(userData!.type);
			}
		} else {
			setPfpUrl("https://i.ibb.co/nPh6PCt/default-pfp.jpg");
		}
	}, [currentUser]);

	const navigationItems = createNavigationItems(userType);
	navigationItems.forEach((item) => {
		item.current = location.pathname === item.href;
	});
	const paths = location.pathname.split("/").filter((path) => path !== "");

	return (
		<div className="flex min-h-screen w-full flex-col bg-muted/40">
			<aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-white sm:flex">
				<nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
					<Link
						to="/"
						className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-green-500 text-lg text-muted-foreground font-semibold text-green-500-foreground md:h-8 md:w-8 md:text-base hover:text-foreground"
					>
						<ArrowLeftToLine className="h-4 w-4 transition-all group-hover:scale-110" />
						<span className="sr-only">Back to home</span>
					</Link>
					{navigationItems.slice(0, -1).map((item) => (
						<TooltipProvider key={`${item.name}a`}>
							<Tooltip>
								<TooltipTrigger asChild>
									<Link
										to={item.href}
										className={`flex h-9 w-9 items-center justify-center rounded-lg ${
											item.current ? "bg-green-200 text-green-200-foreground" : "text-muted-foreground"
										} transition-colors hover:text-foreground md:h-8 md:w-8`}
									>
										{item.icon}
										<span className="sr-only">{item.name}</span>
									</Link>
								</TooltipTrigger>
								<TooltipContent side="right">{item.name}</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					))}
				</nav>
				<nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
					{navigationItems.slice(-1).map((item) => (
						<TooltipProvider key={`${item.name}a`}>
							<Tooltip>
								<TooltipTrigger asChild>
									<Link
										to={item.href}
										className={`flex h-9 w-9 items-center justify-center rounded-lg ${
											item.current ? "bg-green-200 text-green-200-foreground" : "text-muted-foreground"
										} transition-colors hover:text-foreground md:h-8 md:w-8`}
									>
										{item.icon}
										<span className="sr-only">{item.name}</span>
									</Link>
								</TooltipTrigger>
								<TooltipContent side="right">{item.name}</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					))}
				</nav>
			</aside>
			<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
				<header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
					<Sheet>
						<SheetTrigger asChild>
							<Button size="icon" variant="outline" className="sm:hidden">
								<PanelLeft className="h-5 w-5" />
								<span className="sr-only">Toggle Menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="sm:max-w-xs">
							<nav className="grid gap-6 text-lg font-medium">
								<Link
									to="/"
									className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-green-500 text-lg font-semibold text-green-500-foreground md:text-base"
								>
									<ArrowLeftToLine className="h-4 w-4 transition-all group-hover:scale-110" />
									<span className="sr-only">Back to home</span>
								</Link>
								{navigationItems.map((item) => (
									<Link
										key={`${item.name}b`}
										to={item.href}
										className={`flex h-10 items-center justify-start rounded-lg gap-x-4 p-4 ${
											item.current ? "bg-green-200 text-green-200-foreground" : "text-muted-foreground"
										} transition-colors hover:text-foreground`}
									>
										{item.icon}
										<span>{item.name}</span>
									</Link>
								))}
							</nav>
						</SheetContent>
					</Sheet>
					<Breadcrumb className="hidden md:flex">
						<BreadcrumbList>
							{paths.map((path, index) => (
								<div key={path} className="flex flex-row items-center justify-center gap-3">
									<BreadcrumbItem>
										<BreadcrumbLink asChild>
											<Link to={breadCrumbMap[path].href}>{breadCrumbMap[path].name}</Link>
										</BreadcrumbLink>
									</BreadcrumbItem>
									{index < paths.length - 1 && <BreadcrumbSeparator />}
								</div>
							))}
						</BreadcrumbList>
					</Breadcrumb>
					{/* TODO: Convert this to a command thingy  */}
					<div className="relative ml-auto flex-1 md:grow-0">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input type="search" placeholder="Search..." className="w-full rounded-lg bg-white pl-8 md:w-[200px] lg:w-[336px]" />
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="icon" className="overflow-hidden rounded-full">
								<img src={pfpUrl} alt="Avatar" className="overflow-hidden rounded-full w-24 aspect-square object-cover border-2 border-solid border-black" />
							</Button>
						</DropdownMenuTrigger>
						{isLoggedIn ? (
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>My Account</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Settings</DropdownMenuItem>
								<DropdownMenuItem>Support</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={doSignOut}>Logout</DropdownMenuItem>
							</DropdownMenuContent>
						) : (
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>My account</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<Link to="/login">
									<DropdownMenuItem>Log in</DropdownMenuItem>
								</Link>
								<Link to="/register">
									<DropdownMenuItem>Register</DropdownMenuItem>
								</Link>
							</DropdownMenuContent>
						)}
					</DropdownMenu>
				</header>
				{isLoggedIn ? children : <DashboardNotLoggedIn />}
			</div>
		</div>
	);
}

type NavigationItem = {
	name: string;
	href: string;
	current: boolean;
	icon: React.ReactNode;
};

function createNavigationItems(userType: string) {
	const navigationItems: NavigationItem[] = [
		{ name: "Dashboard", href: "/profile", current: false, icon: <Home className="h-5 w-5" /> },
		{ name: "User", href: "/profile/user", current: false, icon: <User className="h-5 w-5" /> },
	];
	if (userType === "label") {
		navigationItems.push({ name: "Artists", href: "/profile/artists", current: false, icon: <Users className="h-5 w-5" /> });
	}
	if (userType !== "user") {
		navigationItems.push({ name: "Releases", href: "/profile/releases", current: false, icon: <Disc3 className="h-5 w-5" /> });
		navigationItems.push({ name: "Requests", href: "/profile/requests", current: false, icon: <MailPlus className="h-5 w-5" /> });
		navigationItems.push({ name: "Analytics", href: "/profile/analytics", current: false, icon: <LineChart className="h-5 w-5" /> });
	}
	navigationItems.push({ name: "Settings", href: "/profile/settings", current: false, icon: <Settings className="h-5 w-5" /> });
	return navigationItems;
}
