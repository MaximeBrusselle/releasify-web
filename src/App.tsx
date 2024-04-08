import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import PageContainer from './components/PageContainer';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import AboutPage from './pages/AboutPage';
import OverviewPage from './pages/OverviewPage';
import CalendarPage from './pages/CalendarPage';
import ProfilePage from './pages/profile/ProfilePage';
import SettingsPage from './pages/profile/SettingsPage';
import SignOutPage from './pages/profile/SignOutPage';
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
          <Route path="about" element={<AboutPage />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="calendar" element={<CalendarPage />} />
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
