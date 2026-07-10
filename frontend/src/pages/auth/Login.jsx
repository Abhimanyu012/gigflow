import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../store/slices/authSlice';
import { Button, Input } from '../../components/ui';
import { AlertTriangle, ArrowRight, Briefcase, Shield, Zap } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate('/dashboard');
    } catch (err) {
      setError(err?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left brand panel ── */}
      <div className="hidden md:flex w-[45%] bg-matte-ink relative overflow-hidden flex-col">
        {/* Emerald left-edge stripe */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-emerald" />

        {/* Faint grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,transparent,transparent 39px,#faf9f6 39px,#faf9f6 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#faf9f6 39px,#faf9f6 40px)',
          }}
        />

        {/* Emerald ambient glow */}
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-emerald/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col h-full p-12">
          {/* Logo */}
          <Link to="/" className="block">
            <span className="text-xl font-display font-extrabold text-matte-bone tracking-tight">
              Gig<span className="text-brand-emerald">Flow</span>
            </span>
          </Link>

          {/* Center copy */}
          <div className="flex-1 flex flex-col justify-center max-w-sm">
            <p className="text-xs font-sans font-semibold uppercase tracking-widest text-brand-emerald mb-4">
              Welcome back
            </p>
            <h1 className="text-4xl font-display font-extrabold text-matte-bone leading-tight mb-4">
              Your work,<br />your terms.
            </h1>
            <p className="text-sm text-matte-stone/45 leading-relaxed mb-10">
              The premier marketplace connecting skilled freelancers with clients who value quality.
            </p>

            <ul className="space-y-4">
              {[
                { icon: Briefcase, text: 'Post gigs and receive competitive bids' },
                { icon: Shield, text: 'Secure, transparent transactions' },
                { icon: Zap, text: 'Hire in hours, not weeks' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md border border-brand-emerald/20 bg-brand-emerald/8 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-brand-emerald" />
                  </div>
                  <span className="text-sm text-matte-stone/50">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom caption */}
          <p className="text-[11px] text-matte-stone/20 font-medium">
            © {new Date().getFullYear()} GigFlow
          </p>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex items-center justify-center bg-matte-charcoal px-8 py-12">
        <div className="w-full max-w-sm space-y-7">
          {/* Mobile logo */}
          <div className="md:hidden">
            <Link to="/">
              <span className="text-xl font-display font-extrabold text-matte-bone">
                Gig<span className="text-brand-emerald">Flow</span>
              </span>
            </Link>
          </div>

          <div>
            <h2 className="text-2xl font-display font-extrabold text-matte-bone tracking-tight">
              Log in to your account
            </h2>
            <p className="text-sm text-matte-stone/40 mt-1">
              Don't have one?{' '}
              <Link to="/register" className="text-brand-emerald hover:underline font-medium">
                Sign up free
              </Link>
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2.5 text-sm text-red-400 bg-red-900/15 border border-red-800/30 px-3.5 py-3 rounded-md">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="login-email"
              type="email"
              label="Email address"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <Input
              id="login-password"
              type="password"
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <div className="pt-1">
              <Button
                id="login-submit-btn"
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
              >
                Log In
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
