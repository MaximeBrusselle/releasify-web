import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import PageContainer from "@/components/PageContainer";
import HomePage from "@/pages/HomePage";
import NotFound from "@/pages/NotFound";
import FAQPage from "@/pages/faq/FAQPage";
import ReleasesPage from "@/pages/releases/ReleasesPage";
import ArtistsPage from "@/pages/artists/ArtistsPage";
import LabelsPage from "@/pages/labels/LabelsPage";
import UpdatesPage from "@/pages/updates/UpdatesPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import SettingsPage from "@/pages/profile/SettingsPage";
import SignOutPage from "@/pages/profile/SignOutPage";
import ArtistDetailPage from "@/pages/artists/artistDetail/ArtistDetailPage";
import LabelDetailPage from "@/pages/labels/labelDetails/LabelDetailPage";
import Test from "@/pages/Test";
import ArtistRegistration from "@/pages/registration/ArtistRegistration";
import LabelRegistration from "@/pages/registration/LabelRegistration";
import { useState } from "react";
import Registration from "@/pages/registration/Registration";
import UserRegistration from "./pages/registration/UserRegistration";
// Import other pages

interface LayoutProps {
	isLoggedIn: boolean;
	handleLogin: () => void;
	handleLogout: () => void;
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
	const { isLoggedIn, handleLogin, handleLogout } = props;
	return (
		<PageContainer isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout}>
			<Outlet /> {/* Placeholder for nested routes */}
		</PageContainer>
	);
};

const App: React.FC = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const handleLogin = () => setIsLoggedIn(true);
	const handleLogout = () => setIsLoggedIn(false);
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />}>
					{/* Index route for the default path within the layout */}
					<Route index element={<HomePage handleLogin={handleLogin} handleLogout={handleLogout} />} />
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
					<Route path="profile" element={<ProfilePage />} />
					<Route path="settings" element={<SettingsPage />} />
					<Route path="sign-out" element={<SignOutPage />} />
					<Route path="register">
						<Route index element={<Registration />} />
						<Route path="artist" element={<ArtistRegistration handleLogin={handleLogin} />} />
						<Route path="label" element={<LabelRegistration handleLogin={handleLogin} />} />
						<Route path="user" element={<UserRegistration handleLogin={handleLogin} />} />
						{/* Define other nested routes */}
					</Route>
					<Route path="test" element={<Test />} />
					<Route path="*" element={<NotFound />} />
					{/* Define other nested routes */}
				</Route>
			</Routes>
		</Router>
	);
};

export default App;
