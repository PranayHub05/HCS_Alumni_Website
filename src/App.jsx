import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Layout from './components/layout/Layout';
import AdminLayout from './pages/admin/AdminLayout';

/* ── Public Pages (lazy loaded) ── */
import { lazy, Suspense } from 'react';
import LoadingSpinner from './components/ui/LoadingSpinner';

const HomePage = lazy(() => import('./pages/public/HomePage'));
const AboutPage = lazy(() => import('./pages/public/AboutPage'));
const GalleryPage = lazy(() => import('./pages/public/GalleryPage'));
const MembersPage = lazy(() => import('./pages/public/MembersPage'));
const AnnouncementsPage = lazy(() => import('./pages/public/AnnouncementsPage'));
const TasksPage = lazy(() => import('./pages/public/TasksPage'));
const ContactPage = lazy(() => import('./pages/public/ContactPage'));
const MembershipPage = lazy(() => import('./pages/public/MembershipPage'));
const PrivacyPage = lazy(() => import('./pages/public/PrivacyPage'));

/* ── Admin Pages (lazy loaded) ── */
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ManageLeadership = lazy(() => import('./pages/admin/ManageLeadership'));
const ManageAlumni = lazy(() => import('./pages/admin/ManageAlumni'));
const ManageTeachers = lazy(() => import('./pages/admin/ManageTeachers'));
const ManageAnnouncements = lazy(() => import('./pages/admin/ManageAnnouncements'));
const ManageTasks = lazy(() => import('./pages/admin/ManageTasks'));
const ManageQuotes = lazy(() => import('./pages/admin/ManageQuotes'));
const ManageContact = lazy(() => import('./pages/admin/ManageContact'));
const ManageHistory = lazy(() => import('./pages/admin/ManageHistory'));
const ManageMembers = lazy(() => import('./pages/admin/ManageMembers'));
const ManageHomepage = lazy(() => import('./pages/admin/ManageHomepage'));

/* ── 404 Page ── */
function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-hero)', color: 'var(--color-primary)' }}>
        404
      </h1>
      <p style={{ fontSize: 'var(--fs-body-lg)', color: 'var(--color-muted-text)', marginTop: '1rem' }}>
        The page you are looking for does not exist.
      </p>
      <a
        href="/"
        style={{
          marginTop: '2rem',
          padding: '12px 32px',
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          borderRadius: 'var(--radius-md)',
          textDecoration: 'none',
          fontWeight: 600,
        }}
      >
        Return Home
      </a>
    </div>
  );
}

/* ── Suspense Fallback ── */
function PageLoader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <LoadingSpinner size="lg" text="Loading..." />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* ── Public Routes ── */}
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/members" element={<MembersPage />} />
                <Route path="/announcements" element={<AnnouncementsPage />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/membership" element={<MembershipPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* ── Admin Routes ── */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="leadership" element={<ManageLeadership />} />
                <Route path="alumni" element={<ManageAlumni />} />
                <Route path="teachers" element={<ManageTeachers />} />
                <Route path="announcements" element={<ManageAnnouncements />} />
                <Route path="tasks" element={<ManageTasks />} />
                <Route path="quotes" element={<ManageQuotes />} />
                <Route path="contact" element={<ManageContact />} />
                <Route path="history" element={<ManageHistory />} />
                <Route path="members" element={<ManageMembers />} />
                <Route path="homepage" element={<ManageHomepage />} />
              </Route>
            </Routes>
          </Suspense>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
