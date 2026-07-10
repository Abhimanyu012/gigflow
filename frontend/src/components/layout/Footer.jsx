import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-matte-ink border-t border-matte-divider">
      {/* Emerald accent rule */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-brand-emerald/35 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          {/* Brand column */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-lg font-display font-extrabold text-matte-bone tracking-tight">
                Gig<span className="text-brand-emerald">Flow</span>
              </span>
            </Link>
            <p className="text-sm text-matte-stone/40 leading-relaxed max-w-xs">
              The professional marketplace connecting skilled freelancers with ambitious clients.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 pt-1">
              {[
                { href: '#', icon: Twitter, label: 'Twitter' },
                { href: '#', icon: Linkedin, label: 'LinkedIn' },
                { href: '#', icon: Github, label: 'GitHub' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-md border border-matte-divider text-matte-stone/35 hover:text-matte-bone hover:border-matte-stone/20 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform links */}
          <div>
            <p className="text-xs font-sans font-semibold uppercase tracking-widest text-matte-stone/35 mb-4">
              Platform
            </p>
            <ul className="space-y-2.5">
              {[
                { to: '/gigs', label: 'Browse Gigs' },
                { to: '/gigs/create', label: 'Post a Gig' },
                { to: '/dashboard', label: 'Dashboard' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-matte-stone/45 hover:text-matte-bone transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal/support links */}
          <div>
            <p className="text-xs font-sans font-semibold uppercase tracking-widest text-matte-stone/35 mb-4">
              Support
            </p>
            <ul className="space-y-2.5">
              {[
                { to: '/help', label: 'Help Centre' },
                { to: '/contact', label: 'Contact Us' },
                { to: '/privacy', label: 'Privacy Policy' },
                { to: '/terms', label: 'Terms of Service' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-matte-stone/45 hover:text-matte-bone transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-matte-divider mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-matte-stone/30 font-medium">
            © {year} GigFlow. All rights reserved.
          </p>
          <p className="text-xs text-matte-stone/20">
            Designed with precision.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
