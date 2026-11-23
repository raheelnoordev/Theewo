import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Star, Play } from 'lucide-react';
import api from '../utils/api';
import ClientLogoMarquee from '../components/ClientLogoMarquee';

declare global {
  interface Window {
    __ewoSyncHeroVideo?: () => void;
    __ewoEnsureHeroPlaying?: () => void;
    __ewoHeroVideoEl?: HTMLVideoElement;
    __ewoHeroBootEl?: HTMLElement;
  }
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showAllServices, setShowAllServices] = useState(false);
  const [techFilter, setTechFilter] = useState('All');
  const videoSlotRef = useRef<HTMLDivElement>(null);

  const [settings, setSettings] = useState<Record<string, string>>({});
  const [services, setServices] = useState<any[]>([]);
  const [industries, setIndustries] = useState<any[]>([]);
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [offices, setOffices] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [clientLogos, setClientLogos] = useState<any[]>([]);
  const [awards, setAwards] = useState<any[]>([]);
  const [partnerships, setPartnerships] = useState<any[]>([]);
  const [technologies, setTechnologies] = useState<any[]>([]);
  const [stats, setStats] = useState([
    { value: '150+', label: 'Successful Projects' },
    { value: '12+', label: 'Countries Supported' },
    { value: '80+', label: 'Active Clients' },
    { value: '10+', label: 'Years of Experience' },
  ]);

  // Adopt the already-playing HTML boot video into the hero (same element — no reload/stop)
  useEffect(() => {
    const slot = videoSlotRef.current;
    const video = window.__ewoHeroVideoEl || (document.getElementById('hero-boot-video') as HTMLVideoElement | null);
    const boot = window.__ewoHeroBootEl || document.getElementById('hero-boot');
    if (!slot || !video) return;

    video.className = 'absolute inset-0 w-full h-full object-cover';
    slot.appendChild(video);
    boot?.classList.add('is-adopted');

    window.__ewoSyncHeroVideo?.();
    window.__ewoEnsureHeroPlaying?.();

    return () => {
      if (boot && video.parentElement === slot) {
        boot.appendChild(video);
        boot.classList.remove('is-adopted');
      }
      window.__ewoSyncHeroVideo?.();
    };
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const [
          settingsRes, servicesRes, industriesRes, caseRes, pagesRes,
          teamRes, officesRes, testimonialsRes, logosRes, awardsRes, partnersRes, techRes,
        ] = await Promise.all([
          api.get('/site-settings'),
          api.get('/services'),
          api.get('/industries'),
          api.get('/case-studies'),
          api.get('/pages'),
          api.get('/team-members'),
          api.get('/offices'),
          api.get('/testimonials'),
          api.get('/featured-logos').catch(() => ({ data: [] })),
          api.get('/awards').catch(() => ({ data: [] })),
          api.get('/partnerships').catch(() => ({ data: [] })),
          api.get('/technologies').catch(() => ({ data: [] })),
        ]);

        const s = settingsRes.data || {};
        const val = (k: string, fb: string) => s[k] || fb;

        setSettings(s);
        setServices(servicesRes.data.filter((x: any) => x.isActive));
        setIndustries(industriesRes.data.filter((x: any) => x.isActive));
        setCaseStudies(caseRes.data.filter((x: any) => x.isActive).slice(0, 6));
        setPages(pagesRes.data.slice(0, 4));
        setTeam(teamRes.data.filter((x: any) => x.isActive).slice(0, 8));
        setOffices(officesRes.data.filter((x: any) => x.isActive));
        setTestimonials(testimonialsRes.data.filter((x: any) => x.isActive).slice(0, 6));
        setClientLogos(logosRes.data.filter((x: any) => x.isActive));
        setAwards(awardsRes.data.filter((x: any) => x.isActive));
        setPartnerships(partnersRes.data.filter((x: any) => x.isActive));
        setTechnologies(
          techRes.data
            .filter((x: any) => x.isActive)
            .filter((t: any, i: number, arr: any[]) =>
              arr.findIndex((x) => String(x.name || '').toLowerCase() === String(t.name || '').toLowerCase()) === i
            )
        );
        setStats([
          { value: val('stat_1_value', '150+'), label: val('stat_1_label', 'Successful Projects') },
          { value: val('stat_2_value', '12+'), label: val('stat_2_label', 'Countries Supported') },
          { value: val('stat_3_value', '80+'), label: val('stat_3_label', 'Active Clients') },
          { value: val('stat_4_value', '10+'), label: val('stat_4_label', 'Years of Experience') },
        ]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
        window.__ewoEnsureHeroPlaying?.();
      }
    };
    load();
  }, []);

  const heroTitle = settings.hero_title || 'Building at the Speed of AI';
  const heroSubtitle = settings.hero_subtitle || 'We partner with organizations across North America, the Middle East, Africa, and Asia-Pacific — delivering enterprise-grade product engineering, scalable cloud platforms, and intelligent automation built for real business impact.';
  const visibleServices = showAllServices ? services : services.slice(0, 8);
  const techCategories = ['All', ...Array.from(new Set(technologies.map((t) => t.category)))];
  const filteredTech = techFilter === 'All' ? technologies : technologies.filter((t) => t.category === techFilter);
  const insights = [
    ...caseStudies.map((c) => ({ type: 'Case Study', title: c.title, path: `/case-studies/${c.slug}`, image: c.imageUrl, desc: c.shortDescription })),
    ...pages.map((p) => ({ type: 'Insight', title: p.pageName, path: `/pages/${p.slug}`, image: null, desc: p.metaDescription })),
  ].slice(0, 6);
  const insightCols = [
    insights.filter((_, i) => i % 3 === 0),
    insights.filter((_, i) => i % 3 === 1),
    insights.filter((_, i) => i % 3 === 2),
  ];
  const insightColOffsets = ['mt-0 lg:mt-16', 'mt-0', 'mt-0 lg:mt-8'];

  return (
    <div className="overflow-x-hidden">
      {/* Hero — video adopted from index.html (starts before React/API, same element) */}
      <section className="relative min-h-[58vh] md:min-h-[64vh] flex flex-col justify-center bg-brand-900">
        <div ref={videoSlotRef} className="absolute inset-0 overflow-hidden bg-brand-900" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/70 via-brand-900/50 to-brand-700/30 pointer-events-none" />
        <div className="container-wide relative z-10 w-full py-16 md:py-20">
          <div className="max-w-2xl text-left mr-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-brand-100 text-xs font-semibold uppercase tracking-widest mb-5 backdrop-blur-sm">
              <Play className="w-3 h-3 fill-current" />
              {settings.hero_badge || 'Enterprise Software & AI Engineering'}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] mb-5 tracking-tight text-left">
              {heroTitle}
            </h1>
            <p className="text-base md:text-lg text-slate-200 max-w-xl mb-8 leading-relaxed text-left">{heroSubtitle}</p>
            <div className="flex flex-wrap gap-4 justify-start">
              <Link to="/contact" className="btn-primary !bg-white !text-brand-700 hover:!bg-slate-100 gap-2">
                Get in Touch <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/case-studies" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/40 text-white font-semibold text-sm hover:bg-white/10 transition-all">
                Explore Case Studies
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/60 text-xs z-10">
          <span className="uppercase tracking-widest">Scroll</span>
          <div className="w-px h-7 bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </section>

      {loading ? (
        <div className="py-20 flex items-center justify-center bg-white">
          <div className="animate-spin h-10 w-10 border-2 border-brand-700 border-t-transparent rounded-full" />
        </div>
      ) : (
      <>
      {/* Client logos — Devsinc-style moving strip */}
      <ClientLogoMarquee logos={clientLogos} />

      {/* Services */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="section-eyebrow">Solutions</p>
              <h2 className="section-title">Transform Your Business</h2>
              <p className="section-subtitle mt-3">End-to-end product engineering — from strategy and design to cloud-scale delivery.</p>
            </div>
            <Link to="/services" className="btn-outline shrink-0">All Services</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {visibleServices.map((s) => (
              <Link key={s.serviceId} to={`/services/${s.slug}`} className="group card p-0 overflow-hidden hover:-translate-y-1 hover:border-brand-500">
                <div className="aspect-[16/10] bg-gradient-to-br from-brand-50 to-slate-100 overflow-hidden">
                  {s.imageUrl ? (
                    <img src={s.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-600 text-4xl font-bold opacity-30">{s.title.charAt(0)}</div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-brand-700 group-hover:text-brand-600 mb-2">{s.title}</h3>
                  <p className="text-sm text-muted line-clamp-2">{s.shortDescription}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-brand-600 font-semibold mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          {services.length > 8 && (
            <div className="text-center mt-10">
              <button onClick={() => setShowAllServices(!showAllServices)} className="btn-outline">
                {showAllServices ? 'View Less' : 'View More Services'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Industries */}
      <section className="section-pad bg-surface">
        <div className="container-wide">
          <p className="section-eyebrow">Who we help</p>
          <h2 className="section-title mb-10">Impact Across Industries</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {industries.map((i) => (
              <Link key={i.industryId} to={`/industries/${i.slug}`} className="card p-0 overflow-hidden group hover:border-brand-500 text-center">
                <div className="aspect-square bg-slate-100 overflow-hidden">
                  {i.imageUrl && <img src={i.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm group-hover:text-brand-600">{i.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section-pad bg-[#083D70] text-white">
          <div className="container-wide">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-100 mb-3">Client Stories</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Trusted by leaders worldwide</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.testimonialId} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-200 text-sm leading-relaxed mb-6">"{t.message}"</p>
                  <div className="flex items-center gap-3">
                    {t.imageUrl && <img src={t.imageUrl} alt="" className="w-10 h-10 rounded-full object-cover" />}
                    <div>
                      <p className="font-semibold text-sm">{t.clientName}</p>
                      <p className="text-xs text-slate-400">{t.clientDesignation}{t.companyName ? `, ${t.companyName}` : ''}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Awards & Certifications — full width section */}
      {awards.length > 0 && (
        <section className="section-pad bg-white border-y border-slate-100">
          <div className="container-wide">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="section-eyebrow">Recognition</p>
              <h2 className="section-title">Awards & Certifications</h2>
              <p className="section-subtitle mt-3 mx-auto">Industry recognition for delivery excellence, security, and client outcomes.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {awards.map((a) => (
                <div key={a.awardId} className="group card p-6 text-center hover:-translate-y-1 hover:border-brand-500">
                  <div className="h-28 flex items-center justify-center mb-4 rounded-xl bg-surface overflow-hidden">
                    {a.imageUrl ? (
                      <img src={a.imageUrl} alt={a.title} className="max-h-20 max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <span className="text-3xl font-bold text-brand-600/30">{a.title?.charAt(0)}</span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-ink leading-snug">{a.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Our Partnerships — 4 per row, larger logos */}
      {partnerships.length > 0 && (
        <section className="section-pad bg-white">
          <div className="container-wide">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="section-eyebrow">Ecosystem</p>
              <h2 className="section-title">Our Partnerships</h2>
              <p className="section-subtitle mt-3 mx-auto">Trusted technology alliances that power enterprise-grade solutions.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
              {partnerships.map((p) => (
                <div
                  key={p.partnershipId}
                  className="group flex flex-col items-center justify-center min-h-[140px] md:min-h-[160px] px-6 py-8 rounded-2xl bg-surface border border-slate-100 hover:border-brand-500/40 hover:bg-white hover:shadow-card transition-all duration-300"
                >
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="max-h-16 md:max-h-20 max-w-[180px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-base font-semibold text-brand-700 text-center">{p.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Insights — Devsinc-style dark staggered masonry */}
      {insights.length > 0 && (
        <section className="relative section-pad overflow-hidden bg-[#05080f]">
          <div
            className="pointer-events-none absolute -right-24 bottom-0 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(10,77,140,0.55) 0%, transparent 70%)' }}
            aria-hidden
          />
          <div className="container-wide relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-16 items-start">
              {/* Left CTA */}
              <div className="lg:col-span-4 lg:sticky lg:top-28">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-100/90 mb-4">
                  Featured Insights
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.15] tracking-tight text-white mb-5">
                  Stories of our{' '}
                  <span className="text-brand-100">transformations across Services and Industries</span>
                </h2>
                <p className="text-lg text-slate-300 mb-8 font-light">From Concept to Completion</p>
                <Link
                  to="/case-studies"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-all shadow-lg shadow-brand-900/40 hover:shadow-brand-600/30 hover:-translate-y-0.5"
                >
                  Explore More
                </Link>
              </div>

              {/* Staggered card columns */}
              <div className="lg:col-span-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {insightCols.map((col, colIdx) => (
                  <div key={colIdx} className={`flex flex-col gap-5 ${insightColOffsets[colIdx]}`}>
                    {col.map((item, idx) => (
                      <Link
                        key={`${colIdx}-${idx}`}
                        to={item.path}
                        className="group relative block overflow-hidden rounded-3xl min-h-[220px] sm:min-h-[260px] isolate"
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-900 to-[#020617]" />
                        )}
                        <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
                        <div className="relative z-10 flex flex-col justify-start h-full min-h-[220px] sm:min-h-[260px] p-5 sm:p-6">
                          <span className="text-sm font-semibold text-white mb-2">{item.type}</span>
                          <h3 className="font-bold text-white text-base sm:text-[1.05rem] leading-snug line-clamp-4 group-hover:text-brand-100 transition-colors">
                            {item.title}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="section-pad bg-white border-y border-slate-200">
        <div className="container-wide text-center">
          <h2 className="section-title mb-4">EWO's Achievements</h2>
          <p className="text-muted max-w-2xl mx-auto mb-14">Empowering businesses worldwide with innovative solutions backed by a global presence.</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((st, i) => (
              <div key={i} className="p-6">
                <div className="text-4xl md:text-5xl font-extrabold text-brand-700 mb-2">{st.value}</div>
                <div className="text-sm text-muted uppercase tracking-wide">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      {technologies.length > 0 && (
        <section className="section-pad bg-surface">
          <div className="container-wide">
            <h2 className="section-title mb-2">What's your stack?</h2>
            <p className="section-subtitle mb-8">We work with the technologies your team already trusts.</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {techCategories.map((cat) => (
                <button key={cat} onClick={() => setTechFilter(cat)} className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${techFilter === cat ? 'bg-brand-600 text-white border-brand-600' : 'border-slate-300 text-muted hover:border-brand-600 bg-white'}`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {filteredTech.map((t) => (
                <span key={t.technologyId} className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-ink shadow-sm">{t.name}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Careers CTA */}
      <section className="section-pad bg-white">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-700 to-brand-900 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="relative z-10 text-white">
              <h2 className="text-3xl font-bold mb-3">{settings.careers_title || 'Human-first is our foundation.'}</h2>
              <p className="text-brand-100 max-w-lg">{settings.careers_subtitle || 'Join a culture that celebrates excellence and diversity, globally.'}</p>
            </div>
            <Link to="/careers" className="btn-primary !bg-white !text-brand-700 hover:!bg-slate-100 shrink-0 relative z-10">Join Us</Link>
          </div>
        </div>
      </section>

      {/* Leadership */}
      {team.length > 0 && (
        <section className="section-pad bg-surface">
          <div className="container-wide">
            <h2 className="section-title mb-10">Our Global Leadership</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {team.map((m) => (
                <div key={m.teamMemberId} className="card p-4 text-center group">
                  <img src={m.imageUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300'} alt={m.fullName} className="w-full aspect-square object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform" />
                  <h3 className="font-bold text-sm text-brand-700">{m.fullName}</h3>
                  <p className="text-xs text-brand-600 mt-1">{m.designation}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Global Presence */}
      {offices.length > 0 && (
        <section className="section-pad bg-white">
          <div className="container-wide">
            <p className="section-eyebrow">Global Presence</p>
            <h2 className="section-title mb-4">Offices near you</h2>
            <p className="section-subtitle mb-10">We're across multiple continents — explore our office nearest to you.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {offices.map((o) => (
                <div key={o.officeId} className="card p-6 hover:border-brand-500">
                  <p className="text-xs font-bold text-brand-600 uppercase mb-1">{o.country}</p>
                  <h3 className="font-bold text-lg text-brand-700 mb-1">{o.officeTitle || o.city}</h3>
                  {o.officeTitle && <p className="text-sm font-semibold text-ink mb-2">{o.city}</p>}
                  <p className="text-sm text-muted">{o.address}</p>
                  {o.phone && <p className="text-sm text-muted mt-2">{o.phone}</p>}
                  {o.email && <p className="text-sm text-muted mt-1">{o.email}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="section-pad bg-[#083D70] text-white text-center">
        <div className="container-wide">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready To Get Started?</h2>
          <p className="text-brand-100 mb-8 max-w-xl mx-auto text-lg">Connect with us to explore how we can deliver exceptional IT solutions tailored to your needs.</p>
          <Link to="/contact" className="btn-primary !bg-white !text-brand-700 hover:!bg-slate-100 gap-2">
            Let's Talk Business <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
      </>
      )}
    </div>
  );
}
