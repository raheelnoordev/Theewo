import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import PageHero from '../components/PageHero';
import api from '../utils/api';

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function About() {
  const [team, setTeam] = useState<any[]>([]);
  const [offices, setOffices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamRes, officesRes] = await Promise.all([
          api.get('/team-members'),
          api.get('/offices'),
        ]);
        setTeam(teamRes.data.filter((tm: any) => tm.isActive));
        setOffices(officesRes.data.filter((o: any) => o.isActive));
      } catch (err) {
        console.error('Error fetching about page data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <PageHero
        eyebrow="About"
        title="Building Software That Powers Growth"
        subtitle="EWO Technologies is a global product engineering firm helping organizations design, build, and scale digital platforms with confidence."
      />

      <div className="container-wide section-pad space-y-16">
        <section>
          <h2 className="section-title text-center mb-10">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Engineering Excellence', desc: 'We build maintainable React, Node.js, and cloud-native systems — designed for long-term product evolution, not short-term shortcuts.' },
              { title: 'Transparent Partnership', desc: 'Clients get direct access to delivery leads, clear sprint reporting, and shared tools so progress is always visible.' },
              { title: 'Outcome-Driven Delivery', desc: 'We optimize for business impact: faster releases, stronger reliability, and measurable improvements in user and operational KPIs.' }
            ].map((value, idx) => (
              <div key={idx} className="card p-8">
                <h3 className="text-lg font-bold text-brand-700 mb-3">{value.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title text-center mb-3">Meet the Leadership</h2>
          <p className="text-muted text-center mb-10 max-w-xl mx-auto text-sm">
            Industry-tested experts leading our design, engineering, and cloud divisions.
          </p>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member) => (
                <div key={member.teamMemberId} className="card overflow-hidden flex flex-col">
                  <div className="aspect-square overflow-hidden relative bg-surface">
                    <img
                      src={member.imageUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&h=300&q=80'}
                      alt={member.fullName}
                      className="w-full h-full object-cover"
                    />
                    {member.linkedInUrl && (
                      <a
                        href={member.linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-4 right-4 p-2 rounded-full bg-brand-600 hover:bg-brand-700 text-white transition-colors"
                      >
                        <LinkedinIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-brand-700 mb-1">{member.fullName}</h3>
                    <span className="text-xs font-semibold text-brand-600 block mb-3 uppercase tracking-wider">{member.designation}</span>
                    <p className="text-sm text-muted leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="section-title text-center mb-3">Our Hub Locations</h2>
          <p className="text-muted text-center mb-10 max-w-xl mx-auto text-sm">
            Stop by or contact our offices to meet local team leads.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offices.map((office) => (
              <div key={office.officeId} className="card p-8 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-brand-600 uppercase tracking-widest block mb-2">{office.country}</span>
                  <h3 className="text-xl font-bold text-brand-700 mb-1">
                    {office.officeTitle || office.city}
                  </h3>
                  {office.officeTitle && (
                    <p className="text-sm font-semibold text-ink mb-4">{office.city}</p>
                  )}
                  <div className="flex items-start gap-3 text-muted text-sm mb-3">
                    <MapPin className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
                    <span>{office.address}</span>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-5 mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {office.phone && (
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <Phone className="w-3.5 h-3.5 text-brand-600" />
                      <span>{office.phone}</span>
                    </div>
                  )}
                  {office.email && (
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <Mail className="w-3.5 h-3.5 text-brand-600" />
                      <span>{office.email}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
