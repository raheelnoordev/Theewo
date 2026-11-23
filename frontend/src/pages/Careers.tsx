import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Clock, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import api from '../utils/api';

export default function Careers() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/jobs')
      .then(res => {
        setJobs(res.data.filter((j: any) => j.isActive));
      })
      .catch(err => console.error('Error fetching jobs', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHero
        eyebrow="Careers"
        title="Build Your Career with Us"
        subtitle="Join a global team of expert developers and architects working on cutting-edge enterprise platforms, LLMs, and cloud-native solutions."
      />

      <section className="section-pad bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
            {[
              { title: 'Global Exposure', desc: 'Work directly with international startups, high-speed scale-ups, and Fortune 550 corporations.' },
              { title: 'Advanced Technology', desc: 'Integrate tools like NextJS, Vite, Framer Motion, Kubernetes, and C# .NET 8 Web APIs.' },
              { title: 'Accelerated Progression', desc: 'Structured growth roadmaps from junior associate roles to principal systems architect designations.' }
            ].map((benefit, idx) => (
              <div key={idx} className="card p-7">
                <h3 className="text-lg font-bold text-brand-700 mb-3">{benefit.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="section-title text-2xl md:text-3xl mb-8">Active Openings</h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="empty-state">
              <p className="text-muted">There are no open positions at this moment. Feel free to check back later.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.jobId}
                  className="card p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-brand-500 group"
                >
                  <div>
                    <h3 className="text-xl font-bold text-brand-700 group-hover:text-brand-600 mb-1">{job.title}</h3>
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">{job.department}</span>
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-muted mt-4">
                      <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-brand-600" />{job.location}</span>
                      <span className="inline-flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-brand-600" />{job.jobType}</span>
                      <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-brand-600" />{job.experienceLevel}</span>
                    </div>
                  </div>
                  <Link to={`/careers/${job.slug}`} className="btn-primary !py-2.5 !px-5 text-xs shrink-0 gap-2">
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
