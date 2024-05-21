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
import ArtistRegistration from "@/pages/account/register/ArtistRegistration";
import LabelRegistration from "@/pages/account/register/LabelRegistration";
import React from "react";
import Registration from "@/pages/account/register/Registration";
import UserRegistration from "@/pages/account/register/UserRegistration";
import { DashboardContainer } from "@/pages/dashboard/DashboardContainer";
import { DashboardHome } from "@/pages/dashboard/shared/DashboardHome";
import DashboardReleases from "@/pages/dashboard/shared/DashboardReleases";
import { ArtistDashboardRequests } from "@/pages/dashboard/artist/ArtistDashboardRequests";
import { ArtistDashboardAnalytics } from "@/pages/dashboard/artist/ArtistDashboardAnalytics";
import { ArtistDashboardSettings } from "@/pages/dashboard/artist/ArtistDashboardSettings";
import { LoginPage } from "@/pages/account/login/LoginPage";
import { AuthProvider } from "@/auth/AuthProvider";
import { Toaster } from "react-hot-toast";
import { ArtistAddRelease } from "@/pages/dashboard/forms/ArtistAddRelease";
import { ReleaseDetails } from "@/pages/releases/ReleaseDetails";
import { DashboardArtists } from "./pages/dashboard/label/DashboardArtists";
import { LabelAddRelease } from "./pages/dashboard/forms/LabelAddRelease";
import { LabelAddArtist } from "./pages/dashboard/forms/LabelAddArtist";
import { DashboardUser } from "./pages/dashboard/shared/DashboardUser";
import { EditUserObjectDetails } from "./pages/dashboard/forms/EditUserObjectDetails";
// Import other pages

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
	return (
		<AuthProvider>
			<Toaster position="top-center" reverseOrder={false} />
			<Router>
				<Routes>
					<Route path="/" element={<Layout />}>
						{/* Index route for the default path within the layout */}
						<Route index element={<HomePage />} />
						<Route path="releases">
							<Route index element={<ReleasesPage />} />
							<Route path=":releaseId" element={<ReleaseDetails />} />
						</Route>
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
						<Route path="settings" element={<SettingsPage />} />
						<Route path="sign-out" element={<SignOutPage />} />
						<Route path="login" element={<LoginPage />} />
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
						<Route index element={<DashboardHome />} />
						<Route path="user">
							<Route index element={<DashboardUser />} />
							<Route path="editObject" element={<EditUserObjectDetails />} />
						</Route>
						<Route path="artists">
							<Route index element={<DashboardArtists />} />
							<Route path="addArtist" element={<LabelAddArtist />} />
						</Route>
						<Route path="releases">
							<Route index element={<DashboardReleases />} />
							<Route path="addAsArtist" element={<ArtistAddRelease />} />
							<Route path="addAsLabel" element={<LabelAddRelease />} />
						</Route>
						<Route path="requests" element={<ArtistDashboardRequests />} />
						<Route path="analytics" element={<ArtistDashboardAnalytics />} />
						<Route path="settings" element={<ArtistDashboardSettings />} />
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</Router>
		</AuthProvider>
	);
};

export default App;
