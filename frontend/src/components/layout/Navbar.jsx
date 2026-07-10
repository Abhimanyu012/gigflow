import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  User,
  LogOut,
  Plus,
  Briefcase,
  Search,
  LayoutDashboard,
  Gavel,
  HelpCircle,
  Menu,
  X,
  Home,
  ChevronUp,
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

  const userInitial = user?.name?.charAt(0).toUpperCase();

  /* ── Tab item for the floating nav ── */
  const NavTab = ({ to, icon: Icon, label, isActive, onClick }) => {
    const Tag = onClick ? 'button' : Link;
    const extraProps = onClick ? { onClick } : { to };
    return (
      <Tag
        {...extraProps}
        className={`
          relative flex flex-col sm:flex-row items-center justify-center
          gap-1 sm:gap-1.5
          px-3 sm:px-4 py-2 sm:py-2
          min-w-[52px] sm:min-w-0
          rounded-xl transition-all duration-200 ease-in-out
          text-[10px] sm:text-xs font-semibold
          ${isActive
            ? 'bg-brand-emerald/15 text-brand-emerald'
            : 'text-matte-stone/40 hover:text-matte-stone/75 hover:bg-white/5'
          }
        `}
      >
        <Icon className={`w-5 h-5 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'stroke-[2.2px]' : 'stroke-[1.8px]'}`} />
        <span className="leading-none whitespace-nowrap">{label}</span>
        {/* Active dot */}
        {isActive && (
          <span className="absolute -top-px left-1/2 -translate-x-1/2 w-5 h-[2px] rounded-full bg-brand-emerald sm:hidden" />
        )}
      </Tag>
    );
  };

  /* ── FAB (center create button) ── */
  const FabButton = () => (
    <Link
      to="/gigs/create"
      aria-label="Post a new gig"
      className="
        w-11 h-11 sm:w-10 sm:h-10
        rounded-full btn-glass-primary
        flex items-center justify-center
        shadow-[0_4px_20px_rgba(15,76,58,0.45)]
        active:scale-95 transition-all duration-150
        mx-1 sm:mx-2
      "
    >
      <Plus className="w-5 h-5 sm:w-4 sm:h-4" />
    </Link>
  );

  return (
    <>
      {/* ════════════════════════════════════════════════
          FLOATING BOTTOM NAV — all screen sizes
          ════════════════════════════════════════════════ */}
      <nav
        aria-label="Main navigation"
        className="
          fixed bottom-4 left-1/2 -translate-x-1/2 z-50
          flex items-center
          bg-matte-charcoal/90 backdrop-blur-2xl
          border border-matte-divider
          rounded-2xl
          shadow-[0_8px_40px_rgba(0,0,0,0.55),0_1px_0_rgba(255,255,255,0.04)_inset]
          px-2 py-1.5
          gap-1

          /* Full-width on small screens, auto width on sm+ */
          w-[calc(100%-2rem)] sm:w-auto

          /* Ensure it doesn't overflow page content (safe-area) */
          mb-[env(safe-area-inset-bottom)]
        "
      >
        {/* Home */}
        <NavTab
          to="/"
          icon={Home}
          label="Home"
          isActive={isActiveRoute('/') && location.pathname === '/'}
        />

        {/* Browse */}
        <NavTab
          to="/gigs"
          icon={Search}
          label="Browse"
          isActive={isActiveRoute('/gigs') && !location.pathname.includes('my-gigs')}
        />

        {isAuthenticated ? (
          <>
            {/* FAB — Post Gig */}
            <FabButton />

            {/* Dashboard */}
            <NavTab
              to="/dashboard"
              icon={LayoutDashboard}
              label="Dash"
              isActive={isActiveRoute('/dashboard')}
            />

            {/* More (opens drawer) */}
            <NavTab
              icon={Menu}
              label="More"
              isActive={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            />
          </>
        ) : (
          <>
            {/* Divider */}
            <span className="w-px h-6 bg-matte-divider mx-1" />

            {/* Log in */}
            <Link
              to="/login"
              className="px-3 py-2 text-xs font-semibold text-matte-stone/50 hover:text-matte-bone transition-colors rounded-xl hover:bg-white/5"
            >
              Log in
            </Link>

            {/* Get Started — glass pill */}
            <Link
              to="/register"
              className="
                inline-flex items-center gap-1.5
                px-4 py-2 rounded-xl
                btn-glass-primary
                text-xs font-semibold
                min-h-[36px]
                transition-all duration-200
              "
            >
              Get Started
            </Link>
          </>
        )}
      </nav>

      {/* ════════════════════════════════════════════════
          "MORE" DRAWER (authenticated users)
          ════════════════════════════════════════════════ */}
      {isOpen && isAuthenticated && (
        <div className="fixed inset-0 z-[60] flex flex-col justify-end">
          {/* Scrim */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
          />

          {/* Sheet */}
          <div className="relative bg-matte-surface border-t border-matte-divider rounded-t-2xl shadow-[0_-20px_60px_rgba(0,0,0,0.55)] max-h-[80vh] overflow-y-auto animate-slide-up pb-28">
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-matte-divider rounded-full" />
            </div>

            {/* Header */}
            <div className="px-6 pb-3 flex justify-between items-center">
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

            {/* Links */}
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
                  className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-medium transition-colors ${
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

            {/* Sign out */}
            <div className="border-t border-matte-divider mx-4 mt-4 pt-3">
              <button
                id="mobile-drawer-logout"
                onClick={() => { setIsOpen(false); handleLogout(); }}
                className="flex items-center gap-3.5 w-full px-4 py-3.5 text-red-400 hover:bg-red-950/30 rounded-xl transition-colors text-sm font-medium"
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
