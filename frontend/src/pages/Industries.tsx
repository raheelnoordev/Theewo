import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import api from '../utils/api';

export default function Industries() {
  const [industries, setIndustries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/industries')
      .then(res => {
        setIndustries(res.data.filter((i: any) => i.isActive));
      })
      .catch(err => console.error('Error fetching industries', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHero
        eyebrow="Industries"
        title="Sectors We Serve"
        subtitle="Domain-specific software, compliance, and optimized digital pathways across key global verticals."
      />

      <section className="section-pad bg-white">
        <div className="container-wide">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {industries.map((industry) => (
                <Link
                  key={industry.industryId}
                  to={`/industries/${industry.slug}`}
                  className="card overflow-hidden flex flex-col group hover:-translate-y-1 hover:border-brand-500"
                >
                  <div className="aspect-[16/10] bg-slate-100 overflow-hidden">
                    <img
                      src={industry.imageUrl || 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=400&q=80'}
                      alt={industry.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="text-lg font-bold text-brand-700 mb-2 group-hover:text-brand-600">{industry.title}</h3>
                    <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">{industry.shortDescription}</p>
                    <span className="text-xs text-brand-600 font-bold uppercase tracking-wider inline-flex items-center gap-1">
                      Explore Industry <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
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
