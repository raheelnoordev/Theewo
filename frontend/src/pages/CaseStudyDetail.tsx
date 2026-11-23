import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import api from '../utils/api';

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [cs, setCs] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/case-studies/${slug}`)
      .then(res => {
        setCs(res.data);
        document.title = `${res.data.title} | EWO Technologies Case Study`;
      })
      .catch(() => navigate('/case-studies'))
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  if (!cs) return null;

  return (
    <div className="section-pad bg-white">
      <div className="container-wide">
        <Link to="/case-studies" className="inline-flex items-center gap-2 text-sm text-muted hover:text-brand-600 transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Back to all case studies
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              {cs.clientName && (
                <span className="inline-block px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-xs font-semibold text-brand-700 uppercase tracking-wider mb-4">
                  Client: {cs.clientName}
                </span>
              )}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-700 tracking-tight leading-tight">{cs.title}</h1>
            </div>

            <div className="rounded-2xl overflow-hidden h-[300px] sm:h-[360px] border border-slate-200 bg-surface">
              <img
                src={cs.imageUrl || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80'}
                alt={cs.title}
                className="w-full h-full object-cover"
              />
            </div>

            {cs.shortDescription && (
              <div className="p-6 bg-brand-50 border border-brand-100 rounded-2xl">
                <h3 className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-2">Project Brief</h3>
                <p className="text-ink text-sm leading-relaxed">{cs.shortDescription}</p>
              </div>
            )}

            {cs.problem && (
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-bold text-brand-700 border-b border-slate-200 pb-2">The Challenge</h2>
                <p className="text-muted text-sm leading-relaxed whitespace-pre-line">{cs.problem}</p>
              </div>
            )}

            {cs.solution && (
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-bold text-brand-700 border-b border-slate-200 pb-2">Our Engineering Response</h2>
                <p className="text-muted text-sm leading-relaxed whitespace-pre-line">{cs.solution}</p>
              </div>
            )}

            {cs.resultSummary && (
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-bold text-brand-700 border-b border-slate-200 pb-2">Business Impact & Metrics</h2>
                <p className="text-muted text-sm leading-relaxed whitespace-pre-line">{cs.resultSummary}</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="card p-6 text-center">
              <h3 className="text-lg font-bold text-brand-700 mb-5 pb-3 border-b border-slate-100">Case Attachments</h3>
              {cs.pdfUrl ? (
                <a
                  href={cs.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full gap-2"
                >
                  <Download className="w-4 h-4 text-brand-600" />
                  Download PDF Summary
                </a>
              ) : (
                <p className="text-sm text-muted">No attachments are linked to this case record.</p>
              )}
            </div>

            <div className="rounded-2xl bg-brand-600 text-white p-8 text-center">
              <h3 className="text-xl font-bold mb-3">Replicate This Project Outcome</h3>
              <p className="text-sm text-brand-100 mb-6 leading-relaxed">
                Contact our digital product strategist to discuss resource allocations, framework stacks, and timelines.
              </p>
              <Link to="/contact" className="btn-primary !bg-white !text-brand-700 hover:!bg-slate-100 w-full">
                Analyze Project Scope
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
