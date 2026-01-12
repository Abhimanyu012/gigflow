import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Plus, 
  Briefcase, 
  Search, 
  LayoutDashboard,
  ChevronDown,
  Gavel,
  Settings,
  HelpCircle
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { logout } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error(error || 'Logout failed');
    }
  };

  const isActiveRoute = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const NavLink = ({ to, children, icon: Icon }) => (
    <Link
      to={to}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        isActiveRoute(to)
          ? 'bg-indigo-50 text-indigo-600'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </Link>
  );

  return (
    <nav className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-linear-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                GigFlow
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/" icon={null}>Home</NavLink>
            <NavLink to="/gigs" icon={Search}>Browse Gigs</NavLink>

            {isAuthenticated && (
              <>
                <div className="w-px h-6 bg-gray-200 mx-2" />
                <NavLink to="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
                <NavLink to="/my-gigs" icon={Briefcase}>My Gigs</NavLink>
                <NavLink to="/my-bids" icon={Gavel}>My Bids</NavLink>
              </>
            )}
          </div>

          {/* Right Side - Auth & Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Post Gig CTA Button */}
                <Link
                  to="/gigs/create"
                  className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  Post a Gig
                </Link>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isProfileOpen 
                        ? 'bg-gray-100' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-8 h-8 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center ring-2 ring-white shadow-sm">
                      <span className="text-white text-sm font-semibold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-700 max-w-25 truncate">
                      {user?.name?.split(' ')[0]}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-gray-400" />
                          Dashboard
                        </Link>
                        <Link
                          to="/my-gigs"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Briefcase className="w-4 h-4 text-gray-400" />
                          My Gigs
                        </Link>
                        <Link
                          to="/my-bids"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Gavel className="w-4 h-4 text-gray-400" />
                          My Bids
                        </Link>
                      </div>

                      <div className="border-t border-gray-100 py-2">
                        <Link
                          to="/help"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <HelpCircle className="w-4 h-4 text-gray-400" />
                          Help & Support
                        </Link>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-gray-100 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {isAuthenticated && (
              <Link
                to="/gigs/create"
                className="p-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-lg"
              >
                <Plus className="w-5 h-5" />
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-150 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {/* Main Nav Links */}
          <Link
            to="/"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              isActiveRoute('/') && location.pathname === '/'
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span className="font-medium">Home</span>
          </Link>
          <Link
            to="/gigs"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              isActiveRoute('/gigs') && !location.pathname.includes('my-gigs')
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Search className="w-5 h-5" />
            <span className="font-medium">Browse Gigs</span>
          </Link>

          {isAuthenticated ? (
            <>
              <div className="py-2">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-2">
                  My Workspace
                </div>
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActiveRoute('/dashboard')
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span className="font-medium">Dashboard</span>
                </Link>
                <Link
                  to="/my-gigs"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActiveRoute('/my-gigs')
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Briefcase className="w-5 h-5" />
                  <span className="font-medium">My Gigs</span>
                </Link>
                <Link
                  to="/my-bids"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActiveRoute('/my-bids')
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Gavel className="w-5 h-5" />
                  <span className="font-medium">My Bids</span>
                </Link>
              </div>

              {/* User Section */}
              <div className="border-t border-gray-100 pt-4 mt-2">
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl mb-3">
                  <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg font-semibold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{user?.name}</p>
                    <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                  </div>
                </div>

                <Link
                  to="/help"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <HelpCircle className="w-5 h-5" />
                  <span className="font-medium">Help & Support</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-1"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign out</span>
                </button>
              </div>
            </>
          ) : (
            <div className="border-t border-gray-100 pt-4 mt-4 space-y-2">
              <Link
                to="/login"
                className="block w-full px-4 py-3 text-center text-gray-700 font-medium hover:bg-gray-50 rounded-xl transition-colors border border-gray-200"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="block w-full px-4 py-3 text-center bg-linear-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25"
              >
                Get Started — It's Free
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
