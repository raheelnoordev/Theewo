import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Mail, Phone, MapPin } from 'lucide-react';
import api from '../utils/api';
import logo from '../assets/EWOLogo.png';

type MenuKey = 'services' | 'industries' | 'deliver' | null;

const SocialIcon = ({ type, className }: { type: string; className?: string }) => {
  const common = { className, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true as const };
  if (type === 'instagram') {
    return (
      <svg {...common}>
        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
      </svg>
    );
  }
  if (type === 'facebook') {
    return (
      <svg {...common}>
        <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
      </svg>
    );
  }
  if (type === 'linkedin') {
    return (
      <svg {...common}>
        <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
};

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuKey>(null);
  const [services, setServices] = useState<any[]>([]);
  const [industries, setIndustries] = useState<any[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const location = useLocation();

  useEffect(() => {
    api.get('/services').then((r) => setServices(r.data.filter((s: any) => s.isActive))).catch(() => {});
    api.get('/industries').then((r) => setIndustries(r.data.filter((i: any) => i.isActive))).catch(() => {});
    api.get('/site-settings').then((r) => setSettings(r.data || {})).catch(() => {});
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [location.pathname]);

  // Settings have been saved under several key spellings over time, so each field checks its aliases.
  const setting = (...keys: string[]) => keys.map((k) => settings[k]).find((v) => v && v.trim());

  const email = setting('contact_email', 'PrimaryEmail') || 'hello@theewotech.com';
  const phone = setting('contact_phone', 'PrimaryPhone') || '+1 (214) 555-0199';
  const isHome = location.pathname === '/' || location.pathname === '';

  // Seed URLs left over from the starter data point at non-existent profiles.
  const PLACEHOLDER_SOCIALS = ['facebook.com/company', 'linkedin.com/company/company', 'example.com'];
  const socialHref = (fallback: string, ...keys: string[]) => {
    const value = setting(...keys);
    if (!value || PLACEHOLDER_SOCIALS.some((p) => value.includes(p))) return fallback;
    return value;
  };

  const socials = [
    {
      key: 'instagram',
      label: 'Instagram',
      type: 'instagram',
      href: socialHref('https://www.instagram.com/theewotech/', 'social_instagram', 'InstagramUrl', 'instagram_url'),
    },
    {
      key: 'facebook',
      label: 'Facebook',
      type: 'facebook',
      href: socialHref('https://www.facebook.com/theewotech/', 'social_facebook', 'FacebookUrl', 'facebook_url'),
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      type: 'linkedin',
      href: socialHref(
        'https://www.linkedin.com/company/ewo-technologies-pvt-ltd/',
        'social_linkedin',
        'LinkedInUrl',
        'linkedin_url'
      ),
    },
    {
      key: 'twitter',
      label: 'X (Twitter)',
      type: 'twitter',
      href: setting('social_twitter', 'TwitterUrl', 'XUrl', 'twitter_url'),
    },
  ].filter((s) => s.href);

  return (
    <div className={`min-h-screen flex flex-col ${isHome ? 'bg-transparent' : 'bg-white'}`}>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-nav overflow-visible" onMouseLeave={() => setActiveMenu(null)}>
        <div className="container-wide overflow-visible">
          <div className="flex items-center justify-between h-16 overflow-visible">
            <Link to="/" className="relative z-10 flex items-center shrink-0 -my-3">
              <img src={logo} alt="EWO Technologies" className="h-[5.5rem] w-auto object-contain drop-shadow-sm" />
            </Link>

            <nav className="hidden xl:flex items-center gap-8">
              <div className="relative" onMouseEnter={() => setActiveMenu('services')}>
                <button className="nav-link flex items-center gap-1 py-5">Solutions <ChevronDown className="w-4 h-4" /></button>
              </div>
              <div className="relative" onMouseEnter={() => setActiveMenu('industries')}>
                <button className="nav-link flex items-center gap-1 py-5">Industries <ChevronDown className="w-4 h-4" /></button>
              </div>
              <Link to="/about" className="nav-link">About</Link>
              <div className="relative" onMouseEnter={() => setActiveMenu('deliver')}>
                <button className="nav-link flex items-center gap-1 py-5">Process <ChevronDown className="w-4 h-4" /></button>
              </div>
              <Link to="/careers" className="nav-link">Careers</Link>
            </nav>

            <div className="hidden xl:flex items-center gap-3">
              <Link to="/contact?tab=appointment" className="btn-outline !py-2.5 !px-5 text-sm">
                Book Appointment
              </Link>
              <Link to="/contact" className="btn-primary !py-2.5 !px-5 text-sm">Let's Talk Business</Link>
            </div>

            <button className="xl:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {activeMenu === 'services' && (
          <div className="mega-panel">
            <div className="container-wide py-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {services.map((s) => (
                <Link key={s.serviceId} to={`/services/${s.slug}`} className="p-4 rounded-xl hover:bg-surface group">
                  <div className="font-semibold text-sm group-hover:text-brand-600">{s.title}</div>
                  <div className="text-xs text-muted line-clamp-2 mt-1">{s.shortDescription}</div>
                </Link>
              ))}
              <Link to="/services" className="p-4 rounded-xl bg-brand-50 text-brand-700 font-semibold text-sm flex items-center">View all solutions →</Link>
            </div>
          </div>
        )}
        {activeMenu === 'industries' && (
          <div className="mega-panel">
            <div className="container-wide py-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              {industries.map((i) => (
                <Link key={i.industryId} to={`/industries/${i.slug}`} className="p-4 rounded-xl hover:bg-surface font-semibold text-sm hover:text-brand-600">{i.title}</Link>
              ))}
            </div>
          </div>
        )}
        {activeMenu === 'deliver' && (
          <div className="mega-panel">
            <div className="container-wide py-8 flex gap-8">
              <Link to="/case-studies" className="p-4 rounded-xl hover:bg-surface font-semibold">Case Studies</Link>
              <Link to="/pages" className="p-4 rounded-xl hover:bg-surface font-semibold">Insights & Resources</Link>
              <Link to="/contact" className="p-4 rounded-xl hover:bg-surface font-semibold">Client Testimonials</Link>
            </div>
          </div>
        )}

        {mobileOpen && (
          <div className="xl:hidden border-t border-slate-200 bg-white p-4 space-y-2">
            <Link to="/services" className="block py-2 font-medium">Solutions</Link>
            <Link to="/industries" className="block py-2 font-medium">Industries</Link>
            <Link to="/about" className="block py-2 font-medium">About</Link>
            <Link to="/case-studies" className="block py-2 font-medium">Case Studies</Link>
            <Link to="/pages" className="block py-2 font-medium">Resources</Link>
            <Link to="/careers" className="block py-2 font-medium">Careers</Link>
            <Link to="/contact?tab=appointment" className="btn-outline w-full mt-4">Book Appointment</Link>
            <Link to="/contact" className="btn-primary w-full">Let's Talk Business</Link>
          </div>
        )}
      </header>

      <main className="flex-grow"><Outlet /></main>

      <footer className="bg-[#083D70] text-white">
        <div className="container-wide section-pad grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img src={logo} alt="EWO" className="h-10 mb-4 bg-white rounded-lg p-1" />
            <p className="text-sm text-brand-100 leading-relaxed">Enterprise software, AI engineering, and digital transformation for global organizations.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm text-brand-100">
              {services.slice(0, 6).map((s) => (
                <li key={s.serviceId}><Link to={`/services/${s.slug}`} className="hover:text-white">{s.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm text-brand-100">
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/case-studies" className="hover:text-white">Case Studies</Link></li>
              <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <div className="space-y-3 text-sm text-brand-100">
              <p className="flex items-center gap-2"><Mail className="w-4 h-4" />{email}</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4" />{phone}</p>
              <p className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5" />{setting('contact_address', 'Address') || 'Dallas, TX'}</p>
            </div>
            {socials.length > 0 && (
              <div className="mt-6">
                <h4 className="font-bold mb-3 text-sm uppercase tracking-wider">Follow Us</h4>
                <div className="flex items-center gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.key}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
                    >
                      <SocialIcon type={s.type} className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="border-t border-white/15 py-6 text-center text-xs text-brand-100">
          © {new Date().getFullYear()} EWO Technologies. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
