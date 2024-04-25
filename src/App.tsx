import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import PageContainer from './components/PageContainer';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import FAQPage from './pages/faq/FAQPage';
import ReleasesPage from './pages/releases/ReleasesPage';
import ArtistsPage from './pages/artists/ArtistsPage';
import LabelsPage from "./pages/labels/LabelsPage";
import UpdatesPage from "./pages/updates/UpdatesPage";
import ProfilePage from './pages/profile/ProfilePage';
import SettingsPage from './pages/profile/SettingsPage';
import SignOutPage from './pages/profile/SignOutPage';
import ArtistDetailPage from './pages/artists/ArtistDetailPage';
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
          <Route path="labels" element={<LabelsPage />} />
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
}

export default App;
