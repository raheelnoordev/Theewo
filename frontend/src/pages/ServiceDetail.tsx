import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, Smartphone, Palette, Cpu, Sparkles, Cloud, ShieldCheck, Users, ShoppingBag, Lock, ChevronRight } from 'lucide-react';
import api from '../utils/api';

const iconMap: { [key: string]: any } = {
  Globe, Smartphone, Palette, Cpu, Sparkles, Cloud, ShieldCheck, Users, ShoppingBag, Lock
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null);
  const [otherServices, setOtherServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/services/${slug}`)
      .then(res => {
        setService(res.data);
        document.title = res.data.metaTitle || `${res.data.title} | EWO Technologies`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute('content', res.data.metaDescription || res.data.shortDescription || '');
        }
      })
      .catch(() => navigate('/services'))
      .finally(() => setLoading(false));

    api.get('/services')
      .then(res => {
        setOtherServices(res.data.filter((s: any) => s.isActive && s.slug !== slug).slice(0, 5));
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

  if (!service) return null;

  const IconComponent = iconMap[service.icon || 'Globe'] || Globe;

  return (
    <div className="section-pad bg-white">
      <div className="container-wide">
        <Link to="/services" className="inline-flex items-center gap-2 text-sm text-muted hover:text-brand-600 transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Back to all capabilities
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
                <IconComponent className="w-7 h-7" />
              </div>
              <div>
                <p className="section-eyebrow mb-2">Service Overview</p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-700 tracking-tight">{service.title}</h1>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden h-[280px] sm:h-[320px] border border-slate-200 bg-surface">
              <img
                src={service.imageUrl || 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80'}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6">
              {service.shortDescription && (
                <p className="font-semibold text-lg text-brand-700 border-l-4 border-brand-600 pl-4 py-3 bg-brand-50 rounded-r-xl">
                  {service.shortDescription}
                </p>
              )}
              <div className="text-ink text-base leading-relaxed space-y-4">
                {service.description ? (
                  service.description.split('\n').map((paragraph: string, idx: number) => (
                    <p key={idx} className="text-muted">{paragraph}</p>
                  ))
                ) : (
                  <p className="text-muted">No description provided for this service yet.</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-bold text-brand-700 mb-5 pb-3 border-b border-slate-100">Other Specialties</h3>
              <div className="space-y-2">
                {otherServices.map((s) => (
                  <Link
                    key={s.serviceId}
                    to={`/services/${s.slug}`}
                    className="flex items-center justify-between p-3.5 rounded-xl hover:bg-brand-50 transition-colors group text-sm text-ink hover:text-brand-700"
                  >
                    <span className="font-medium">{s.title}</span>
                    <ChevronRight className="w-4 h-4 text-muted group-hover:text-brand-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-brand-600 text-white p-8 text-center">
              <h3 className="text-xl font-bold mb-3">Have a Project in Mind?</h3>
              <p className="text-sm text-brand-100 mb-6 leading-relaxed">
                Consult with our technology directors to establish your architecture roadmap and product milestones.
              </p>
              <Link to="/contact" className="btn-primary !bg-white !text-brand-700 hover:!bg-slate-100 w-full">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
