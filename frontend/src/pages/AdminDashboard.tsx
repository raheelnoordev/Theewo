import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Globe, Building, Briefcase, FileText, FolderOpen, 
  MessageSquare, UserCheck, Users, Settings, Mail, MapPin, Star, Plus, 
  Edit, Trash2, LogOut, Eye, Check, X, Loader, AlertCircle, Image, CalendarDays, Trophy, Handshake 
} from 'lucide-react';
import api from '../utils/api';
import MediaUploadField from '../components/admin/MediaUploadField';

type TabType = 
  | 'dashboard' | 'services' | 'industries' | 'caseStudies' 
  | 'pages' | 'jobs' | 'applications' 
  | 'messages' | 'appointments' | 'offices' | 'testimonials' | 'team' 
  | 'clientLogos' | 'awards' | 'partnerships' | 'settings';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [adminUser, setAdminUser] = useState<any>(null);

  // Stats State
  const [stats, setStats] = useState<any>(null);
  
  // Lists State
  const [listData, setListData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Modal / Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null); // null if adding
  const [formData, setFormData] = useState<any>({});
  const [isUploading, setIsUploading] = useState(false);

  // Check login on load
  useEffect(() => {
    const userStr = localStorage.getItem('admin_user');
    const token = localStorage.getItem('admin_token');
    if (!token || !userStr) {
      navigate('/admin/login');
      return;
    }
    setAdminUser(JSON.parse(userStr));
  }, []);

  // Fetch data based on active tab
  useEffect(() => {
    if (activeTab === 'dashboard') {
      fetchStats();
    } else {
      fetchTabData();
    }
  }, [activeTab]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await api.get('/dashboard/stats');
      setStats(res.data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Failed to retrieve dashboard summaries.');
    } finally {
      setLoading(false);
    }
  };

  const fetchTabData = async () => {
    setLoading(true);
    setListData([]);
    setErrorMsg('');
    let endpoint = '';

    switch (activeTab) {
      case 'services': endpoint = '/services'; break;
      case 'industries': endpoint = '/industries'; break;
      case 'caseStudies': endpoint = '/case-studies'; break;
      case 'pages': endpoint = '/pages/admin/all'; break;
      case 'jobs': endpoint = '/jobs'; break;
      case 'applications': endpoint = '/job-applications'; break;
      case 'messages': endpoint = '/contact'; break;
      case 'appointments': endpoint = '/appointments'; break;
      case 'offices': endpoint = '/offices'; break;
      case 'testimonials': endpoint = '/testimonials'; break;
      case 'team': endpoint = '/team-members'; break;
      case 'clientLogos': endpoint = '/featured-logos'; break;
      case 'awards': endpoint = '/awards'; break;
      case 'partnerships': endpoint = '/partnerships'; break;
      case 'settings': endpoint = '/site-settings/list'; break;
    }

    try {
      const res = await api.get(endpoint);
      setListData(res.data);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to load table items.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/admin/login');
  };

  // Delete an item
  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    
    let endpoint = '';
    switch (activeTab) {
      case 'services': endpoint = `/services/${id}`; break;
      case 'industries': endpoint = `/industries/${id}`; break;
      case 'caseStudies': endpoint = `/case-studies/${id}`; break;
      case 'pages': endpoint = `/pages/${id}`; break;
      case 'jobs': endpoint = `/jobs/${id}`; break;
      case 'applications': endpoint = `/job-applications/${id}`; break;
      case 'messages': endpoint = `/contact/${id}`; break;
      case 'appointments': endpoint = `/appointments/${id}`; break;
      case 'offices': endpoint = `/offices/${id}`; break;
      case 'testimonials': endpoint = `/testimonials/${id}`; break;
      case 'team': endpoint = `/team-members/${id}`; break;
      case 'clientLogos': endpoint = `/featured-logos/${id}`; break;
      case 'awards': endpoint = `/awards/${id}`; break;
      case 'partnerships': endpoint = `/partnerships/${id}`; break;
      case 'settings': endpoint = `/site-settings/${id}`; break;
    }

    try {
      await api.delete(endpoint);
      fetchTabData();
    } catch (err) {
      console.error(err);
      alert('Delete action failed.');
    }
  };

  // Open Form modal for Add or Edit
  const openFormModal = (item: any = null) => {
    setEditItem(item);
    setErrorMsg('');

    // Prepopulate form values
    if (item) {
      setFormData({ ...item });
    } else {
      // Default empty values based on active tab
      let defaults: any = {};
      if (activeTab === 'services') {
        defaults = { title: '', slug: '', shortDescription: '', description: '', icon: 'Globe', imageUrl: '', displayOrder: 0, isFeatured: false, isActive: true };
      } else if (activeTab === 'industries') {
        defaults = { title: '', slug: '', shortDescription: '', description: '', imageUrl: '', displayOrder: 0, isActive: true };
      } else if (activeTab === 'caseStudies') {
        defaults = { title: '', slug: '', clientName: '', shortDescription: '', problem: '', solution: '', resultSummary: '', imageUrl: '', pdfUrl: '', metaTitle: '', metaDescription: '', isFeatured: false, isActive: true };
      } else if (activeTab === 'pages') {
        defaults = { pageName: '', slug: '', metaTitle: '', metaDescription: '', content: '', isActive: true };
      } else if (activeTab === 'jobs') {
        defaults = { title: '', slug: '', department: '', location: '', jobType: 'Full-time', experienceLevel: '', description: '', requirements: '', responsibilities: '', isActive: true };
      } else if (activeTab === 'offices') {
        defaults = { country: '', city: '', officeTitle: '', address: '', phone: '', email: '', latitude: 0, longitude: 0, displayOrder: 0, isActive: true };
      } else if (activeTab === 'testimonials') {
        defaults = { clientName: '', clientDesignation: '', companyName: '', message: '', imageUrl: '', rating: 5, isActive: true };
      } else if (activeTab === 'team') {
        defaults = { fullName: '', designation: '', bio: '', imageUrl: '', linkedInUrl: '', displayOrder: 0, isActive: true };
      } else if (activeTab === 'clientLogos') {
        defaults = { name: '', imageUrl: '', displayOrder: 0, isActive: true };
      } else if (activeTab === 'awards') {
        defaults = { title: '', imageUrl: '', displayOrder: 0, isActive: true };
      } else if (activeTab === 'partnerships') {
        defaults = { name: '', imageUrl: '', displayOrder: 0, isActive: true };
      } else if (activeTab === 'settings') {
        defaults = { settingKey: '', settingValue: '' };
      }
      setFormData(defaults);
    }
    setIsModalOpen(true);
  };

  // Form input update handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'number') {
      setFormData({ ...formData, [name]: parseFloat(value) || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit Add / Edit Form
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    let endpoint = '';
    let method = editItem ? 'put' : 'post';
    const idField = getTabIdField();

    switch (activeTab) {
      case 'services': endpoint = editItem ? `/services/${editItem[idField]}` : '/services'; break;
      case 'industries': endpoint = editItem ? `/industries/${editItem[idField]}` : '/industries'; break;
      case 'caseStudies': endpoint = editItem ? `/case-studies/${editItem[idField]}` : '/case-studies'; break;
      case 'pages': endpoint = editItem ? `/pages/${editItem[idField]}` : '/pages'; break;
      case 'jobs': endpoint = editItem ? `/jobs/${editItem[idField]}` : '/jobs'; break;
      case 'offices': endpoint = editItem ? `/offices/${editItem[idField]}` : '/offices'; break;
      case 'testimonials': endpoint = editItem ? `/testimonials/${editItem[idField]}` : '/testimonials'; break;
      case 'team': endpoint = editItem ? `/team-members/${editItem[idField]}` : '/team-members'; break;
      case 'clientLogos': endpoint = editItem ? `/featured-logos/${editItem[idField]}` : '/featured-logos'; break;
      case 'awards': endpoint = editItem ? `/awards/${editItem[idField]}` : '/awards'; break;
      case 'partnerships': endpoint = editItem ? `/partnerships/${editItem[idField]}` : '/partnerships'; break;
      case 'settings': endpoint = editItem ? `/site-settings/${editItem[idField]}` : '/site-settings'; break;
    }

    try {
      if (method === 'put') {
        await api.put(endpoint, formData);
      } else {
        await api.post(endpoint, formData);
      }
      setIsModalOpen(false);
      fetchTabData();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || 'Action failed. Double check fields.');
    }
  };

  const getTabIdField = () => {
    switch (activeTab) {
      case 'services': return 'serviceId';
      case 'industries': return 'industryId';
      case 'caseStudies': return 'caseStudyId';
      case 'pages': return 'pageId';
      case 'jobs': return 'jobId';
      case 'offices': return 'officeId';
      case 'testimonials': return 'testimonialId';
      case 'team': return 'teamMemberId';
      case 'clientLogos': return 'featuredLogoId';
      case 'awards': return 'awardId';
      case 'partnerships': return 'partnershipId';
      case 'appointments': return 'appointmentId';
      case 'settings': return 'siteSettingId';
      default: return 'id';
    }
  };

  // Update status (Applications / Messages / Appointments)
  const handleStatusUpdate = async (id: number, status: string) => {
    let path = `/contact/${id}/status`;
    if (activeTab === 'applications') path = `/job-applications/${id}/status`;
    if (activeTab === 'appointments') path = `/appointments/${id}/status`;
    try {
      await api.put(path, { status }, { headers: { 'Content-Type': 'application/json' } });
      fetchTabData();
    } catch (err) {
      console.error(err);
      alert('Status update failed.');
    }
  };

  const handleImageUpload = (field: string, url: string) => {
    setFormData({ ...formData, [field]: url });
  };

  const inputCls = 'admin-input';
  const labelCls = 'admin-label';

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      
      {/* Sidebar Nav */}
      <aside className="w-full lg:w-64 flex-shrink-0">
        <div className="admin-panel p-5">
          <div className="pb-4 border-b border-slate-200 mb-5 text-center lg:text-left">
            <h3 className="text-sm font-bold text-ink uppercase tracking-wider">{adminUser?.fullName || 'Admin User'}</h3>
            <span className="text-[10px] text-brand-600 font-semibold tracking-widest uppercase block mt-0.5">Control panel</span>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'dashboard', label: 'Stats Dashboard', icon: LayoutDashboard },
              { id: 'services', label: 'Manage Services', icon: Globe },
              { id: 'industries', label: 'Manage Industries', icon: Building },
              { id: 'caseStudies', label: 'Case Studies', icon: FolderOpen },
              { id: 'pages', label: 'Manage Pages', icon: FileText },
              { id: 'jobs', label: 'Manage Jobs', icon: Briefcase },
              { id: 'applications', label: 'Applications', icon: UserCheck },
              { id: 'messages', label: 'Inquiry Inbox', icon: MessageSquare },
              { id: 'appointments', label: 'Appointments', icon: CalendarDays },
              { id: 'offices', label: 'Manage Offices', icon: MapPin },
              { id: 'testimonials', label: 'Testimonials', icon: Star },
              { id: 'team', label: 'Team Members', icon: Users },
              { id: 'clientLogos', label: 'Client Logos', icon: Image },
              { id: 'awards', label: 'Awards', icon: Trophy },
              { id: 'partnerships', label: 'Partnerships', icon: Handshake },
              { id: 'settings', label: 'Site Settings', icon: Settings }
            ].map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabType)}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    activeTab === item.id ? 'admin-nav-active' : 'admin-nav-inactive'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-2.5 mt-6 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-all border border-transparent hover:border-rose-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout Admin</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Console Box */}
      <div className="flex-grow admin-panel p-6 md:p-8 min-h-[70vh]">
        {loading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <Loader className="w-8 h-8 text-brand-600 animate-spin" />
          </div>
        ) : errorMsg && activeTab === 'dashboard' && !stats ? (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        ) : (
          <>
            {errorMsg && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
            {/* TAB CONTENT - STATS DASHBOARD */}
            {activeTab === 'dashboard' && stats && (
              <div className="space-y-10">
                <div>
                  <h1 className="text-2xl font-bold text-ink mb-1">Administrative Dashboard</h1>
                  <p className="text-sm text-muted">Aggregated real-time metrics across your MySQL database tables.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { count: stats.services, label: 'Services' },
                    { count: stats.industries, label: 'Industries' },
                    { count: stats.caseStudies, label: 'Case Studies' },
                    { count: stats.pages, label: 'Pages' },
                    { count: stats.jobs, label: 'Jobs' },
                    { count: stats.applications, label: 'Job Apps' },
                    { count: stats.contactMessages, label: 'Messages' },
                    { count: stats.appointments ?? 0, label: 'Appointments' },
                  ].map((card, idx) => (
                    <div key={idx} className="card p-5 text-center">
                      <div className="text-3xl font-extrabold text-brand-700 mb-1">{card.count}</div>
                      <div className="text-[10px] text-muted font-bold uppercase tracking-wider">{card.label}</div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-ink uppercase tracking-widest">Recent Inquiries</h3>
                    <div className="space-y-3">
                      {(stats.recentMessages || []).map((c: any) => (
                        <div key={c.contactMessageId} className="card p-4 flex justify-between items-center text-xs">
                          <div>
                            <p className="font-semibold text-ink">{c.fullName}</p>
                            <p className="text-muted">{c.email} • {c.serviceInterest}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            c.status === 'New' ? 'bg-sky-50 text-sky-700' : 'bg-slate-100 text-muted'
                          }`}>{c.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-ink uppercase tracking-widest">Recent Job Applications</h3>
                    <div className="space-y-3">
                      {(stats.recentApplications || []).map((a: any) => (
                        <div key={a.jobApplicationId} className="card p-4 flex justify-between items-center text-xs">
                          <div>
                            <p className="font-semibold text-ink">{a.fullName}</p>
                            <p className="text-muted">{a.email}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            a.applicationStatus === 'Pending' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-muted'
                          }`}>{a.applicationStatus}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {(stats.recentAppointments || []).length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-ink uppercase tracking-widest">Recent Appointments</h3>
                      <button type="button" onClick={() => setActiveTab('appointments')} className="text-xs font-semibold text-brand-600 hover:text-brand-700">
                        View all →
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(stats.recentAppointments || []).map((a: any) => (
                        <div key={a.appointmentId} className="card p-4 flex justify-between items-center text-xs">
                          <div>
                            <p className="font-semibold text-ink">{a.fullName}</p>
                            <p className="text-muted">{a.service} • {String(a.preferredDate || '').slice(0, 10)} {a.preferredTime}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            a.status === 'New' ? 'bg-sky-50 text-sky-700' : 'bg-slate-100 text-muted'
                          }`}>{a.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT - CRUD GRIDS */}
            {activeTab !== 'dashboard' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                  <div>
                    <h1 className="text-xl font-bold text-ink capitalize">{activeTab.replace(/([A-Z])/g, ' $1')}</h1>
                    <p className="text-sm text-muted">Total Records: {listData.length}</p>
                  </div>
                  {!['applications', 'messages', 'appointments'].includes(activeTab) && (
                    <button onClick={() => openFormModal()} className="btn-primary text-xs !py-2 !px-4 flex items-center gap-1.5">
                      <Plus className="w-4 h-4" />
                      <span>Add Record</span>
                    </button>
                  )}
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left admin-table">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="p-3">ID</th>
                        {activeTab === 'services' && (
                          <>
                            <th className="p-3">Title</th>
                            <th className="p-3">Slug</th>
                            <th className="p-3">Display Order</th>
                            <th className="p-3">Status</th>
                          </>
                        )}
                        {activeTab === 'industries' && (
                          <>
                            <th className="p-3">Title</th>
                            <th className="p-3">Slug</th>
                            <th className="p-3">Display Order</th>
                            <th className="p-3">Status</th>
                          </>
                        )}
                        {activeTab === 'caseStudies' && (
                          <>
                            <th className="p-3">Title</th>
                            <th className="p-3">Client</th>
                            <th className="p-3">Status</th>
                          </>
                        )}
                        {activeTab === 'pages' && (
                          <>
                            <th className="p-3">Page Name</th>
                            <th className="p-3">Slug</th>
                            <th className="p-3">Status</th>
                          </>
                        )}
                        {activeTab === 'jobs' && (
                          <>
                            <th className="p-3">Title</th>
                            <th className="p-3">Department</th>
                            <th className="p-3">Location</th>
                            <th className="p-3">Status</th>
                          </>
                        )}
                        {activeTab === 'applications' && (
                          <>
                            <th className="p-3">Applicant</th>
                            <th className="p-3">Job Title</th>
                            <th className="p-3">Resume URL</th>
                            <th className="p-3">App Status</th>
                          </>
                        )}
                        {activeTab === 'messages' && (
                          <>
                            <th className="p-3">From</th>
                            <th className="p-3">Interest</th>
                            <th className="p-3">Message</th>
                            <th className="p-3">Msg Status</th>
                          </>
                        )}
                        {activeTab === 'appointments' && (
                          <>
                            <th className="p-3">Client</th>
                            <th className="p-3">Service</th>
                            <th className="p-3">Date / Time</th>
                            <th className="p-3">Meeting</th>
                            <th className="p-3">Status</th>
                          </>
                        )}
                        {activeTab === 'offices' && (
                          <>
                            <th className="p-3">Location</th>
                            <th className="p-3">Office Name</th>
                            <th className="p-3">Phone</th>
                          </>
                        )}
                        {activeTab === 'testimonials' && (
                          <>
                            <th className="p-3">Client</th>
                            <th className="p-3">Message</th>
                            <th className="p-3">Rating</th>
                          </>
                        )}
                        {activeTab === 'team' && (
                          <>
                            <th className="p-3">Full Name</th>
                            <th className="p-3">Designation</th>
                          </>
                        )}
                        {activeTab === 'clientLogos' && (
                          <>
                            <th className="p-3">Logo</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Order</th>
                            <th className="p-3">Status</th>
                          </>
                        )}
                        {activeTab === 'awards' && (
                          <>
                            <th className="p-3">Image</th>
                            <th className="p-3">Title</th>
                            <th className="p-3">Order</th>
                            <th className="p-3">Status</th>
                          </>
                        )}
                        {activeTab === 'partnerships' && (
                          <>
                            <th className="p-3">Logo</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Order</th>
                            <th className="p-3">Status</th>
                          </>
                        )}
                        {activeTab === 'settings' && (
                          <>
                            <th className="p-3">Setting Key</th>
                            <th className="p-3">Value</th>
                          </>
                        )}
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listData.map((item) => {
                        const id = item[getTabIdField()];
                        return (
                          <tr key={id} className="transition-colors">
                            <td className="p-3 font-semibold text-muted">{id}</td>
                            {activeTab === 'services' && (
                              <>
                                <td className="p-3 font-semibold text-ink">{item.title}</td>
                                <td className="p-3 text-muted">{item.slug}</td>
                                <td className="p-3">{item.displayOrder}</td>
                                <td className="p-3">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${item.isActive ? 'admin-badge-active' : 'admin-badge-inactive'}`}>
                                    {item.isActive ? 'Active' : 'Inactive'}
                                  </span>
                                </td>
                              </>
                            )}
                            {activeTab === 'industries' && (
                              <>
                                <td className="p-3 font-semibold text-ink">{item.title}</td>
                                <td className="p-3 text-muted">{item.slug}</td>
                                <td className="p-3">{item.displayOrder}</td>
                                <td className="p-3">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${item.isActive ? 'admin-badge-active' : 'admin-badge-inactive'}`}>
                                    {item.isActive ? 'Active' : 'Inactive'}
                                  </span>
                                </td>
                              </>
                            )}
                            {activeTab === 'caseStudies' && (
                              <>
                                <td className="p-3 font-semibold text-ink">{item.title}</td>
                                <td className="p-3 text-muted">{item.clientName}</td>
                                <td className="p-3">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${item.isActive ? 'admin-badge-active' : 'admin-badge-inactive'}`}>
                                    {item.isActive ? 'Active' : 'Inactive'}
                                  </span>
                                </td>
                              </>
                            )}
                            {activeTab === 'pages' && (
                              <>
                                <td className="p-3 font-semibold text-ink">{item.pageName}</td>
                                <td className="p-3 text-muted">{item.slug}</td>
                                <td className="p-3">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${item.isActive ? 'admin-badge-active' : 'admin-badge-inactive'}`}>
                                    {item.isActive ? 'Active' : 'Inactive'}
                                  </span>
                                </td>
                              </>
                            )}
                            {activeTab === 'jobs' && (
                              <>
                                <td className="p-3 font-semibold text-ink">{item.title}</td>
                                <td className="p-3 text-muted">{item.department}</td>
                                <td className="p-3 text-muted">{item.location}</td>
                                <td className="p-3">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${item.isActive ? 'admin-badge-active' : 'admin-badge-inactive'}`}>
                                    {item.isActive ? 'Open' : 'Closed'}
                                  </span>
                                </td>
                              </>
                            )}
                            {activeTab === 'applications' && (
                              <>
                                <td className="p-3">
                                  <div className="font-semibold text-ink">{item.fullName}</div>
                                  <div className="text-muted">{item.email} • {item.phone}</div>
                                </td>
                                <td className="p-3 text-muted">{item.jobTitle}</td>
                                <td className="p-3">
                                  <a href={item.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-700 flex items-center space-x-1">
                                    <span>View Resume</span>
                                    <Eye className="w-3.5 h-3.5" />
                                  </a>
                                </td>
                                <td className="p-3">
                                  <select
                                    value={item.applicationStatus}
                                    onChange={(e) => handleStatusUpdate(id, e.target.value)}
                                    className="admin-input !py-1 !px-2 text-xs"
                                  >
                                    <option>Pending</option>
                                    <option>Reviewed</option>
                                    <option>Interviewing</option>
                                    <option>Accepted</option>
                                    <option>Rejected</option>
                                  </select>
                                </td>
                              </>
                            )}
                            {activeTab === 'messages' && (
                              <>
                                <td className="p-3">
                                  <div className="font-semibold text-ink">{item.fullName}</div>
                                  <div className="text-muted">{item.email} • {item.companyName}</div>
                                </td>
                                <td className="p-3 text-muted">{item.serviceInterest}</td>
                                <td className="p-3 text-muted max-w-xs truncate" title={item.message}>{item.message}</td>
                                <td className="p-3">
                                  <select
                                    value={item.status}
                                    onChange={(e) => handleStatusUpdate(id, e.target.value)}
                                    className="admin-input !py-1 !px-2 text-xs"
                                  >
                                    <option>New</option>
                                    <option>Read</option>
                                    <option>Replied</option>
                                    <option>Archived</option>
                                  </select>
                                </td>
                              </>
                            )}
                            {activeTab === 'appointments' && (
                              <>
                                <td className="p-3">
                                  <div className="font-semibold text-ink">{item.fullName}</div>
                                  <div className="text-muted">{item.email}</div>
                                  <div className="text-muted">{item.phone}{item.companyName ? ` • ${item.companyName}` : ''}</div>
                                  {(item.city || item.country) && (
                                    <div className="text-muted text-[11px]">{[item.city, item.country].filter(Boolean).join(', ')}</div>
                                  )}
                                </td>
                                <td className="p-3">
                                  <div className="font-medium text-ink">{item.service}</div>
                                  {item.projectBudget && <div className="text-muted text-[11px]">{item.projectBudget}</div>}
                                  {item.projectTimeline && <div className="text-muted text-[11px]">{item.projectTimeline}</div>}
                                  {item.projectDescription && (
                                    <div className="text-muted max-w-[180px] truncate mt-1" title={item.projectDescription}>{item.projectDescription}</div>
                                  )}
                                  {item.attachmentUrl && (
                                    <a href={item.attachmentUrl} target="_blank" rel="noopener noreferrer" className="text-brand-600 text-[11px] font-semibold inline-flex items-center gap-1 mt-1">
                                      View file <Eye className="w-3 h-3" />
                                    </a>
                                  )}
                                </td>
                                <td className="p-3 text-ink text-xs">
                                  <div>{String(item.preferredDate || '').slice(0, 10)}</div>
                                  <div className="text-muted">{item.preferredTime}</div>
                                </td>
                                <td className="p-3 text-muted text-xs">
                                  <div>{item.meetingType}</div>
                                  {item.heardAboutUs && <div className="text-[11px]">Via: {item.heardAboutUs}</div>}
                                </td>
                                <td className="p-3">
                                  <select
                                    value={item.status || 'New'}
                                    onChange={(e) => handleStatusUpdate(id, e.target.value)}
                                    className="admin-input !py-1 !px-2 text-xs"
                                  >
                                    <option>New</option>
                                    <option>Confirmed</option>
                                    <option>Completed</option>
                                    <option>Cancelled</option>
                                  </select>
                                </td>
                              </>
                            )}
                            {activeTab === 'offices' && (
                              <>
                                <td className="p-3 font-semibold text-ink">{item.city}, {item.country}</td>
                                <td className="p-3 text-muted">{item.officeTitle}</td>
                                <td className="p-3 text-muted">{item.phone}</td>
                              </>
                            )}
                            {activeTab === 'testimonials' && (
                              <>
                                <td className="p-3">
                                  <div className="font-semibold text-ink">{item.clientName}</div>
                                  <div className="text-muted">{item.clientDesignation}, {item.companyName}</div>
                                </td>
                                <td className="p-3 text-muted max-w-xs truncate" title={item.message}>{item.message}</td>
                                <td className="p-3 text-amber-405 font-bold">★ {item.rating}</td>
                              </>
                            )}
                            {activeTab === 'team' && (
                              <>
                                <td className="p-3 font-semibold text-ink">{item.fullName}</td>
                                <td className="p-3 text-brand-600 font-medium">{item.designation}</td>
                              </>
                            )}
                            {activeTab === 'clientLogos' && (
                              <>
                                <td className="p-3">
                                  {item.imageUrl && <img src={item.imageUrl} alt="" className="h-8 max-w-[80px] object-contain" />}
                                </td>
                                <td className="p-3 font-semibold text-ink">{item.name}</td>
                                <td className="p-3">{item.displayOrder}</td>
                                <td className="p-3">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${item.isActive ? 'admin-badge-active' : 'admin-badge-inactive'}`}>
                                    {item.isActive ? 'Active' : 'Inactive'}
                                  </span>
                                </td>
                              </>
                            )}
                            {activeTab === 'awards' && (
                              <>
                                <td className="p-3">
                                  {item.imageUrl && <img src={item.imageUrl} alt="" className="h-10 max-w-[80px] object-contain" />}
                                </td>
                                <td className="p-3 font-semibold text-ink">{item.title}</td>
                                <td className="p-3">{item.displayOrder}</td>
                                <td className="p-3">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${item.isActive ? 'admin-badge-active' : 'admin-badge-inactive'}`}>
                                    {item.isActive ? 'Active' : 'Inactive'}
                                  </span>
                                </td>
                              </>
                            )}
                            {activeTab === 'partnerships' && (
                              <>
                                <td className="p-3">
                                  {item.imageUrl && <img src={item.imageUrl} alt="" className="h-8 max-w-[80px] object-contain" />}
                                </td>
                                <td className="p-3 font-semibold text-ink">{item.name}</td>
                                <td className="p-3">{item.displayOrder}</td>
                                <td className="p-3">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${item.isActive ? 'admin-badge-active' : 'admin-badge-inactive'}`}>
                                    {item.isActive ? 'Active' : 'Inactive'}
                                  </span>
                                </td>
                              </>
                            )}
                            {activeTab === 'settings' && (
                              <>
                                <td className="p-3 font-semibold text-ink">{item.settingKey}</td>
                                <td className="p-3 text-muted">{item.settingValue}</td>
                              </>
                            )}
                            <td className="p-3 text-right">
                              <div className="flex justify-end space-x-2">
                                {/* Edit action trigger */}
                                {!['applications', 'messages', 'appointments'].includes(activeTab) && (
                                  <button
                                    onClick={() => openFormModal(item)}
                                    className="p-1.5 text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                )}
                                {/* Delete action trigger */}
                                <button
                                  onClick={() => handleDelete(id)}
                                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* DYNAMIC FORM MODAL WINDOW */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="w-full max-w-2xl admin-panel p-8 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-100 border border-slate-200 hover:bg-slate-200 text-ink transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-ink mb-6">
              {editItem ? 'Edit Record' : 'Add New Record'}
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Service Form */}
              {activeTab === 'services' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="admin-label">Service Title *</label>
                    <input type="text" name="title" required value={formData.title || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div>
                    <label className="admin-label">Slug *</label>
                    <input type="text" name="slug" required value={formData.slug || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div>
                    <label className="admin-label">Icon Name (Globe, Cpu, Sparkles, etc.)</label>
                    <input type="text" name="icon" value={formData.icon || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <MediaUploadField
                    label="Service Image"
                    value={formData.imageUrl || ''}
                    onChange={(url) => handleImageUpload('imageUrl', url)}
                    uploading={isUploading}
                    onUploadingChange={setIsUploading}
                  />
                  <div className="sm:col-span-2">
                    <label className="admin-label">Short Description</label>
                    <input type="text" name="shortDescription" value={formData.shortDescription || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="admin-label">Detailed Description (Markdown supported)</label>
                    <textarea rows={4} name="description" value={formData.description || ''} onChange={handleInputChange} className="admin-input resize-none" />
                  </div>
                  <div>
                    <label className="admin-label">Display Order</label>
                    <input type="number" name="displayOrder" value={formData.displayOrder || 0} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div className="flex items-center space-x-6 pt-6">
                    <label className="flex items-center space-x-2 text-xs text-ink">
                      <input type="checkbox" name="isFeatured" checked={!!formData.isFeatured} onChange={handleInputChange} className="rounded border-slate-300" />
                      <span>Featured</span>
                    </label>
                    <label className="flex items-center space-x-2 text-xs text-ink">
                      <input type="checkbox" name="isActive" checked={!!formData.isActive} onChange={handleInputChange} className="rounded border-slate-300" />
                      <span>Active</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Industry Form */}
              {activeTab === 'industries' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="admin-label">Industry Title *</label>
                    <input type="text" name="title" required value={formData.title || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div>
                    <label className="admin-label">Slug *</label>
                    <input type="text" name="slug" required value={formData.slug || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <MediaUploadField
                    label="Industry Image"
                    value={formData.imageUrl || ''}
                    onChange={(url) => handleImageUpload('imageUrl', url)}
                    uploading={isUploading}
                    onUploadingChange={setIsUploading}
                  />
                  <div className="sm:col-span-2">
                    <label className="admin-label">Short Description</label>
                    <input type="text" name="shortDescription" value={formData.shortDescription || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="admin-label">Detailed Description</label>
                    <textarea rows={4} name="description" value={formData.description || ''} onChange={handleInputChange} className="admin-input resize-none" />
                  </div>
                  <div>
                    <label className="admin-label">Display Order</label>
                    <input type="number" name="displayOrder" value={formData.displayOrder || 0} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div className="flex items-center pt-6">
                    <label className="flex items-center space-x-2 text-xs text-ink">
                      <input type="checkbox" name="isActive" checked={!!formData.isActive} onChange={handleInputChange} className="rounded border-slate-300" />
                      <span>Active</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Case Study Form */}
              {activeTab === 'caseStudies' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="admin-label">Case Title *</label>
                    <input type="text" name="title" required value={formData.title || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div>
                    <label className="admin-label">Slug *</label>
                    <input type="text" name="slug" required value={formData.slug || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div>
                    <label className="admin-label">Client Name *</label>
                    <input type="text" name="clientName" required value={formData.clientName || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="admin-label">Short Description</label>
                    <input type="text" name="shortDescription" value={formData.shortDescription || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="admin-label">Challenge / Problem</label>
                    <textarea rows={3} name="problem" value={formData.problem || ''} onChange={handleInputChange} className="admin-input resize-none" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="admin-label">Engineering Solution</label>
                    <textarea rows={3} name="solution" value={formData.solution || ''} onChange={handleInputChange} className="admin-input resize-none" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="admin-label">Results Summary</label>
                    <textarea rows={3} name="resultSummary" value={formData.resultSummary || ''} onChange={handleInputChange} className="admin-input resize-none" />
                  </div>
                  <MediaUploadField
                    label="Case Study Image"
                    value={formData.imageUrl || ''}
                    onChange={(url) => handleImageUpload('imageUrl', url)}
                    uploading={isUploading}
                    onUploadingChange={setIsUploading}
                  />
                  <div>
                    <label className="admin-label">PDF URL</label>
                    <input type="text" name="pdfUrl" value={formData.pdfUrl || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div className="flex items-center space-x-6 pt-4">
                    <label className="flex items-center space-x-2 text-xs text-ink">
                      <input type="checkbox" name="isFeatured" checked={!!formData.isFeatured} onChange={handleInputChange} className="rounded border-slate-300" />
                      <span>Featured</span>
                    </label>
                    <label className="flex items-center space-x-2 text-xs text-ink">
                      <input type="checkbox" name="isActive" checked={!!formData.isActive} onChange={handleInputChange} className="rounded border-slate-300" />
                      <span>Active</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Page Form */}
              {activeTab === 'pages' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="admin-label">Page Name *</label>
                    <input type="text" name="pageName" required value={formData.pageName || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div>
                    <label className="admin-label">Slug *</label>
                    <input type="text" name="slug" required value={formData.slug || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div>
                    <label className="admin-label">Meta Title</label>
                    <input type="text" name="metaTitle" value={formData.metaTitle || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="admin-label">Meta Description</label>
                    <input type="text" name="metaDescription" value={formData.metaDescription || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="admin-label">Page Content</label>
                    <textarea rows={6} name="content" value={formData.content || ''} onChange={handleInputChange} className="admin-input resize-none" />
                  </div>
                  <div className="flex items-center pt-4">
                    <label className="flex items-center space-x-2 text-xs text-ink">
                      <input type="checkbox" name="isActive" checked={!!formData.isActive} onChange={handleInputChange} className="rounded border-slate-300" />
                      <span>Active</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Job Form */}
              {activeTab === 'jobs' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="admin-label">Job Title *</label>
                    <input type="text" name="title" required value={formData.title || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div>
                    <label className="admin-label">Slug *</label>
                    <input type="text" name="slug" required value={formData.slug || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div>
                    <label className="admin-label">Department</label>
                    <input type="text" name="department" value={formData.department || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div>
                    <label className="admin-label">Location</label>
                    <input type="text" name="location" value={formData.location || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div>
                    <label className="admin-label">Experience Level</label>
                    <input type="text" name="experienceLevel" value={formData.experienceLevel || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="admin-label">Job Description</label>
                    <textarea rows={3} name="description" value={formData.description || ''} onChange={handleInputChange} className="admin-input resize-none" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="admin-label">Requirements</label>
                    <textarea rows={3} name="requirements" value={formData.requirements || ''} onChange={handleInputChange} className="admin-input resize-none" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="admin-label">Responsibilities</label>
                    <textarea rows={3} name="responsibilities" value={formData.responsibilities || ''} onChange={handleInputChange} className="admin-input resize-none" />
                  </div>
                  <div className="flex items-center pt-4">
                    <label className="flex items-center space-x-2 text-xs text-ink">
                      <input type="checkbox" name="isActive" checked={!!formData.isActive} onChange={handleInputChange} className="rounded border-slate-300" />
                      <span>Role Open</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Office Form */}
              {activeTab === 'offices' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="admin-label">Country *</label>
                    <input type="text" name="country" required value={formData.country || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div>
                    <label className="admin-label">City *</label>
                    <input type="text" name="city" required value={formData.city || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="admin-label">Office Name</label>
                    <input type="text" name="officeTitle" value={formData.officeTitle || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="admin-label">Physical Address</label>
                    <input type="text" name="address" value={formData.address || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div>
                    <label className="admin-label">Telephone</label>
                    <input type="text" name="phone" value={formData.phone || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div>
                    <label className="admin-label">Email</label>
                    <input type="email" name="email" value={formData.email || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div>
                    <label className="admin-label">Display Order</label>
                    <input type="number" name="displayOrder" value={formData.displayOrder || 0} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div className="flex items-center pt-6">
                    <label className="flex items-center space-x-2 text-xs text-ink">
                      <input type="checkbox" name="isActive" checked={!!formData.isActive} onChange={handleInputChange} className="rounded border-slate-300" />
                      <span>Active</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Testimonial Form */}
              {activeTab === 'testimonials' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="admin-label">Client Name *</label>
                    <input type="text" name="clientName" required value={formData.clientName || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div>
                    <label className="admin-label">Client Designation</label>
                    <input type="text" name="clientDesignation" value={formData.clientDesignation || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="admin-label">Company Name</label>
                    <input type="text" name="companyName" value={formData.companyName || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="admin-label">Client Message *</label>
                    <textarea rows={4} name="message" required value={formData.message || ''} onChange={handleInputChange} className="admin-input resize-none" />
                  </div>
                  <MediaUploadField
                    label="Client Photo"
                    value={formData.imageUrl || ''}
                    onChange={(url) => handleImageUpload('imageUrl', url)}
                    uploading={isUploading}
                    onUploadingChange={setIsUploading}
                  />
                  <div>
                    <label className="admin-label">Rating Score (1-5)</label>
                    <input type="number" min="1" max="5" name="rating" value={formData.rating || 5} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div className="flex items-center pt-4">
                    <label className="flex items-center space-x-2 text-xs text-ink">
                      <input type="checkbox" name="isActive" checked={!!formData.isActive} onChange={handleInputChange} className="rounded border-slate-300" />
                      <span>Active</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Team Member Form */}
              {activeTab === 'team' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="admin-label">Full Name *</label>
                    <input type="text" name="fullName" required value={formData.fullName || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div>
                    <label className="admin-label">Designation</label>
                    <input type="text" name="designation" value={formData.designation || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="admin-label">Bio Description</label>
                    <textarea rows={3} name="bio" value={formData.bio || ''} onChange={handleInputChange} className="admin-input resize-none" />
                  </div>
                  <MediaUploadField
                    label="Team Member Photo"
                    value={formData.imageUrl || ''}
                    onChange={(url) => handleImageUpload('imageUrl', url)}
                    uploading={isUploading}
                    onUploadingChange={setIsUploading}
                  />
                  <div>
                    <label className="admin-label">LinkedIn Profile Link</label>
                    <input type="url" name="linkedInUrl" value={formData.linkedInUrl || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div>
                    <label className="admin-label">Display Order</label>
                    <input type="number" name="displayOrder" value={formData.displayOrder || 0} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div className="flex items-center pt-6">
                    <label className="flex items-center space-x-2 text-xs text-ink">
                      <input type="checkbox" name="isActive" checked={!!formData.isActive} onChange={handleInputChange} className="rounded border-slate-300" />
                      <span>Active</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Client Logo Form */}
              {activeTab === 'clientLogos' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="admin-label">Company / Brand Name *</label>
                    <input type="text" name="name" required value={formData.name || ''} onChange={handleInputChange} className="admin-input" placeholder="E.g. Microsoft" />
                  </div>
                  <MediaUploadField
                    label="Logo Image *"
                    value={formData.imageUrl || ''}
                    onChange={(url) => handleImageUpload('imageUrl', url)}
                    uploading={isUploading}
                    onUploadingChange={setIsUploading}
                  />
                  <div>
                    <label className="admin-label">Display Order</label>
                    <input type="number" name="displayOrder" value={formData.displayOrder || 0} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div className="flex items-center pt-6">
                    <label className="flex items-center space-x-2 text-xs text-ink">
                      <input type="checkbox" name="isActive" checked={!!formData.isActive} onChange={handleInputChange} className="rounded border-slate-300" />
                      <span>Active (show on homepage)</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Awards Form */}
              {activeTab === 'awards' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="admin-label">Award / Certification Title *</label>
                    <input type="text" name="title" required value={formData.title || ''} onChange={handleInputChange} className="admin-input" placeholder="E.g. ISO 27001 Certified" />
                  </div>
                  <MediaUploadField
                    label="Badge / Certificate Image *"
                    value={formData.imageUrl || ''}
                    onChange={(url) => handleImageUpload('imageUrl', url)}
                    uploading={isUploading}
                    onUploadingChange={setIsUploading}
                  />
                  <div>
                    <label className="admin-label">Display Order</label>
                    <input type="number" name="displayOrder" value={formData.displayOrder || 0} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div className="flex items-center pt-6">
                    <label className="flex items-center space-x-2 text-xs text-ink">
                      <input type="checkbox" name="isActive" checked={!!formData.isActive} onChange={handleInputChange} className="rounded border-slate-300" />
                      <span>Active (show on homepage)</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Partnerships Form */}
              {activeTab === 'partnerships' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="admin-label">Partner Name *</label>
                    <input type="text" name="name" required value={formData.name || ''} onChange={handleInputChange} className="admin-input" placeholder="E.g. Microsoft" />
                  </div>
                  <MediaUploadField
                    label="Partner Logo *"
                    value={formData.imageUrl || ''}
                    onChange={(url) => handleImageUpload('imageUrl', url)}
                    uploading={isUploading}
                    onUploadingChange={setIsUploading}
                  />
                  <div>
                    <label className="admin-label">Display Order</label>
                    <input type="number" name="displayOrder" value={formData.displayOrder || 0} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div className="flex items-center pt-6">
                    <label className="flex items-center space-x-2 text-xs text-ink">
                      <input type="checkbox" name="isActive" checked={!!formData.isActive} onChange={handleInputChange} className="rounded border-slate-300" />
                      <span>Active (show on homepage)</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Site Settings Form */}
              {activeTab === 'settings' && (
                <div className="space-y-4">
                  <div>
                    <label className="admin-label">Setting Key *</label>
                    <input type="text" name="settingKey" required disabled={!!editItem} value={formData.settingKey || ''} onChange={handleInputChange} className="admin-input disabled:opacity-50" />
                    <p className="text-[10px] text-muted mt-1">Use hero_video_url for homepage background video, hero_title for headline, etc.</p>
                  </div>
                  {formData.settingKey === 'hero_video_url' ? (
                    <MediaUploadField
                      label="Homepage Background Video"
                      type="video"
                      value={formData.settingValue || ''}
                      onChange={(url) => setFormData({ ...formData, settingValue: url })}
                      uploading={isUploading}
                      onUploadingChange={setIsUploading}
                    />
                  ) : (
                    <div>
                      <label className="admin-label">Setting Value</label>
                      <textarea rows={3} name="settingValue" value={formData.settingValue || ''} onChange={handleInputChange} className="admin-input resize-none" />
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline text-xs !py-2 !px-4">
                  Cancel
                </button>
                <button type="submit" disabled={isUploading} className="btn-primary text-xs !py-2 !px-5 disabled:opacity-50">
                  {isUploading ? 'Uploading...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
