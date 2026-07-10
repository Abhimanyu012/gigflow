import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  User,
  LogOut,
  Plus,
  Briefcase,
  Search,
  LayoutDashboard,
  ChevronDown,
  Gavel,
  HelpCircle,
  Menu,
  X,
  Home,
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // Desktop nav link — active = thin emerald underline rule
  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className={`relative px-1 py-1 text-sm font-sans font-medium tracking-wide transition-colors duration-200 group ${
        isActiveRoute(to)
          ? 'text-matte-bone'
          : 'text-matte-stone/45 hover:text-matte-stone/85'
      }`}
    >
      {children}
      <span
        className={`absolute -bottom-[1px] left-0 h-[1.5px] bg-brand-emerald transition-all duration-200 ${
          isActiveRoute(to) ? 'w-full' : 'w-0 group-hover:w-full opacity-0 group-hover:opacity-50'
        }`}
      />
    </Link>
  );

  const userInitial = user?.name?.charAt(0).toUpperCase();

  return (
    <>
      {/* ─── Desktop Navbar ─── */}
      <nav className="hidden md:block bg-matte-charcoal border-b border-matte-divider sticky top-0 z-50">
        {/* Subtle top accent line */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-brand-emerald/40 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-[68px]">

            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <span className="text-[1.2rem] font-display font-extrabold text-matte-bone tracking-tight">
                Gig<span className="text-brand-emerald">Flow</span>
              </span>
            </Link>

            {/* Center nav — absolute-positioned for true centering */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-7">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/gigs">Browse Gigs</NavLink>
              {isAuthenticated && (
                <>
                  <span className="w-px h-3.5 bg-matte-divider" />
                  <NavLink to="/dashboard">Dashboard</NavLink>
                  <NavLink to="/my-gigs">My Gigs</NavLink>
                  <NavLink to="/my-bids">My Bids</NavLink>
                </>
              )}
            </div>

            {/* Right — auth actions */}
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  {/* Post Gig — liquid glass CTA */}
                  <Link
                    to="/gigs/create"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 btn-glass-primary text-sm font-sans font-semibold rounded-md min-h-[40px] transition-all duration-200"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Post a Gig
                  </Link>

                  {/* Profile dropdown */}
                  <div className="relative" ref={profileRef}>
                    <button
                      id="navbar-profile-btn"
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center gap-2 pl-1 pr-2 py-1.5 rounded-md hover:bg-matte-surface transition-colors duration-200"
                    >
                      <div className="w-7 h-7 bg-brand-emerald rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{userInitial}</span>
                      </div>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-matte-stone/35 transition-transform duration-200 ${
                          isProfileOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Dropdown */}
                    {isProfileOpen && (
                      <div className="absolute right-0 top-full mt-2 w-60 bg-matte-surface border border-matte-divider rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-1.5 z-50 animate-slide-down">
                        <div className="px-3.5 py-3 border-b border-matte-divider mb-1">
                          <p className="text-sm font-display font-semibold text-matte-bone">{user?.name}</p>
                          <p className="text-xs text-matte-stone/40 truncate mt-0.5">{user?.email}</p>
                        </div>
                        <div className="space-y-0.5">
                          {[
                            { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                            { to: '/my-gigs', icon: Briefcase, label: 'My Gigs' },
                            { to: '/my-bids', icon: Gavel, label: 'My Bids' },
                            { to: '/help', icon: HelpCircle, label: 'Help & Support' },
                          ].map(({ to, icon: Icon, label }) => (
                            <Link
                              key={to}
                              to={to}
                              className="flex items-center gap-3 px-3.5 py-2.5 text-sm text-matte-stone/60 hover:text-matte-bone hover:bg-matte-divider rounded-lg transition-colors"
                            >
                              <Icon className="w-4 h-4 text-matte-stone/30" />
                              {label}
                            </Link>
                          ))}
                        </div>
                        <div className="border-t border-matte-divider mt-1 pt-1">
                          <button
                            id="navbar-logout-btn"
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-3.5 py-2.5 text-sm text-red-400 hover:bg-red-950/30 rounded-lg transition-colors"
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
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="text-sm font-sans font-medium text-matte-stone/50 hover:text-matte-stone/85 transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center px-4 py-2.5 btn-glass-primary text-sm font-sans font-semibold rounded-md min-h-[40px] transition-all duration-200"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Top Bar ─── */}
      <header className="sticky top-0 z-40 bg-matte-charcoal/95 backdrop-blur-xl border-b border-matte-divider px-5 py-3.5 flex justify-between items-center md:hidden">
        <Link to="/" className="text-[1.1rem] font-display font-extrabold text-matte-bone tracking-tight">
          Gig<span className="text-brand-emerald">Flow</span>
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-2.5">
            <Link
              to="/gigs/create"
              className="w-9 h-9 btn-glass-primary rounded-full flex items-center justify-center"
              aria-label="Post a gig"
            >
              <Plus className="w-4 h-4" />
            </Link>
            <Link
              to="/dashboard"
              className="w-9 h-9 bg-brand-emerald rounded-full flex items-center justify-center"
              aria-label="Dashboard"
            >
              <span className="text-white text-xs font-bold">{userInitial}</span>
            </Link>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-3.5 py-1.5 border border-matte-divider text-matte-stone/60 text-xs font-sans font-semibold rounded-md hover:border-matte-stone/30 hover:text-matte-stone/85 transition-colors"
          >
            Log in
          </Link>
        )}
      </header>

      {/* ─── Mobile Bottom Navigation ─── */}
      <nav
        aria-label="Mobile navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-matte-charcoal/96 backdrop-blur-xl border-t border-matte-divider flex justify-around items-stretch py-1 pb-[max(0.25rem,env(safe-area-inset-bottom))] md:hidden"
      >
        {/* Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center flex-1 py-2 gap-1 min-h-[56px] transition-colors duration-200 ${
            isActiveRoute('/') && location.pathname === '/'
              ? 'text-brand-emerald'
              : 'text-matte-stone/35 hover:text-matte-stone/70'
          }`}
        >
          {/* Active indicator */}
          <span className={`absolute top-0 h-[2px] w-8 rounded-b bg-brand-emerald transition-all duration-200 ${
            isActiveRoute('/') && location.pathname === '/' ? 'opacity-100' : 'opacity-0'
          }`} />
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-sans font-semibold">Home</span>
        </Link>

        {/* Browse */}
        <Link
          to="/gigs"
          className={`flex flex-col items-center justify-center flex-1 py-2 gap-1 min-h-[56px] relative transition-colors duration-200 ${
            isActiveRoute('/gigs') && !location.pathname.includes('my-gigs')
              ? 'text-brand-emerald'
              : 'text-matte-stone/35 hover:text-matte-stone/70'
          }`}
        >
          <span className={`absolute top-0 h-[2px] w-8 rounded-b bg-brand-emerald transition-all duration-200 ${
            isActiveRoute('/gigs') && !location.pathname.includes('my-gigs') ? 'opacity-100' : 'opacity-0'
          }`} />
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-sans font-semibold">Browse</span>
        </Link>

        {isAuthenticated ? (
          <>
            {/* FAB center — elevated create button */}
            <div className="flex-1 flex justify-center items-center">
              <Link
                to="/gigs/create"
                aria-label="Post a new gig"
                className="w-12 h-12 rounded-full btn-glass-primary flex items-center justify-center shadow-[0_4px_16px_rgba(15,76,58,0.35)] active:scale-95 transition-transform duration-150 -translate-y-2"
              >
                <Plus className="w-5 h-5" />
              </Link>
            </div>

            {/* Dashboard */}
            <Link
              to="/dashboard"
              className={`flex flex-col items-center justify-center flex-1 py-2 gap-1 min-h-[56px] relative transition-colors duration-200 ${
                isActiveRoute('/dashboard') ? 'text-brand-emerald' : 'text-matte-stone/35 hover:text-matte-stone/70'
              }`}
            >
              <span className={`absolute top-0 h-[2px] w-8 rounded-b bg-brand-emerald transition-all duration-200 ${
                isActiveRoute('/dashboard') ? 'opacity-100' : 'opacity-0'
              }`} />
              <LayoutDashboard className="w-5 h-5" />
              <span className="text-[10px] font-sans font-semibold">Dashboard</span>
            </Link>

            {/* More drawer trigger */}
            <button
              id="mobile-more-btn"
              onClick={() => setIsOpen(!isOpen)}
              className={`flex flex-col items-center justify-center flex-1 py-2 gap-1 min-h-[56px] relative transition-colors duration-200 ${
                isOpen ? 'text-brand-emerald' : 'text-matte-stone/35 hover:text-matte-stone/70'
              }`}
            >
              <span className={`absolute top-0 h-[2px] w-8 rounded-b bg-brand-emerald transition-all duration-200 ${
                isOpen ? 'opacity-100' : 'opacity-0'
              }`} />
              <Menu className="w-5 h-5" />
              <span className="text-[10px] font-sans font-semibold">More</span>
            </button>
          </>
        ) : (
          <Link
            to="/register"
            className={`flex flex-col items-center justify-center flex-1 py-2 gap-1 min-h-[56px] relative transition-colors duration-200 ${
              isActiveRoute('/register') ? 'text-brand-emerald' : 'text-matte-stone/35 hover:text-matte-stone/70'
            }`}
          >
            <span className={`absolute top-0 h-[2px] w-8 rounded-b bg-brand-emerald transition-all duration-200 ${
              isActiveRoute('/register') ? 'opacity-100' : 'opacity-0'
            }`} />
            <User className="w-5 h-5" />
            <span className="text-[10px] font-sans font-semibold">Join</span>
          </Link>
        )}
      </nav>

      {/* ─── Mobile Drawer ─── */}
      {isOpen && isAuthenticated && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
          {/* Scrim */}
          <div
            className="fixed inset-0 bg-black/65 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          {/* Sheet */}
          <div className="relative bg-matte-surface border-t border-matte-divider rounded-t-2xl shadow-[0_-20px_60px_rgba(0,0,0,0.5)] pb-28 max-h-[75vh] overflow-y-auto animate-slide-up">
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-matte-divider rounded-full" />
            </div>

            <div className="px-6 pb-2 flex justify-between items-center">
              <span className="font-display font-bold text-base text-matte-bone tracking-tight">Workspace</span>
              <button
                id="mobile-drawer-close"
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-matte-divider rounded-lg text-matte-stone/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User pill */}
            <div className="mx-6 mb-5">
              <div className="flex items-center gap-3.5 p-4 bg-matte-charcoal rounded-xl border border-matte-divider">
                <div className="w-10 h-10 bg-brand-emerald rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">{userInitial}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-display font-semibold text-sm text-matte-bone truncate">{user?.name}</p>
                  <p className="text-xs text-matte-stone/38 truncate">{user?.email}</p>
                </div>
              </div>
            </div>

            <div className="px-4 space-y-1">
              {[
                { to: '/my-gigs', icon: Briefcase, label: 'My Gigs' },
                { to: '/my-bids', icon: Gavel, label: 'My Bids' },
                { to: '/help', icon: HelpCircle, label: 'Help & Support' },
              ].map(({ to, icon: Icon, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActiveRoute(to)
                      ? 'bg-brand-emerald/12 text-brand-emerald'
                      : 'text-matte-stone/60 hover:bg-matte-divider hover:text-matte-bone'
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" />
                  {label}
                </Link>
              ))}
            </div>

            <div className="border-t border-matte-divider mx-4 mt-4 pt-3">
              <button
                id="mobile-drawer-logout"
                onClick={() => { setIsOpen(false); handleLogout(); }}
                className="flex items-center gap-3.5 w-full px-4 py-3 text-red-400 hover:bg-red-950/30 rounded-xl transition-colors text-sm font-medium"
              >
                <LogOut className="w-4.5 h-4.5" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
