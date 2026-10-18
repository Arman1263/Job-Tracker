export default function DashboardStats({ jobs, activeFilter, onSelectFilter }) {
  const total = jobs.length;
  const applied = jobs.filter(j => j.status === 'Applied').length;
  const interview = jobs.filter(j => j.status === 'Interview').length;
  const offer = jobs.filter(j => j.status === 'Offer').length;
  const saved = jobs.filter(j => j.status === 'Saved').length;

  const appliedRate = total > 0 ? Math.round((applied / total) * 100) : 0;
  const interviewRate = total > 0 ? Math.round((interview / total) * 100) : 0;
  const offerRate = total > 0 ? Math.round((offer / total) * 100) : 0;

  const statCards = [
    {
      id: 'all',
      filterValue: 'All',
      title: 'Total Applications',
      count: total,
      meta: `${saved} saved listings`,
      colorVar: 'var(--primary)',
      bgVar: 'var(--primary-subtle)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      )
    },
    {
      id: 'applied',
      filterValue: 'Applied',
      title: 'Applied',
      count: applied,
      meta: `${appliedRate}% of pipeline`,
      colorVar: 'var(--status-applied)',
      bgVar: 'var(--status-applied-bg)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      )
    },
    {
      id: 'interview',
      filterValue: 'Interview',
      title: 'In Interview',
      count: interview,
      meta: `${interviewRate}% active loops`,
      colorVar: 'var(--status-interview)',
      bgVar: 'var(--status-interview-bg)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      )
    },
    {
      id: 'offer',
      filterValue: 'Offer',
      title: 'Offers Received',
      count: offer,
      meta: offer > 0 ? `${offerRate}% win rate` : 'Awaiting decisions',
      colorVar: 'var(--status-offer)',
      bgVar: 'var(--status-offer-bg)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
          <path d="M4 22h16"></path>
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="dashboard-stats" aria-label="Dashboard Pipeline Summary">
      <div className="stats-grid">
        {statCards.map(card => {
          const isActive = activeFilter === card.filterValue;
          return (
            <button
              key={card.id}
              type="button"
              className={`stat-card ${isActive ? 'active' : ''}`}
              onClick={() => onSelectFilter(card.filterValue)}
              style={{
                '--card-accent': card.colorVar,
                '--card-accent-bg': card.bgVar
              }}
              title={`Filter by ${card.title}`}
            >
              <div className="stat-card-header">
                <span className="stat-title">{card.title}</span>
                <span className="stat-icon-wrapper" aria-hidden="true">
                  {card.icon}
                </span>
              </div>
              <div className="stat-card-body">
                <div className="stat-value">{card.count}</div>
                <div className="stat-meta">{card.meta}</div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
