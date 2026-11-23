import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import api from '../utils/api';

export default function PageDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    api.get(`/pages/${slug}`)
      .then((res) => {
        setPage(res.data);
        document.title = `${res.data.pageName} | EWO Technologies`;
      })
      .catch(() => navigate('/pages'))
      .finally(() => setLoading(false));

    api.get('/pages')
      .then((res) => setRelated(res.data.filter((p: any) => p.slug !== slug).slice(0, 5)))
      .catch(() => {});
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  if (!page) return null;

  return (
    <div className="section-pad bg-white">
      <div className="container-wide">
        <Link to="/pages" className="inline-flex items-center gap-2 text-sm text-muted hover:text-brand-600 transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Back to all pages
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-700 tracking-tight leading-tight">{page.pageName}</h1>
            <div className="space-y-4">
              {page.content ? (
                page.content.split('\n').map((paragraph: string, idx: number) => (
                  <p key={idx} className="text-muted text-base leading-relaxed">{paragraph}</p>
                ))
              ) : (
                <p className="text-muted">Content is being prepared.</p>
              )}
            </div>
          </div>

          <div>
            <div className="card p-6">
              <h3 className="text-lg font-bold text-brand-700 mb-5 pb-3 border-b border-slate-100">More Pages</h3>
              <div className="space-y-2">
                {related.map((item) => (
                  <Link
                    key={item.pageId}
                    to={`/pages/${item.slug}`}
                    className="flex items-center justify-between p-3.5 rounded-xl hover:bg-brand-50 transition-colors group text-sm text-ink hover:text-brand-700"
                  >
                    <span className="font-medium line-clamp-1">{item.pageName}</span>
                    <ChevronRight className="w-4 h-4 text-muted group-hover:text-brand-600 transition-transform group-hover:translate-x-1 flex-shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
