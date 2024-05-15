import logo from "@/assets/logo.png";
import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { doSignOut } from "@/auth/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/auth/AuthProvider";
import { useContext } from "react";

// Define a type for the navigation items
interface NavigationItem {
	name: string;
	href: string;
	current: boolean;
}

function classNames(...classes: (string | boolean)[]): string {
	return classes.filter(Boolean).join(" ");
}

const NavBar: React.FC = () => {
	const navigate = useNavigate();
	const { isLoggedIn, userData } = useContext(AuthContext);
	const [pfpUrl, setPfpUrl] = useState<string>("https://i.ibb.co/nPh6PCt/default-pfp.jpg");
	useEffect(() => {
		if (isLoggedIn && userData) {
			if (userData.profilePicture) setPfpUrl(userData.profilePicture);
		} else {
			setPfpUrl("https://i.ibb.co/nPh6PCt/default-pfp.jpg");
		}
	}, [userData]);
	const location = useLocation();

	const handleSignOut = async () => {
		await doSignOut();
		navigate("/");
	};

	const navigation: NavigationItem[] = [
		{ name: "Home", href: "/", current: false },
		{ name: "Releases", href: "/releases", current: false },
		{ name: "Artists", href: "/artists", current: false },
		{ name: "Labels", href: "/labels", current: false },
		{ name: "FAQ", href: "/faq", current: false },
		{ name: "Updates", href: "/updates", current: false },
	];

	navigation.forEach((item) => {
		item.current = location.pathname === item.href || location.pathname.startsWith(item.href + "/");
	});

	return (
		<Disclosure as="nav" className="bg-background">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<div className="relative flex h-16 items-center justify-between">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-text focus:outline-none focus:ring-2 focus:ring-inset focus:ring-text">
									<span className="absolute -inset-0.5" />
									<span className="sr-only">Open main menu</span>
									{open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
								</Disclosure.Button>
							</div>
							<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
								<div className="flex flex-shrink-0 items-center">
									<img className="h-8 w-auto rounded-full" src={logo} alt="Your Company" />
								</div>
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4">
										{navigation.map((item) => {
											return (
												<a
													key={item.name}
													href={item.href}
													className={classNames(
														item.current ? "bg-primary text-text hover:text-background" : "text-text hover:bg-primary hover:text-text",
														"rounded-md px-3 py-2 text-sm font-medium"
													)}
													aria-current={item.current ? "page" : undefined}
												>
													{item.name}
												</a>
											);
										})}
									</div>
								</div>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								<button
									type="button"
									className="relative rounded-full bg-gray-800 p-1 text-text hover:text-text focus:outline-none focus:ring-2 focus:ring-text focus:ring-offset-2 focus:ring-offset-text"
								>
									<span className="absolute -inset-1.5" />
									<span className="sr-only">View notifications</span>
									<BellIcon className="h-6 w-6" aria-hidden="true" />
								</button>

								{/* Profile dropdown */}
								<Menu as="div" className="relative ml-3">
									<div>
										<Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-text focus:ring-offset-2 focus:ring-offset-text hover:ring-text">
											<span className="absolute -inset-1.5" />
											<span className="sr-only">Open user menu</span>
											<img className="h-8 w-8 rounded-full" src={pfpUrl} alt="profile picture" />
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										{isLoggedIn ? (
											<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-background py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
												<Menu.Item>
													{({ active }) => (
														<a href="/profile" className={classNames(active ? "bg-primary text-primary hover:text-text" : "", "block px-4 py-2 text-sm text-text")}>
															Your Profile
														</a>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }) => (
														<a href="/settings" className={classNames(active ? "bg-primary text-primary hover:text-text" : "", "block px-4 py-2 text-sm text-text")}>
															Settings
														</a>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }) => (
														<div
															onClick={handleSignOut}
															className={classNames(active ? "bg-primary text-primary hover:text-[#f00]" : "", "block px-4 py-2 text-sm text-[#f00]")}
														>
															Sign out
														</div>
													)}
												</Menu.Item>
											</Menu.Items>
										) : (
											<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-background py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
												<Menu.Item>
													{({ active }) => (
														<Link to={"/login"}>
															<div className={classNames(active ? "bg-primary text-primary hover:text-text" : "", "block px-4 py-2 text-sm text-text")}>Log in</div>
														</Link>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }) => (
														<a href="/register" className={classNames(active ? "bg-primary text-primary hover:text-text" : "", "block px-4 py-2 text-sm text-text")}>
															Register
														</a>
													)}
												</Menu.Item>
											</Menu.Items>
										)}
									</Transition>
								</Menu>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="space-y-1 px-2 pb-3 pt-2">
							{navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									as="a"
									href={item.href}
									className={classNames(
										item.current ? "bg-primary text-text hover:text-background" : "text-text hover:bg-primary hover:text-text",
										"block rounded-md px-3 py-2 text-base font-medium"
									)}
									aria-current={item.current ? "page" : undefined}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};

export default NavBar;
