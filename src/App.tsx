import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import PageContainer from "@/components/PageContainer";
import HomePage from "@/pages/HomePage";
import NotFound from "@/pages/NotFound";
import FAQPage from "@/pages/faq/FAQPage";
import ReleasesPage from "@/pages/releases/ReleasesPage";
import ArtistsPage from "@/pages/artists/ArtistsPage";
import LabelsPage from "@/pages/labels/LabelsPage";
import UpdatesPage from "@/pages/updates/UpdatesPage";
import SettingsPage from "@/pages/profile/SettingsPage";
import SignOutPage from "@/pages/profile/SignOutPage";
import ArtistDetailPage from "@/pages/artists/artistDetail/ArtistDetailPage";
import LabelDetailPage from "@/pages/labels/labelDetails/LabelDetailPage";
import Test from "@/pages/Test";
import ArtistRegistration from "@/pages/registration/ArtistRegistration";
import LabelRegistration from "@/pages/registration/LabelRegistration";
import React, { createContext, useState } from "react";
import Registration from "@/pages/registration/Registration";
import UserRegistration from "./pages/registration/UserRegistration";
import { DashboardContainer } from "./pages/dashboard/DashboardContainer";
import { ArtistDashboardHome } from "./pages/dashboard/artist/ArtistDashboardHome";
import ArtistDashboardReleases from "./pages/dashboard/artist/ArtistDashboardReleases";
// Import other pages

export const UserContext = createContext({
	isLoggedIn: false,
	handleChange: (value: boolean) => {},
});

const Layout: React.FC = () => {
	return (
		<PageContainer>
			<Outlet /> {/* Placeholder for nested routes */}
		</PageContainer>
	);
};

const DashboardLayout: React.FC = () => {
	return (
		<DashboardContainer>
			<Outlet /> {/* Placeholder for nested routes */}
		</DashboardContainer>
	);
};

const App: React.FC = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const handleChange = (value: boolean) => setIsLoggedIn(value);
	return (
		<UserContext.Provider value={{ isLoggedIn, handleChange }}>
			<Router>
				<Routes>
					<Route path="/" element={<Layout />}>
						{/* Index route for the default path within the layout */}
						<Route index element={<HomePage />} />
						<Route path="releases" element={<ReleasesPage />} />
						<Route path="artists">
							<Route index element={<ArtistsPage />} />
							<Route path=":artistId" element={<ArtistDetailPage />} />
						</Route>
						<Route path="labels">
							<Route index element={<LabelsPage />} />
							<Route path=":labelId" element={<LabelDetailPage />} />
						</Route>
						<Route path="faq" element={<FAQPage />} />
						<Route path="updates" element={<UpdatesPage />} />
						{/* <Route path="profile" element={<ProfilePage />} /> */}
						<Route path="settings" element={<SettingsPage />} />
						<Route path="sign-out" element={<SignOutPage />} />
						<Route path="register">
							<Route index element={<Registration />} />
							<Route path="artist" element={<ArtistRegistration />} />
							<Route path="label" element={<LabelRegistration />} />
							<Route path="user" element={<UserRegistration />} />
							{/* Define other nested routes */}
						</Route>
						<Route path="test" element={<Test />} />
						<Route path="*" element={<NotFound />} />
						{/* Define other nested routes */}
					</Route>
					<Route path="profile" element={<DashboardLayout />}>
						<Route index element={<ArtistDashboardHome />} />
						<Route path="user" element={<ArtistDashboardHome />} />
						<Route path="releases" element={<ArtistDashboardReleases />} />
						<Route path="requests" element={<ArtistDashboardHome />} />
						<Route path="analytics" element={<ArtistDashboardHome />} />
						<Route path="settings" element={<SettingsPage />} />
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</Router>
		</UserContext.Provider>
	);
};

export default App;
