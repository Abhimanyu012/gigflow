import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
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

/* ── Scroll Reveal Component ─────────────────────────── */
const Reveal = ({ children, className = '', delay = '' }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-init ${isVisible ? 'reveal-visible' : ''} ${delay} ${className}`}
    >
      {children}
    </div>
  );
};

/* ── Step component ─────────────────────────────────── */
const Step = ({ number, title, description, isLast }) => (
  <div className="flex gap-5 md:gap-6 group">
    <div className="flex flex-col items-center">
      <div className="w-11 h-11 rounded-xl bg-matte-surface border border-matte-divider flex items-center justify-center shrink-0 group-hover:border-brand-emerald/45 transition-all duration-300">
        <span className="font-mono font-semibold text-sm group-hover:scale-110 transition-transform duration-300" style={{ color: 'var(--color-brass)' }}>
          {number}
        </span>
      </div>
      {!isLast && (
        <div className="w-px flex-1 mt-3 bg-gradient-to-b from-matte-divider via-brand-emerald/15 to-transparent" />
      )}
    </div>
    <div className="pb-10">
      <h3 className="text-base font-display font-bold text-matte-bone mb-1.5 group-hover:text-brand-emerald-light transition-colors duration-300">{title}</h3>
      <p className="text-sm text-matte-stone/45 leading-relaxed">{description}</p>
    </div>
  </div>
);

/* ── Testimonial card ───────────────────────────────── */
const TestimonialCard = ({ name, role, content, avatar }) => (
  <div className="bg-matte-surface border border-matte-divider rounded-xl p-6 flex flex-col justify-between hover-magnetic transition-all duration-300 hover:border-matte-surface-raised hover:shadow-[0_12px_24px_rgba(0,0,0,0.4)]">
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

  return (
    <div className="min-h-screen text-matte-bone overflow-hidden">

      {/* ─────────────────── Hero ─────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-matte-charcoal overflow-hidden py-16 md:py-24">
        {/* Background grid texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,transparent,transparent 59px,#faf9f6 59px,#faf9f6 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,#faf9f6 59px,#faf9f6 60px)',
          }}
        />
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-brand-emerald/5 rounded-full blur-3xl -translate-x-1/3 animate-pulse duration-10000" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-brand-emerald/4 rounded-full blur-3xl translate-x-1/4 animate-pulse duration-8000" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full grid md:grid-cols-[1fr_380px] lg:grid-cols-[1fr_440px] gap-12 lg:gap-16 items-center">

          {/* ── Left: Copy Section ── */}
          <div className="space-y-8">
            <Reveal delay="anim-delay-75">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-brand-emerald/20 bg-brand-emerald/8 hover:bg-brand-emerald/12 transition-all duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse" />
                <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-brand-emerald">
                  Hiring marketplace
                </span>
              </div>
            </Reveal>

            <Reveal delay="anim-delay-150">
              <h1 className="text-5xl md:text-6xl lg:text-[4.25rem] font-display font-extrabold text-matte-bone leading-[1.05] tracking-tight">
                Connect with<br />
                <span className="text-brand-emerald relative inline-block group">
                  top freelancers.
                  <span className="absolute bottom-1 left-0 w-0 h-[3px] bg-brand-emerald/30 group-hover:w-full transition-all duration-500 rounded-full" />
                </span><br />
                Get things done.
              </h1>
            </Reveal>

            <Reveal delay="anim-delay-200">
              <p className="text-base md:text-lg text-matte-stone/50 leading-relaxed max-w-lg">
                The premier marketplace linking skilled freelancers with clients. Post a gig, receive bids, and hire the best — all in one place.
              </p>
            </Reveal>

            <Reveal delay="anim-delay-300">
              <div className="flex flex-col sm:flex-row gap-3.5">
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <Button size="lg" variant="primary" className="hover-magnetic min-w-[180px]">
                      Go to Workspace
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/register">
                      <Button size="lg" variant="primary" className="hover-magnetic min-w-[180px]">
                        Get Started Free
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link to="/gigs">
                      <Button size="lg" variant="secondary" className="hover-magnetic min-w-[150px]">
                        Browse Gigs
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </Reveal>

            {/* Trust row */}
            <Reveal delay="anim-delay-400">
              <div className="flex items-center gap-5 pt-2">
                <div className="flex -space-x-2.5">
                  {['A', 'B', 'C', 'D'].map((l, index) => (
                    <div
                      key={l}
                      className="w-9 h-9 rounded-full border-2 border-matte-charcoal bg-brand-emerald/15 flex items-center justify-center text-[10px] font-bold text-brand-emerald transition-transform duration-300 hover:-translate-y-1 hover:z-10"
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      {l}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5 text-amber-500/70 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current hover:scale-125 transition-transform" />
                    ))}
                  </div>
                  <p className="text-xs text-matte-stone/40 font-medium">Trusted by 10,000+ professionals</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── Right: Stats Board ── */}
          <Reveal delay="anim-delay-300" className="animate-float">
            <div className="bg-matte-surface border border-matte-divider rounded-2xl p-6 space-y-3.5 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-sans font-semibold uppercase tracking-widest text-matte-stone/35">Platform Stats</p>
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  Live
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                {stats.map(({ value, label, icon: Icon }) => (
                  <div key={label} className="bg-matte-charcoal rounded-xl border border-matte-divider p-4 hover:border-brand-emerald/30 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] transition-all duration-300 group">
                    <p
                      className="text-2xl font-mono font-bold leading-none mb-1.5 group-hover:scale-105 origin-left transition-transform duration-300"
                      style={{ color: 'var(--color-brass)' }}
                    >
                      {value}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-brand-emerald group-hover:rotate-12 transition-transform duration-300" />
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-matte-stone/40">
                        {label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                {!isAuthenticated && (
                  <Link to="/gigs" className="block">
                    <button className="w-full py-2.5 rounded-md border border-matte-divider text-sm text-matte-stone/50 hover:text-brand-emerald hover:border-brand-emerald/30 hover:bg-brand-emerald/5 transition-all duration-300 font-medium">
                      Browse open gigs →
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────── Features ─────────────────── */}
      <section className="py-24 bg-matte-charcoal border-t border-matte-divider">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-14">
            <p className="text-xs font-sans font-semibold uppercase tracking-widest text-brand-emerald mb-3">
              Why GigFlow
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-matte-bone tracking-tight">
              Built for serious work.
            </h2>
          </Reveal>

          {/* Asymmetric feature grid */}
          <div className="grid md:grid-cols-3 gap-5">
            {/* Large feature card */}
            <Reveal className="md:col-span-2" delay="anim-delay-75">
              <div className="bg-matte-surface border border-matte-divider rounded-xl p-8 flex flex-col justify-between min-h-[280px] group hover-magnetic-lg hover:border-matte-surface-raised transition-all duration-300 hover:shadow-[0_16px_32px_rgba(0,0,0,0.4)]">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-brand-emerald/10 border border-brand-emerald/15 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Briefcase className="w-5 h-5 text-brand-emerald" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-matte-bone mb-3 group-hover:text-brand-emerald-light transition-colors duration-300">Post Gigs Easily</h3>
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
            </Reveal>

            {/* Stack of 2 small cards */}
            <div className="flex flex-col gap-5">
              {[
                { icon: Users, title: 'Find Top Talent', desc: 'Browse bids from verified freelancers and hire the perfect match.' },
                { icon: Shield, title: 'Secure & Protected', desc: 'Every transaction is backed by our secure payment framework.' },
              ].map(({ icon: Icon, title, desc }, index) => (
                <Reveal key={title} delay={index === 0 ? "anim-delay-150" : "anim-delay-200"}>
                  <div
                    className="bg-matte-surface border border-matte-divider rounded-xl p-6 flex-1 hover-magnetic hover:border-matte-surface-raised transition-all duration-300 hover:shadow-[0_12px_24px_rgba(0,0,0,0.3)] group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand-emerald/10 border border-brand-emerald/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-4 h-4 text-brand-emerald" />
                    </div>
                    <h3 className="text-sm font-display font-bold text-matte-bone mb-1.5 group-hover:text-brand-emerald-light transition-colors duration-300">{title}</h3>
                    <p className="text-xs text-matte-stone/40 leading-relaxed">{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── How It Works ─────────────────── */}
      <section className="py-24 bg-matte-ink border-t border-matte-divider">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            <Reveal>
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
                <ul className="mt-8 space-y-3">
                  {['No subscription required', 'Instant bid notifications', 'Direct messaging with freelancers'].map((item, index) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-matte-stone/50 hover:text-matte-stone/80 transition-colors duration-300">
                      <CheckCircle className="w-4 h-4 text-brand-emerald shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Vertical timeline steps */}
            <div className="pt-2">
              {[
                { number: '01', title: 'Post Your Gig', description: 'Describe your project, set your budget, and post it for freelancers to see.' },
                { number: '02', title: 'Review Bids', description: 'Receive proposals from qualified freelancers and review their profiles and pricing.' },
                { number: '03', title: 'Hire & Collaborate', description: 'Choose the best freelancer, confirm the hire, and start working together.', isLast: true },
              ].map((step, i) => (
                <Reveal key={step.number} delay={`anim-delay-${(i + 1) * 100}`}>
                  <Step {...step} isLast={i === 2} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── Testimonials ─────────────────── */}
      <section className="py-24 bg-matte-charcoal border-t border-matte-divider">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-14">
            <p className="text-xs font-sans font-semibold uppercase tracking-widest text-brand-emerald mb-3">
              Testimonials
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-matte-bone tracking-tight">
              What our users say.
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { name: 'Sarah Johnson', role: 'Startup Founder', content: 'GigFlow helped us find amazing developers for our MVP. The bidding system made it easy to compare proposals.', avatar: 'S' },
              { name: 'Mike Chen', role: 'Freelance Designer', content: "As a freelancer, I've landed multiple high-paying projects through GigFlow. The platform is intuitive and professional.", avatar: 'M' },
              { name: 'Emily Davis', role: 'Marketing Director', content: 'The quality of freelancers on GigFlow is outstanding. We rely on it for all our content and design projects.', avatar: 'E' },
            ].map((t, i) => (
              <Reveal key={t.name} delay={`anim-delay-${(i + 1) * 100}`}>
                <TestimonialCard {...t} />
              </Reveal>
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
          <span className="text-[12rem] font-display font-extrabold text-matte-charcoal-light/10 tracking-tighter leading-none whitespace-nowrap">
            GigFlow
          </span>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <Reveal>
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-matte-bone tracking-tight mb-2">
                Ready to get started?
              </h2>
              <p className="text-sm text-matte-stone/40">
                Join the platform. It's free to sign up.
              </p>
            </div>
          </Reveal>
          <Reveal delay="anim-delay-150">
            <div className="shrink-0">
              <Link to="/register">
                <Button size="lg" variant="primary" className="hover-magnetic">
                  Create Free Account
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
