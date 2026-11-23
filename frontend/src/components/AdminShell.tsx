import { Link, Outlet } from 'react-router-dom';
import logo from '../assets/EWOLogo.png';

export default function AdminShell() {
  return (
    <div className="min-h-screen bg-surface text-ink font-sans">
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="EWO Technologies" className="h-8 w-auto object-contain" />
            <span className="text-xs font-semibold text-muted uppercase tracking-widest group-hover:text-brand-600 transition-colors hidden sm:inline">
              Admin Portal
            </span>
          </Link>
          <Link to="/" className="text-xs font-semibold text-muted hover:text-brand-600 transition-colors">
            ← Back to website
          </Link>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
