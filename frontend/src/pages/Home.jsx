import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Briefcase,
  Users,
  Zap,
  Shield,
  ArrowRight,
  Star,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { Button } from '../components/ui';

/* ── Step component ─────────────────────────────────── */
const Step = ({ number, title, description, isLast }) => (
  <div className="flex gap-5 md:gap-6">
    <div className="flex flex-col items-center">
      <div className="w-11 h-11 rounded-xl bg-matte-surface border border-matte-divider flex items-center justify-center shrink-0">
        <span className="font-mono font-semibold text-sm" style={{ color: 'var(--color-brass)' }}>
          {number}
        </span>
      </div>
      {!isLast && (
        <div className="w-px flex-1 mt-3 bg-gradient-to-b from-matte-divider to-transparent" />
      )}
    </div>
    <div className="pb-10">
      <h3 className="text-base font-display font-bold text-matte-bone mb-1.5">{title}</h3>
      <p className="text-sm text-matte-stone/45 leading-relaxed">{description}</p>
    </div>
  </div>
);

/* ── Testimonial card ───────────────────────────────── */
const TestimonialCard = ({ name, role, content, avatar }) => (
  <div className="bg-matte-surface border border-matte-divider rounded-xl p-6 flex flex-col justify-between">
    {/* Left accent stripe */}
    <div className="border-l-2 border-brand-emerald/40 pl-4 mb-5">
      <p className="text-sm text-matte-stone/60 italic leading-relaxed">"{content}"</p>
    </div>
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 bg-brand-emerald/12 border border-brand-emerald/15 rounded-full flex items-center justify-center text-brand-emerald text-sm font-bold shrink-0">
        {avatar}
      </div>
      <div>
        <p className="font-display font-semibold text-sm text-matte-bone">{name}</p>
        <p className="text-xs text-matte-stone/38 font-medium">{role}</p>
      </div>
      <div className="ml-auto flex items-center gap-0.5 text-amber-500/70">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3 h-3 fill-current" />
        ))}
      </div>
    </div>
  </div>
);

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const stats = [
    { value: '10K+', label: 'Freelancers', icon: Users },
    { value: '5K+',  label: 'Projects Done', icon: Award },
    { value: '99%',  label: 'Satisfaction', icon: TrendingUp },
    { value: '24/7', label: 'Support', icon: Clock },
  ];

  const features = [
    {
      icon: Briefcase,
      title: 'Post Gigs Easily',
      description: 'Create detailed gig postings in minutes. Set your budget, describe your project, and attract the best talent immediately.',
      link: '/gigs/create',
      linkLabel: 'Post a Gig',
    },
    {
      icon: Users,
      title: 'Find Top Talent',
      description: 'Browse bids from verified freelancers and hire the perfect match for your project.',
    },
    {
      icon: Shield,
      title: 'Secure & Protected',
      description: 'Every transaction is backed by our secure payment framework and dispute resolution.',
    },
  ];

  const steps = [
    { number: '01', title: 'Post Your Gig', description: 'Describe your project, set your budget, and post it for freelancers to see.' },
    { number: '02', title: 'Review Bids', description: 'Receive proposals from qualified freelancers and review their profiles and pricing.' },
    { number: '03', title: 'Hire & Collaborate', description: 'Choose the best freelancer, confirm the hire, and start working together.', isLast: true },
  ];

  const testimonials = [
    { name: 'Sarah Johnson', role: 'Startup Founder', content: 'GigFlow helped us find amazing developers for our MVP. The bidding system made it easy to compare proposals.', avatar: 'S' },
    { name: 'Mike Chen', role: 'Freelance Designer', content: "As a freelancer, I've landed multiple high-paying projects through GigFlow. The platform is intuitive and professional.", avatar: 'M' },
    { name: 'Emily Davis', role: 'Marketing Director', content: 'The quality of freelancers on GigFlow is outstanding. We rely on it for all our content and design projects.', avatar: 'E' },
  ];

  return (
    <div className="min-h-screen text-matte-bone">

      {/* ─────────────────── Hero ─────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-matte-charcoal overflow-hidden">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,transparent,transparent 59px,#faf9f6 59px,#faf9f6 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,#faf9f6 59px,#faf9f6 60px)',
          }}
        />
        {/* Emerald ambient */}
        <div className="absolute top-1/3 left-0 w-[600px] h-[400px] bg-brand-emerald/5 rounded-full blur-3xl -translate-x-1/3" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-emerald/4 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-20 grid md:grid-cols-[1fr_380px] lg:grid-cols-[1fr_440px] gap-12 lg:gap-16 items-center">

          {/* ── Left: copy ── */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-brand-emerald/20 bg-brand-emerald/8">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse" />
              <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-brand-emerald">
                Hiring marketplace
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-[4.25rem] font-display font-extrabold text-matte-bone leading-[1.05] tracking-tight">
              Connect with<br />
              <span className="text-brand-emerald">top freelancers.</span><br />
              Get things done.
            </h1>

            <p className="text-base md:text-lg text-matte-stone/50 leading-relaxed max-w-lg">
              The premier marketplace linking skilled freelancers with clients. Post a gig, receive bids, and hire the best — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button size="lg" variant="primary">
                    Go to Workspace
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" variant="primary">
                      Get Started Free
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/gigs">
                    <Button size="lg" variant="secondary">
                      Browse Gigs
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Trust row */}
            <div className="flex items-center gap-5 pt-2">
              <div className="flex -space-x-2">
                {['A', 'B', 'C', 'D'].map((l) => (
                  <div
                    key={l}
                    className="w-8 h-8 rounded-full border-2 border-matte-charcoal bg-brand-emerald/15 flex items-center justify-center text-[10px] font-bold text-brand-emerald"
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 text-amber-500/70 mb-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <p className="text-xs text-matte-stone/40 font-medium">Trusted by 10,000+ professionals</p>
              </div>
            </div>
          </div>

          {/* ── Right: stat board ── */}
          <div className="bg-matte-surface border border-matte-divider rounded-2xl p-6 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-sans font-semibold uppercase tracking-widest text-matte-stone/35">Platform Stats</p>
              <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Live
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {stats.map(({ value, label, icon: Icon }) => (
                <div key={label} className="bg-matte-charcoal rounded-xl border border-matte-divider p-4">
                  <p
                    className="text-2xl font-mono font-bold leading-none mb-1.5"
                    style={{ color: 'var(--color-brass)' }}
                  >
                    {value}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-3 h-3 text-brand-emerald" />
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-matte-stone/40">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* CTA inside card */}
            <div className="pt-2">
              {!isAuthenticated && (
                <Link to="/gigs" className="block">
                  <button className="w-full py-2.5 rounded-md border border-matte-divider text-sm text-matte-stone/50 hover:text-matte-bone hover:border-matte-stone/20 transition-colors font-medium">
                    Browse open gigs →
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── Features ─────────────────── */}
      <section className="py-24 bg-matte-charcoal border-t border-matte-divider">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-xs font-sans font-semibold uppercase tracking-widest text-brand-emerald mb-3">
              Why GigFlow
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-matte-bone tracking-tight">
              Built for serious work.
            </h2>
          </div>

          {/* Asymmetric feature grid */}
          <div className="grid md:grid-cols-3 gap-5">
            {/* Large feature card */}
            <div className="md:col-span-2 bg-matte-surface border border-matte-divider rounded-xl p-8 flex flex-col justify-between min-h-[280px] group hover:border-matte-surface-raised transition-all duration-200">
              <div>
                <div className="w-10 h-10 rounded-lg bg-brand-emerald/10 border border-brand-emerald/15 flex items-center justify-center mb-5">
                  <Briefcase className="w-5 h-5 text-brand-emerald" />
                </div>
                <h3 className="text-xl font-display font-bold text-matte-bone mb-3">Post Gigs Easily</h3>
                <p className="text-sm text-matte-stone/45 leading-relaxed max-w-md">
                  Create detailed gig postings in minutes. Set your budget, describe your project, and attract the best talent immediately.
                </p>
              </div>
              <div className="mt-6">
                <Link
                  to="/gigs/create"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-emerald hover:gap-3 transition-all duration-200"
                >
                  Post a Gig <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Stack of 2 small cards */}
            <div className="flex flex-col gap-5">
              {[
                { icon: Users, title: 'Find Top Talent', desc: 'Browse bids from verified freelancers and hire the perfect match.' },
                { icon: Shield, title: 'Secure & Protected', desc: 'Every transaction is backed by our secure payment framework.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-matte-surface border border-matte-divider rounded-xl p-6 flex-1 hover:border-matte-surface-raised transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-emerald/10 border border-brand-emerald/15 flex items-center justify-center mb-4">
                    <Icon className="w-4 h-4 text-brand-emerald" />
                  </div>
                  <h3 className="text-sm font-display font-bold text-matte-bone mb-1.5">{title}</h3>
                  <p className="text-xs text-matte-stone/40 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── How It Works ─────────────────── */}
      <section className="py-24 bg-matte-ink border-t border-matte-divider">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="text-xs font-sans font-semibold uppercase tracking-widest text-brand-emerald mb-3">
                Process
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-matte-bone tracking-tight mb-4">
                Three steps to<br />get it done.
              </h2>
              <p className="text-sm text-matte-stone/40 leading-relaxed">
                GigFlow is designed to move fast. From posting to hiring, the whole process takes hours — not days.
              </p>

              {/* Feature checkmarks */}
              <ul className="mt-8 space-y-2.5">
                {['No subscription required', 'Instant bid notifications', 'Direct messaging with freelancers'].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-matte-stone/50">
                    <CheckCircle className="w-4 h-4 text-brand-emerald shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Vertical timeline steps */}
            <div className="pt-2">
              {steps.map((step, i) => (
                <Step key={step.number} {...step} isLast={i === steps.length - 1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── Testimonials ─────────────────── */}
      <section className="py-24 bg-matte-charcoal border-t border-matte-divider">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-xs font-sans font-semibold uppercase tracking-widest text-brand-emerald mb-3">
              Testimonials
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-matte-bone tracking-tight">
              What our users say.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── CTA Banner ─────────────────── */}
      <section className="py-20 bg-matte-ink border-t border-matte-divider relative overflow-hidden">
        {/* Watermark wordmark */}
        <div
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
          aria-hidden="true"
        >
          <span className="text-[12rem] font-display font-extrabold text-matte-charcoal-light/20 tracking-tighter leading-none whitespace-nowrap">
            GigFlow
          </span>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-matte-bone tracking-tight mb-2">
              Ready to get started?
            </h2>
            <p className="text-sm text-matte-stone/40">
              Join the platform. It's free to sign up.
            </p>
          </div>
          <div className="shrink-0">
            <Link to="/register">
              <Button size="lg" variant="primary">
                Create Free Account
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
