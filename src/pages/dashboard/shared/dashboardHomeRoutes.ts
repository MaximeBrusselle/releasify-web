type dashboardRoute = {
	title: string;
	description: string;
	path: string;
	buttonText: string;
};

export function getRoutesForUsertype(userType: string) {
	let routes: dashboardRoute[] = [
		{
			title: "Your Profile",
			description: "Get an overview of your profile and change all your info.",
			path: "user",
			buttonText: "Go to edit profile",
		},
	];
	if (userType === "label") {
		routes.push({
			title: "Your Artists",
			description: "Get an overview of your artists and edit them.",
			path: "artists",
			buttonText: "Go to artists",
		});
	}
	if (userType !== "user") {
		routes.push({
			title: "Your Releases",
			description: "Get an overview of your releases and edit them or announce new ones.",
			path: "releases",
			buttonText: "Go to releases",
		});
		routes.push({
			title: "Your Requests",
			description: "Check collab requests and other requests.",
			path: "requests",
			buttonText: "Go to requests",
		});
		routes.push({
			title: "Your Analytics",
			description: "Get all kinds of analytics of your profile.",
			path: "analytics",
			buttonText: "Go to analytics",
		});
	}
	routes.push({
		title: "Your Settings",
		description: "Edit your settings",
		path: "settings",
		buttonText: "Go to settings",
	});
	return routes;
}
