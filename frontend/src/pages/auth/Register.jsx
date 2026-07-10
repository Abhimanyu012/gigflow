import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../store/slices/authSlice';
import { Button, Input } from '../../components/ui';
import { AlertTriangle, ArrowRight, Users, TrendingUp, Award } from 'lucide-react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register({ email, password, name })).unwrap();
      navigate('/dashboard');
    } catch (err) {
      setError(err?.message || 'Registration failed');
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
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-brand-emerald/8 rounded-full blur-3xl" />

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
              Join the platform
            </p>
            <h1 className="text-4xl font-display font-extrabold text-matte-bone leading-tight mb-4">
              Where talent<br />meets opportunity.
            </h1>
            <p className="text-sm text-matte-stone/45 leading-relaxed mb-10">
              Join thousands of freelancers and clients building great things together.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Users, value: '10K+', label: 'Freelancers' },
                { icon: Award, value: '5K+', label: 'Projects' },
                { icon: TrendingUp, value: '99%', label: 'Satisfaction' },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="bg-matte-charcoal/50 rounded-xl border border-matte-divider p-3 text-center">
                  <Icon className="w-4 h-4 text-brand-emerald mx-auto mb-1.5" />
                  <p className="text-base font-mono font-semibold text-brass"
                    style={{ color: 'var(--color-brass)' }}>
                    {value}
                  </p>
                  <p className="text-[10px] text-matte-stone/35 uppercase tracking-wider font-semibold mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </div>
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
              Create your account
            </h2>
            <p className="text-sm text-matte-stone/40 mt-1">
              Already have one?{' '}
              <Link to="/login" className="text-brand-emerald hover:underline font-medium">
                Log in
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
              id="register-name"
              type="text"
              label="Full name"
              placeholder="Jane Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
            <Input
              id="register-email"
              type="email"
              label="Email address"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <Input
              id="register-password"
              type="password"
              label="Password"
              placeholder="Choose a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            <div className="pt-1">
              <Button
                id="register-submit-btn"
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
              >
                Create Account
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>

          <p className="text-[11px] text-matte-stone/25 text-center">
            By creating an account you agree to our{' '}
            <Link to="/terms" className="hover:text-matte-stone/50 underline">Terms</Link>
            {' '}and{' '}
            <Link to="/privacy" className="hover:text-matte-stone/50 underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
