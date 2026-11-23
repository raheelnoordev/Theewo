import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, CheckCircle2, AlertCircle, Loader, CalendarDays, MessageSquare } from 'lucide-react';
import api from '../utils/api';
import PageHero from '../components/PageHero';

const APPOINTMENT_SERVICES = [
  'Website Development',
  'Mobile App Development',
  'AI Solutions',
  'Digital Marketing',
  'SEO',
  'Branding & Graphic Design',
  'UI/UX Design',
  'E-Commerce Solutions',
  'Custom Software Development',
  'ERP/CRM Solutions',
  'Cloud Solutions',
  'IT Consultancy',
  'Other',
];

const MEETING_TYPES = ['Google Meet', 'Zoom', 'Microsoft Teams', 'Phone Call', 'Office Visit'];
const BUDGETS = [
  'Under $5,000',
  '$5,000–$15,000',
  '$15,000–$50,000',
  'Above $50,000',
  "Let's Discuss",
];
const TIMELINES = ['ASAP', 'Within 1 Month', '1–3 Months', '3+ Months'];
const HEAR_ABOUT = ['Google', 'Facebook', 'LinkedIn', 'Instagram', 'Referral', 'Existing Client', 'Other'];
const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
];

const emptyAppt = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  country: '',
  city: '',
  service: 'Website Development',
  preferredDate: '',
  preferredTime: '10:00 AM',
  meetingType: 'Google Meet',
  projectBudget: "Let's Discuss",
  projectTimeline: 'Within 1 Month',
  projectDescription: '',
  heardAboutUs: 'Google',
  agreePrivacy: false,
};

