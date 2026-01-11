import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { getMe } from './store/slices/authSlice';
import { Layout, ProtectedRoute } from './components/layout';
import { LoadingScreen } from './components/ui';
import {
  Home,
  Dashboard,
  Login,
  Register,
  GigList,
  GigDetails,
  CreateGig,
  MyGigs,
  MyBids,
} from './pages';

function App() {
  const dispatch = useDispatch();
  const { isLoading, token } = useSelector((state) => state.auth);

  useEffect(() => {
    // Only check if user is authenticated when there's a token
    if (token) {
      dispatch(getMe());
    }
  }, [dispatch, token]);

  // Only show loading when there's a token and we're verifying it
  if (token && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '10px',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="gigs" element={<GigList />} />
          <Route path="gigs/:id" element={<GigDetails />} />

          {/* Protected Routes */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="gigs/create"
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <CreateGig />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-gigs"
            element={
              <ProtectedRoute>
                <MyGigs />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-bids"
            element={
              <ProtectedRoute allowedRoles={['freelancer']}>
                <MyBids />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
