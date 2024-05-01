import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import PageContainer from "./components/PageContainer";
import HomePage from "./Pages/HomePage";
import NotFound from "./Pages/NotFound";
import FAQPage from "./Pages/faq/FAQPage";
import ReleasesPage from "./Pages/releases/ReleasesPage";
import ArtistsPage from "./Pages/artists/ArtistsPage";
import LabelsPage from "./Pages/labels/LabelsPage";
import UpdatesPage from "./Pages/updates/UpdatesPage";
import ProfilePage from "./Pages/profile/ProfilePage";
import SettingsPage from "./Pages/profile/SettingsPage";
import SignOutPage from "./Pages/profile/SignOutPage";
import ArtistDetailPage from "./Pages/artists/artistDetail/ArtistDetailPage";
import LabelDetailPage from "./Pages/labels/labelDetails/LabelDetailPage";
// Import other pages

const Layout: React.FC = () => (
	<PageContainer>
		<Outlet /> {/* Placeholder for nested routes */}
	</PageContainer>
);

const App: React.FC = () => {
	return (
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
					<Route path="profile" element={<ProfilePage />} />
					<Route path="settings" element={<SettingsPage />} />
					<Route path="sign-out" element={<SignOutPage />} />
					<Route path="*" element={<NotFound />} />
					{/* Define other nested routes */}
				</Route>
			</Routes>
		</Router>
	);
};

export default App;
