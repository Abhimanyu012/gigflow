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
  const [activeRect, setActiveRect] = useState({ left: 0, width: 0, opacity: 0 });
  const profileRef = useRef(null);
  const tabsRef = useRef({});
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

  // Track active tab rect for liquid indicator
  useEffect(() => {
    const updateActiveIndicator = () => {
      let activeKey = null;
      if (location.pathname === '/') {
        activeKey = 'home';
      } else if (location.pathname.startsWith('/gigs') && !location.pathname.includes('my-gigs') && !location.pathname.includes('/create')) {
        activeKey = 'browse';
      } else if (location.pathname.startsWith('/dashboard')) {
        activeKey = 'dash';
      } else if (isOpen || location.pathname.startsWith('/my-gigs') || location.pathname.startsWith('/my-bids') || location.pathname.startsWith('/help')) {
        activeKey = 'more';
      } else if (location.pathname.startsWith('/login')) {
        activeKey = 'login';
      } else if (location.pathname.startsWith('/register')) {
        activeKey = 'register';
      }

      const activeEl = tabsRef.current[activeKey];
      if (activeEl) {
        setActiveRect({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
          opacity: 1,
        });
      } else {
        setActiveRect((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    updateActiveIndicator();
    const frameId = requestAnimationFrame(updateActiveIndicator);
    
    // Add small delay to ensure DOM layout is updated
    const timeoutId = setTimeout(updateActiveIndicator, 50);

    window.addEventListener('resize', updateActiveIndicator);
    return () => {
      window.removeEventListener('resize', updateActiveIndicator);
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
    };
  }, [location.pathname, isOpen, isAuthenticated]);

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
  const NavTab = ({ to, icon: Icon, label, isActive, onClick, tabKey }) => {
    const Tag = onClick ? 'button' : Link;
    const extraProps = onClick ? { onClick } : { to };
    return (
      <Tag
        {...extraProps}
        ref={(el) => {
          if (el) tabsRef.current[tabKey] = el;
        }}
        className={`
          relative flex items-center justify-center
          gap-2
          px-3 sm:px-4 py-3 sm:py-2.5
          flex-1 sm:flex-initial sm:min-w-[100px]
          rounded-xl sm:rounded-full transition-all duration-300 ease-in-out
          text-xs font-semibold z-10
          ${isActive
            ? 'text-brand-emerald font-bold'
            : 'text-matte-stone/40 hover:text-matte-stone/80'
          }
        `}
      >
        <Icon className={`w-5 h-5 sm:w-4 sm:h-4 shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
        <span className="hidden sm:inline-block leading-none whitespace-nowrap">{label}</span>
      </Tag>
    );
  };

  /* ── FAB (center create button) ── */
  const FabButton = () => (
    <Link
      to="/gigs/create"
      aria-label="Post a new gig"
      className="
        w-10 h-10 sm:w-12 sm:h-12
        rounded-full btn-glass-primary
        flex items-center justify-center
        shadow-[0_4px_24px_rgba(15,76,58,0.45)]
        hover:scale-105 active:scale-95 transition-all duration-300
        mx-1 sm:mx-2 z-10 shrink-0
      "
    >
      <Plus className="w-5 h-5 sm:w-5 sm:h-5" />
    </Link>
  );

  return (
    <>
      {/* ════════════════════════════════════════════════
          FLOATING BOTTOM NAV — Breathable Capsule Shape
          ════════════════════════════════════════════════ */}
      <nav
        aria-label="Main navigation"
        className="
          fixed bottom-6 left-1/2 -translate-x-1/2 z-50
          flex items-center justify-between sm:justify-start
          bg-matte-charcoal/85 backdrop-blur-3xl
          border border-white/5
          rounded-2xl sm:rounded-full
          shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.06),0_8px_16px_-8px_rgba(15,76,58,0.3)]
          px-2 py-1.5 sm:px-2.5 sm:py-2
          gap-1
          w-[calc(100%-2rem)] sm:w-auto
          mb-[env(safe-area-inset-bottom)]
          transition-all duration-300
        "
      >
        {/* Liquid Active Indicator backdrop pill */}
        <div
          className="absolute top-[8px] bottom-[8px] rounded-xl sm:rounded-full bg-brand-emerald/12 border border-brand-emerald/20 pointer-events-none liquid-pill-indicator z-0"
          style={{
            left: `${activeRect.left}px`,
            width: `${activeRect.width}px`,
            opacity: activeRect.opacity,
          }}
        />

        {/* Home */}
        <NavTab
          to="/"
          icon={Home}
          label="Home"
          tabKey="home"
          isActive={isActiveRoute('/') && location.pathname === '/'}
        />

        {/* Browse */}
        <NavTab
          to="/gigs"
          icon={Search}
          label="Browse"
          tabKey="browse"
          isActive={isActiveRoute('/gigs') && !location.pathname.includes('my-gigs') && !location.pathname.includes('/create')}
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
              tabKey="dash"
              isActive={isActiveRoute('/dashboard')}
            />

            {/* More (opens drawer) */}
            <NavTab
              icon={Menu}
              label="More"
              tabKey="more"
              isActive={isOpen || location.pathname.includes('my-gigs') || location.pathname.includes('my-bids') || location.pathname.includes('help')}
              onClick={() => setIsOpen(!isOpen)}
            />
          </>
        ) : (
          <>
            {/* Divider */}
            <span className="w-px h-6 bg-matte-divider mx-1 sm:mx-1.5 self-center shrink-0" />

            {/* Log in */}
            <Link
              to="/login"
              ref={(el) => {
                if (el) tabsRef.current['login'] = el;
              }}
              className={`
                px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-semibold transition-all duration-300 rounded-xl sm:rounded-full z-10 shrink-0
                ${isActiveRoute('/login')
                  ? 'text-brand-emerald font-bold'
                  : 'text-matte-stone/40 hover:text-matte-stone/80 hover:bg-white/5'
                }
              `}
            >
              Log in
            </Link>

            {/* Get Started — glass pill */}
            <Link
              to="/register"
              ref={(el) => {
                if (el) tabsRef.current['register'] = el;
              }}
              className="
                inline-flex items-center justify-center
                px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-full
                btn-glass-primary
                text-xs font-semibold
                min-h-[32px] sm:min-h-[36px]
                transition-all duration-300 z-10 shrink-0
              "
            >
              <span className="hidden sm:inline-block">Get Started</span>
              <span className="inline-block sm:hidden">Join</span>
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