export default function Contact() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'appointment' ? 'appointment' : 'inquiry';
  const [activeTab, setActiveTab] = useState<'inquiry' | 'appointment'>(initialTab);

  useEffect(() => {
    if (searchParams.get('tab') === 'appointment') setActiveTab('appointment');
  }, [searchParams]);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [serviceInterest, setServiceInterest] = useState('Web Development');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [appt, setAppt] = useState(emptyAppt);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [apptSubmitting, setApptSubmitting] = useState(false);
  const [apptSubmitted, setApptSubmitted] = useState(false);
  const [apptError, setApptError] = useState('');
  const [apptSuccessMsg, setApptSuccessMsg] = useState('');

  const [offices, setOffices] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    api.get('/offices').then((r) => setOffices(r.data.filter((o: any) => o.isActive))).catch(() => {});
    api.get('/services').then((r) => setServices(r.data.filter((s: any) => s.isActive))).catch(() => {});
  }, []);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);
    try {
      await api.post('/contact', { fullName, email, phone, companyName, serviceInterest, message });
      setSubmitted(true);
      setFullName(''); setEmail(''); setPhone(''); setCompanyName(''); setMessage('');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleApptChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setAppt({ ...appt, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setAppt({ ...appt, [name]: value });
    }
  };

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApptError('');
    if (!appt.agreePrivacy) {
      setApptError('Please agree to the Privacy Policy to continue.');
      return;
    }
    setApptSubmitting(true);
    try {
      const form = new FormData();
      Object.entries(appt).forEach(([key, value]) => {
        form.append(key, String(value));
      });
      if (attachment) form.append('attachment', attachment);

      const res = await api.post('/appointments', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setApptSuccessMsg(res.data?.message || 'Thank you! Your appointment request has been received successfully.');
      setApptSubmitted(true);
      setAppt(emptyAppt);
      setAttachment(null);
    } catch (err: any) {
      setApptError(err.response?.data?.message || 'Failed to book appointment. Please try again.');
    } finally {
      setApptSubmitting(false);
    }
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div>
      <PageHero
        eyebrow="Let's Talk"
        title="Tell Us About Your Initiative"
        subtitle="Send a project inquiry or book a free consultation. Our team responds within one business day."
      />

      <div className="container-wide pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 p-1 bg-surface rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab('inquiry')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'inquiry' ? 'bg-white text-brand-700 shadow-sm' : 'text-muted hover:text-ink'
                }`}
              >
                <MessageSquare className="w-4 h-4" /> Project Inquiry
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('appointment')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'appointment' ? 'bg-white text-brand-700 shadow-sm' : 'text-muted hover:text-ink'
                }`}
              >
                <CalendarDays className="w-4 h-4" /> Book Appointment
              </button>
            </div>

            {/* Inquiry tab */}
            {activeTab === 'inquiry' && (
              <div className="card p-8 md:p-10">
                <h2 className="text-2xl font-bold text-brand-700 mb-2">Project Inquiry</h2>
                <p className="text-sm text-muted mb-8 pb-6 border-b border-slate-200">All fields marked * are required.</p>

                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                    <h3 className="text-xl font-bold text-brand-700">Message Sent Successfully!</h3>
                    <p className="text-sm text-muted max-w-md mx-auto">
                      Thank you for reaching out. We'll review your submission and connect within one business day.
                    </p>
                    <button onClick={() => setSubmitted(false)} className="btn-outline mt-4">Send Another Message</button>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-6">
                    {errorMsg && (
                      <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="form-label">Full Name *</label>
                        <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="form-input" placeholder="E.g. Alexander Vance" />
                      </div>
                      <div>
                        <label className="form-label">Email Address *</label>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" placeholder="E.g. alex@company.com" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="form-label">Phone Number</label>
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-input" placeholder="E.g. +1 (214) 555-0199" />
                      </div>
                      <div>
                        <label className="form-label">Company Name</label>
                        <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="form-input" placeholder="E.g. FinFlow Corp" />
                      </div>
                    </div>
                    <div>
                      <label className="form-label">Service Interest *</label>
                      <select value={serviceInterest} onChange={(e) => setServiceInterest(e.target.value)} className="form-input">
                        {services.length > 0 ? (
                          services.map((s) => <option key={s.serviceId} value={s.title}>{s.title}</option>)
                        ) : (
                          <>
                            <option>Custom Software Development</option>
                            <option>AI & Automation</option>
                            <option>Cloud & DevOps</option>
                          </>
                        )}
                        <option>Other / Not sure yet</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label">Message / Requirements *</label>
                      <textarea rows={6} required value={message} onChange={(e) => setMessage(e.target.value)} className="form-input resize-none" placeholder="Outline your goals, timeline, or technical requirements..." />
                    </div>
                    <button type="submit" disabled={submitting} className="btn-primary w-full !py-4">
                      {submitting ? <Loader className="w-4 h-4 animate-spin" /> : 'Send Inquiry'}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Appointment tab */}
            {activeTab === 'appointment' && (
              <div className="card p-8 md:p-10">
                <h2 className="text-2xl font-bold text-brand-700 mb-2">Book Free Consultation</h2>
                <p className="text-sm text-muted mb-8 pb-6 border-b border-slate-200">
                  Schedule a meeting with our team. Fields marked * are required.
                </p>

                {apptSubmitted ? (
                  <div className="text-center py-12 space-y-4">
                    <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                    <h3 className="text-xl font-bold text-brand-700">Appointment Request Received</h3>
                    <p className="text-sm text-muted max-w-lg mx-auto leading-relaxed">
                      {apptSuccessMsg || 'Thank you! Your appointment request has been received successfully. Our team will contact you within 24 business hours to confirm your meeting.'}
                    </p>
                    <button
                      onClick={() => { setApptSubmitted(false); setApptSuccessMsg(''); }}
                      className="btn-outline mt-4"
                    >
                      Book Another Appointment
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleAppointmentSubmit} className="space-y-5">
                    {apptError && (
                      <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{apptError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="form-label">Full Name *</label>
                        <input type="text" name="fullName" required value={appt.fullName} onChange={handleApptChange} className="form-input" />
                      </div>
                      <div>
                        <label className="form-label">Company Name</label>
                        <input type="text" name="companyName" value={appt.companyName} onChange={handleApptChange} className="form-input" />
                      </div>
                      <div>
                        <label className="form-label">Email Address *</label>
                        <input type="email" name="email" required value={appt.email} onChange={handleApptChange} className="form-input" />
                      </div>
                      <div>
                        <label className="form-label">Phone / WhatsApp *</label>
                        <input type="tel" name="phone" required value={appt.phone} onChange={handleApptChange} className="form-input" placeholder="+92 ..." />
                      </div>
                      <div>
                        <label className="form-label">Country</label>
                        <input type="text" name="country" value={appt.country} onChange={handleApptChange} className="form-input" />
                      </div>
                      <div>
                        <label className="form-label">City</label>
                        <input type="text" name="city" value={appt.city} onChange={handleApptChange} className="form-input" />
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Select Service *</label>
                      <select name="service" required value={appt.service} onChange={handleApptChange} className="form-input">
                        {APPOINTMENT_SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label className="form-label">Preferred Date *</label>
                        <input type="date" name="preferredDate" required min={minDate} value={appt.preferredDate} onChange={handleApptChange} className="form-input" />
                      </div>
                      <div>
                        <label className="form-label">Preferred Time *</label>
                        <select name="preferredTime" required value={appt.preferredTime} onChange={handleApptChange} className="form-input">
                          {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="form-label">Meeting Type *</label>
                        <select name="meetingType" required value={appt.meetingType} onChange={handleApptChange} className="form-input">
                          {MEETING_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="form-label">Project Budget</label>
                        <select name="projectBudget" value={appt.projectBudget} onChange={handleApptChange} className="form-input">
                          {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="form-label">Project Timeline</label>
                        <select name="projectTimeline" value={appt.projectTimeline} onChange={handleApptChange} className="form-input">
                          {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Project Description / Requirements *</label>
                      <textarea name="projectDescription" rows={5} required value={appt.projectDescription} onChange={handleApptChange} className="form-input resize-none" placeholder="Tell us about your goals, scope, and any must-have features..." />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="form-label">File Upload</label>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
                          onChange={(e) => setAttachment(e.target.files?.[0] || null)}
                          className="form-input file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand-50 file:text-brand-700"
                        />
                        <p className="text-[11px] text-muted mt-1">PDF, Word, image, or ZIP — max 10MB</p>
                      </div>
                      <div>
                        <label className="form-label">How did you hear about us?</label>
                        <select name="heardAboutUs" value={appt.heardAboutUs} onChange={handleApptChange} className="form-input">
                          {HEAR_ABOUT.map((h) => <option key={h} value={h}>{h}</option>)}
                        </select>
                      </div>
                    </div>

                    <label className="flex items-start gap-3 text-sm text-ink cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreePrivacy"
                        checked={appt.agreePrivacy}
                        onChange={handleApptChange}
                        className="mt-1 rounded border-slate-300"
                      />
                      <span>I agree to the Privacy Policy and consent to EWO Technologies contacting me about this consultation. *</span>
                    </label>

                    <button type="submit" disabled={apptSubmitting} className="btn-primary w-full !py-4">
                      {apptSubmitting ? <Loader className="w-4 h-4 animate-spin" /> : 'Book Free Consultation'}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card p-6 space-y-5">
              <h3 className="text-lg font-bold text-brand-700 pb-3 border-b border-slate-200">Get in Touch</h3>
              <div className="flex items-start gap-3 text-sm">
                <Mail className="w-5 h-5 text-brand-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-ink">Email</p>
                  <p className="text-muted">hello@theewotech.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Phone className="w-5 h-5 text-brand-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-ink">Phone</p>
                  <p className="text-muted">+1 (214) 555-0199</p>
                </div>
              </div>
            </div>

            {offices.map((office) => (
              <div key={office.officeId} className="card p-6">
                <span className="text-[10px] font-bold text-brand-600 uppercase tracking-widest">{office.country}</span>
                {office.officeTitle && (
                  <h4 className="text-lg font-bold text-brand-700 mt-1">{office.officeTitle}</h4>
                )}
                <p className={`text-sm font-semibold text-ink ${office.officeTitle ? 'mt-0.5 mb-3' : 'mt-1 mb-3'}`}>{office.city}</p>
                <div className="flex items-start gap-2 text-sm text-muted">
                  <MapPin className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />
                  <span>{office.address}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
