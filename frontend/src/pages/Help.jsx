import { useState } from 'react';
import {
  Search,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  MessageCircle,
  BookOpen,
  Zap,
  Shield,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* ── FAQ Accordion Item ─────────────────────────────── */
const FaqItem = ({ question, answer, isOpen, onToggle, index }) => (
  <div
    className={`
      border rounded-xl overflow-hidden transition-all duration-200
      ${isOpen
        ? 'border-brand-emerald/25 bg-brand-emerald/5'
        : 'border-matte-divider bg-matte-surface hover:border-matte-surface-raised'}
    `}
  >
    <button
      onClick={onToggle}
      className="w-full text-left flex items-center justify-between gap-4 px-6 py-4.5 focus:outline-none group"
      aria-expanded={isOpen}
    >
      <div className="flex items-center gap-3">
        <span
          className={`
            w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-mono font-bold shrink-0 transition-colors duration-200
            ${isOpen ? 'bg-brand-emerald text-white' : 'bg-matte-charcoal text-matte-stone/40'}
          `}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className={`text-sm font-display font-semibold leading-snug transition-colors duration-200 ${isOpen ? 'text-matte-bone' : 'text-matte-stone/75 group-hover:text-matte-bone'}`}>
          {question}
        </span>
      </div>
      <span className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
        <ChevronDown className={`w-4 h-4 ${isOpen ? 'text-brand-emerald' : 'text-matte-stone/30'}`} />
      </span>
    </button>

    {/* Answer panel */}
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="px-6 pb-5 pl-[3.75rem]">
        <p className="text-sm text-matte-stone/55 leading-relaxed">{answer}</p>
      </div>
    </div>
  </div>
);

/* ── Category Card ──────────────────────────────────── */
const CategoryCard = ({ icon: Icon, title, description, accent }) => (
  <div className={`
    group relative overflow-hidden
    bg-matte-surface border border-matte-divider rounded-xl p-5
    hover:border-matte-surface-raised hover:-translate-y-[1px]
    transition-all duration-200 cursor-default
  `}>
    {/* Subtle corner glow */}
    <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{ background: accent }} />
    <div className={`
      w-10 h-10 rounded-xl border flex items-center justify-center mb-4
      bg-brand-emerald/8 border-brand-emerald/15
    `}>
      <Icon className="w-5 h-5 text-brand-emerald" />
    </div>
    <h3 className="text-sm font-display font-bold text-matte-bone mb-1.5">{title}</h3>
    <p className="text-xs text-matte-stone/40 leading-relaxed">{description}</p>
  </div>
);

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    {
      icon: Zap,
      title: 'Getting Started',
      description: 'Learn the basics of using GigFlow as a client or freelancer.',
      accent: 'rgba(15,76,58,0.3)',
    },
    {
      icon: BookOpen,
      title: 'Posting Gigs',
      description: 'How to create detailed gig listings that attract top talent.',
      accent: 'rgba(15,76,58,0.3)',
    },
    {
      icon: MessageCircle,
      title: 'Bidding',
      description: 'Submit compelling proposals and manage your active bids.',
      accent: 'rgba(15,76,58,0.3)',
    },
    {
      icon: Shield,
      title: 'Account & Security',
      description: 'Manage your profile, password, and account settings safely.',
      accent: 'rgba(15,76,58,0.3)',
    },
  ];

  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'Click "Get Started" in the navigation bar. Fill in your name, email, and password. Your account type (client or freelancer) can be set during onboarding. Registration takes under a minute.',
    },
    {
      question: 'How do I post a gig?',
      answer: 'After logging in as a client, click "Post a Gig" in the nav or press the + button. Fill in your gig title, description, budget, required skills, and an optional deadline — then hit Publish.',
    },
    {
      question: 'How do I submit a bid?',
      answer: 'Browse available gigs and open one you\'re interested in. If the gig is open and you haven\'t already bid, the "Place Your Bid" form will appear in the sidebar. Enter your amount, delivery time, and proposal, then submit.',
    },
    {
      question: 'How do I accept a bid and hire a freelancer?',
      answer: 'Open your gig\'s detail page and scroll to the Bids section. Each pending bid has a "Hire This Freelancer" button. Click it to accept — the freelancer is notified and the gig moves to in-progress.',
    },
    {
      question: 'Can I change my role from client to freelancer?',
      answer: 'Roles are set at registration time. If you need to switch, please reach out through our Contact page and our support team will assist you.',
    },
    {
      question: 'How do payments work?',
      answer: 'Payments are currently handled directly between clients and freelancers. We recommend agreeing on milestones upfront and releasing payment upon delivery. A full escrow system is on our roadmap.',
    },
    {
      question: 'Can I delete a gig I posted?',
      answer: 'Yes — go to My Gigs, find the gig, and click the trash icon. Deletion is only available for gigs with "Open" status. Gigs that are in-progress or completed cannot be deleted.',
    },
    {
      question: 'Why can\'t I see the bid form on a gig?',
      answer: 'The bid form only appears when: (1) you are logged in, (2) you are not the gig owner, (3) the gig is open, and (4) you haven\'t already placed a bid on it.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-matte-charcoal">

      {/* ── Hero strip ── */}
      <div className="relative overflow-hidden border-b border-matte-divider">
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,transparent,transparent 39px,#faf9f6 39px,#faf9f6 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#faf9f6 39px,#faf9f6 40px)',
          }}
        />
        {/* Emerald glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-brand-emerald/8 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-brand-emerald/20 bg-brand-emerald/8 mb-6">
            <HelpCircle className="w-3.5 h-3.5 text-brand-emerald" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-brand-emerald">
              Help Center
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-matte-bone tracking-tight mb-4 leading-tight">
            How can we<br className="hidden sm:block" /> help you?
          </h1>
          <p className="text-base text-matte-stone/45 mb-10 max-w-md mx-auto leading-relaxed">
            Browse our guides, read the FAQ, or get in touch with our support team.
          </p>

          {/* Search bar */}
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-matte-stone/30 z-10 pointer-events-none" />
            <input
              type="text"
              placeholder="Search for answers…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                w-full pl-12 pr-4 py-4 rounded-xl
                bg-matte-surface border border-matte-divider
                text-matte-bone text-sm placeholder-matte-stone/25
                focus:outline-none focus:border-brand-emerald/50 focus:ring-2 focus:ring-brand-emerald/12
                transition-all duration-200
                shadow-[0_4px_24px_rgba(0,0,0,0.3)]
              "
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-matte-stone/30 hover:text-matte-stone/60 transition-colors text-xs font-semibold"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-14">

        {/* ── Categories ── */}
        {!searchQuery && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-sans font-semibold uppercase tracking-widest text-matte-stone/35">
                Browse by topic
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {categories.map((cat, i) => (
                <CategoryCard key={i} {...cat} />
              ))}
            </div>
          </section>
        )}

        {/* ── FAQ Accordion ── */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-sans font-semibold uppercase tracking-widest text-matte-stone/35">
              {searchQuery
                ? `${filteredFaqs.length} result${filteredFaqs.length !== 1 ? 's' : ''} for "${searchQuery}"`
                : 'Frequently asked questions'}
            </h2>
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="text-center py-14">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl border-2 border-dashed border-matte-divider text-matte-stone/25 mb-4">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-sm font-display font-semibold text-matte-bone mb-1">No results found</p>
              <p className="text-xs text-matte-stone/35">Try different keywords or browse by topic above.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredFaqs.map((faq, index) => (
                <FaqItem
                  key={index}
                  index={faqs.indexOf(faq)}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaq === index}
                  onToggle={() => setOpenFaq(openFaq === index ? null : index)}
                />
              ))}
            </div>
          )}
        </section>

        {/* ── Quick tips strip ── */}
        {!searchQuery && (
          <section className="mb-14">
            <h2 className="text-xs font-sans font-semibold uppercase tracking-widest text-matte-stone/35 mb-6">
              Quick tips
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: CheckCircle2, tip: 'Add detailed skill tags to your gig to attract the right freelancers faster.' },
                { icon: CheckCircle2, tip: 'Include a deadline to signal project urgency and set clear expectations.' },
                { icon: CheckCircle2, tip: 'Review a freelancer\'s bid message carefully — the best bids show understanding of your project.' },
              ].map(({ icon: Icon, tip }, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-matte-surface border border-matte-divider rounded-xl">
                  <Icon className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                  <p className="text-xs text-matte-stone/50 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Contact CTA ── */}
        <section>
          <div className="relative overflow-hidden bg-matte-surface border border-matte-divider rounded-2xl p-8 md:p-10">
            {/* Background watermark */}
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[8rem] font-display font-extrabold text-matte-charcoal-light/30 select-none pointer-events-none leading-none"
              aria-hidden="true"
            >
              ?
            </div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-7">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-4 h-4 text-brand-emerald" />
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-emerald">
                    Still stuck?
                  </p>
                </div>
                <h3 className="text-2xl font-display font-extrabold text-matte-bone tracking-tight mb-2">
                  Talk to our support team.
                </h3>
                <p className="text-sm text-matte-stone/45 max-w-sm leading-relaxed">
                  We typically respond within a few hours. Describe your issue and we'll sort it out.
                </p>
              </div>
              <div className="shrink-0">
                <Link
                  to="/contact"
                  className="
                    inline-flex items-center gap-2
                    px-6 py-3.5 rounded-xl
                    btn-glass-primary
                    text-sm font-semibold
                    min-h-[48px]
                    transition-all duration-200
                  "
                >
                  Contact Support
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Help;
