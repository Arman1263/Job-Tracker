export default function Header({
  onOpenNewJobModal,
  onResetDemoJobs,
  onOpenClearAllModal,
  totalJobsCount
}) {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="brand-group">
          <div className="brand-logo" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          </div>
          <div>
            <div className="brand-title-wrap">
              <h1 className="brand-title">JobTracker</h1>
              <span className="brand-pill">{totalJobsCount} Tracked</span>
            </div>
            <p className="brand-subtitle">Organize and accelerate your career opportunities</p>
          </div>
        </div>

        <div className="header-actions">
          <button 
            type="button" 
            className="btn-ghost"
            onClick={onResetDemoJobs}
            title="Restore missing fictional sample jobs without modifying your custom applications"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
            </svg>
            Reset Demo Jobs
          </button>

          <button 
            type="button" 
            className="btn-ghost danger"
            onClick={onOpenClearAllModal}
            title="Clear all job applications"
            disabled={totalJobsCount === 0}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            Clear All
          </button>

          <button 
            type="button" 
            className="btn-primary"
            onClick={onOpenNewJobModal}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Job
          </button>
        </div>
      </div>
    </header>
  );
}
