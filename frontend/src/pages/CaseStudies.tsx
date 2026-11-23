import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import api from '../utils/api';

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/case-studies')
      .then(res => {
        setCaseStudies(res.data.filter((c: any) => c.isActive));
      })
      .catch(err => console.error('Error fetching case studies', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHero
        eyebrow="Process"
        title="Case Studies"
        subtitle="See how our engineering teams optimize codebases, automate architectures, and deliver measurable business outcomes."
      />

      <section className="section-pad bg-white">
        <div className="container-wide">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies.map((cs) => (
                <Link
                  key={cs.caseStudyId}
                  to={`/case-studies/${cs.slug}`}
                  className="card overflow-hidden flex flex-col group hover:-translate-y-1 hover:border-brand-500"
                >
                  <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
                    <img
                      src={cs.imageUrl || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80'}
                      alt={cs.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {cs.clientName && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-600 text-white text-xs font-semibold">
                        {cs.clientName}
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-lg font-bold text-brand-700 mb-3 leading-snug line-clamp-2 group-hover:text-brand-600">{cs.title}</h3>
                    <p className="text-muted text-sm leading-relaxed mb-5 line-clamp-3 flex-grow">{cs.shortDescription}</p>
                    <span className="text-xs text-brand-600 font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                      Read Study <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
