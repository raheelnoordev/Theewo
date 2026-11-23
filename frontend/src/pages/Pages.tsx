import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import api from '../utils/api';

export default function Pages() {
  const [pages, setPages] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/pages')
      .then((res) => setPages(res.data))
      .catch((err) => console.error('Error fetching pages', err))
      .finally(() => setLoading(false));
  }, []);

  const filteredPages = pages.filter((page) =>
    page.pageName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <PageHero
        eyebrow="Insights"
        title="Insights & Resources"
        subtitle="Company updates, technical insights, and resources managed from the admin portal."
      >
        <div className="relative w-full max-w-md mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input pl-10"
          />
        </div>
      </PageHero>

      <section className="section-pad bg-surface">
        <div className="container-wide">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
            </div>
          ) : filteredPages.length === 0 ? (
            <div className="empty-state">
              <p className="text-muted">No pages match your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPages.map((page) => (
                <Link
                  key={page.pageId}
                  to={`/pages/${page.slug}`}
                  className="card p-6 flex flex-col group hover:-translate-y-1 hover:border-brand-500 bg-white"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600 mb-3">Resource</span>
                  <h3 className="text-lg font-bold text-brand-700 mb-3 leading-snug group-hover:text-brand-600">{page.pageName}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {page.metaDescription || 'Read more about this topic.'}
                  </p>
                  <span className="text-xs text-brand-600 font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mt-auto">
                    Read More <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
