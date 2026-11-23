import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import api from '../utils/api';

export default function IndustryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [industry, setIndustry] = useState<any>(null);
  const [otherIndustries, setOtherIndustries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/industries/${slug}`)
      .then(res => {
        setIndustry(res.data);
        document.title = `${res.data.title} Solutions | EWO Technologies`;
      })
      .catch(() => navigate('/industries'))
      .finally(() => setLoading(false));

    api.get('/industries')
      .then(res => {
        setOtherIndustries(res.data.filter((i: any) => i.isActive && i.slug !== slug).slice(0, 5));
      })
      .catch(() => {});
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  if (!industry) return null;

  return (
    <div className="section-pad bg-white">
      <div className="container-wide">
        <Link to="/industries" className="inline-flex items-center gap-2 text-sm text-muted hover:text-brand-600 transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Back to sectors
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <p className="section-eyebrow">Sector Focus</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-700 tracking-tight">{industry.title} Solutions</h1>
            </div>

            <div className="rounded-2xl overflow-hidden h-[280px] sm:h-[320px] border border-slate-200 bg-surface">
              <img
                src={industry.imageUrl || 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80'}
                alt={industry.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6">
              {industry.shortDescription && (
                <p className="font-semibold text-lg text-brand-700 border-l-4 border-brand-600 pl-4 py-3 bg-brand-50 rounded-r-xl">
                  {industry.shortDescription}
                </p>
              )}
              <div className="space-y-4">
                {industry.description ? (
                  industry.description.split('\n').map((paragraph: string, idx: number) => (
                    <p key={idx} className="text-muted text-base leading-relaxed">{paragraph}</p>
                  ))
                ) : (
                  <p className="text-muted">Detailed sector integration blueprints are currently being drafted for this industry.</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-bold text-brand-700 mb-5 pb-3 border-b border-slate-100">Other Industry Verticals</h3>
              <div className="space-y-2">
                {otherIndustries.map((ind) => (
                  <Link
                    key={ind.industryId}
                    to={`/industries/${ind.slug}`}
                    className="flex items-center justify-between p-3.5 rounded-xl hover:bg-brand-50 transition-colors group text-sm text-ink hover:text-brand-700"
                  >
                    <span className="font-medium">{ind.title}</span>
                    <ChevronRight className="w-4 h-4 text-muted group-hover:text-brand-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-brand-600 text-white p-8 text-center">
              <h3 className="text-xl font-bold mb-3">Accelerate Your Product Scaling</h3>
              <p className="text-sm text-brand-100 mb-6 leading-relaxed">
                We consult on regulatory standards, system audits, and hybrid setups for secure and rapid deployment.
              </p>
              <Link to="/contact" className="btn-primary !bg-white !text-brand-700 hover:!bg-slate-100 w-full">
                Consult an Expert
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
