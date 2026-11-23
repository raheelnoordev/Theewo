import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase, Clock, CheckCircle2, AlertCircle, Loader } from 'lucide-react';
import api from '../utils/api';
import PageHero from '../components/PageHero';

export default function JobDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/jobs/${slug}`)
      .then((res) => {
        setJob(res.data);
        document.title = `${res.data.title} | Careers | EWO Technologies`;
      })
      .catch(() => navigate('/careers'))
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);
    try {
      await api.post('/job-applications', {
        jobId: job.jobId, fullName, email, phone, linkedInUrl, portfolioUrl, resumeUrl, coverLetter,
      });
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Failed to submit application.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin h-8 w-8 border-2 border-brand-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!job) return null;

  return (
    <div>
      <PageHero eyebrow={job.department} title={job.title} subtitle={`${job.location} · ${job.jobType} · ${job.experienceLevel}`} />

      <div className="container-wide pb-20">
        <Link to="/careers" className="inline-flex items-center gap-2 text-sm text-muted hover:text-brand-600 mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to careers
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Job details */}
          <div className="lg:col-span-2 space-y-10">
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-slate-200 text-xs text-ink">
                <MapPin className="w-3.5 h-3.5 text-brand-600" />{job.location}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-slate-200 text-xs text-ink">
                <Briefcase className="w-3.5 h-3.5 text-brand-600" />{job.jobType}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-slate-200 text-xs text-ink">
                <Clock className="w-3.5 h-3.5 text-brand-600" />{job.experienceLevel}
              </span>
            </div>

            {job.description && (
              <div>
                <h2 className="text-2xl font-bold text-brand-700 mb-4">Position Overview</h2>
                <p className="text-muted leading-relaxed whitespace-pre-line">{job.description}</p>
              </div>
            )}
            {job.requirements && (
              <div>
                <h2 className="text-2xl font-bold text-brand-700 mb-4">Qualifications & Requirements</h2>
                <p className="text-muted leading-relaxed whitespace-pre-line">{job.requirements}</p>
              </div>
            )}
            {job.responsibilities && (
              <div>
                <h2 className="text-2xl font-bold text-brand-700 mb-4">Key Responsibilities</h2>
                <p className="text-muted leading-relaxed whitespace-pre-line">{job.responsibilities}</p>
              </div>
            )}
          </div>

          {/* Application form */}
          <div className="card p-6 md:p-8 h-fit sticky top-24">
            <h3 className="text-xl font-bold text-brand-700 mb-2">Apply for this Role</h3>
            <p className="text-sm text-muted mb-6 pb-4 border-b border-slate-200">Submit your details below.</p>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
                <h4 className="text-lg font-bold text-brand-700">Application Received!</h4>
                <p className="text-sm text-muted">Our team will review your application and be in touch.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" /><span>{errorMsg}</span>
                  </div>
                )}
                <div>
                  <label className="form-label">Full Name *</label>
                  <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="form-input" placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="form-label">Email *</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" placeholder="jane@email.com" />
                </div>
                <div>
                  <label className="form-label">Phone</label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-input" placeholder="+1 234 567 8900" />
                </div>
                <div>
                  <label className="form-label">LinkedIn URL</label>
                  <input type="url" value={linkedInUrl} onChange={(e) => setLinkedInUrl(e.target.value)} className="form-input" placeholder="https://linkedin.com/in/..." />
                </div>
                <div>
                  <label className="form-label">Portfolio URL</label>
                  <input type="url" value={portfolioUrl} onChange={(e) => setPortfolioUrl(e.target.value)} className="form-input" placeholder="https://..." />
                </div>
                <div>
                  <label className="form-label">Resume PDF URL *</label>
                  <input type="url" required value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)} className="form-input" placeholder="Google Drive / Dropbox link" />
                </div>
                <div>
                  <label className="form-label">Cover Letter</label>
                  <textarea rows={4} value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} className="form-input resize-none" placeholder="Why are you a great fit?" />
                </div>
                <button type="submit" disabled={submitting} className="btn-primary w-full">
                  {submitting ? <Loader className="w-4 h-4 animate-spin" /> : 'Submit Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
