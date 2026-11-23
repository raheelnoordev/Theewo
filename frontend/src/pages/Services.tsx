import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Smartphone, Palette, Cpu, Sparkles, Cloud, ShieldCheck, Users, ShoppingBag, Lock } from 'lucide-react';
import PageHero from '../components/PageHero';
import api from '../utils/api';

const iconMap: { [key: string]: any } = {
  Globe, Smartphone, Palette, Cpu, Sparkles, Cloud, ShieldCheck, Users, ShoppingBag, Lock
};

export default function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/services')
      .then(res => {
        setServices(res.data.filter((s: any) => s.isActive));
      })
      .catch(err => console.error('Error fetching services', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHero
        eyebrow="Solutions"
        title="Our Capabilities"
        subtitle="From high-performance frontend designs to scalable cloud deployments, we build custom solutions matching strict performance SLAs."
      />

      <section className="section-pad bg-white">
        <div className="container-wide">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const IconComponent = iconMap[service.icon || 'Globe'] || Globe;
                return (
                  <Link
                    key={service.serviceId}
                    to={`/services/${service.slug}`}
                    className="card p-8 flex flex-col justify-between group hover:-translate-y-1 hover:border-brand-500"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 mb-6">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-brand-700 mb-3 group-hover:text-brand-600">{service.title}</h3>
                      <p className="text-muted text-sm leading-relaxed mb-6 line-clamp-3">{service.shortDescription}</p>
                    </div>
                    <span className="text-sm text-brand-600 font-semibold inline-flex items-center gap-1.5">
                      Learn more <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
