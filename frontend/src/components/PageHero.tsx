import { Link } from 'react-router-dom';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export default function PageHero({ eyebrow, title, subtitle, children }: PageHeroProps) {
  return (
    <section className="bg-surface border-b border-slate-200">
      <div className="container-wide py-16 sm:py-20 text-center">
        {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
        <h1 className="section-title mb-5">{title}</h1>
        <p className="section-subtitle mx-auto">{subtitle}</p>
        {children && <div className="mt-8 flex flex-wrap justify-center gap-4">{children}</div>}
      </div>
    </section>
  );
}

export function EmptyState({ title, message, actionLabel, actionTo }: {
  title: string;
  message: string;
  actionLabel?: string;
  actionTo?: string;
}) {
  return (
    <div className="empty-state">
      <h3 className="text-lg font-bold text-brand-700 mb-2">{title}</h3>
      <p className="text-sm text-muted max-w-md mx-auto mb-6">{message}</p>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn-primary">{actionLabel}</Link>
      )}
    </div>
  );
}
