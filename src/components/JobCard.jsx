export default function JobCard({ job, isSelected, onSelect }) {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Saved': return 'status-badge-saved';
      case 'Applied': return 'status-badge-applied';
      case 'Interview': return 'status-badge-interview';
      case 'Offer': return 'status-badge-offer';
      case 'Rejected': return 'status-badge-rejected';
      default: return 'status-badge-saved';
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Not set';
    try {
      const date = new Date(dateStr + 'T00:00:00');
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={`job-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(job.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(job.id);
        }
      }}
      aria-label={`${job.title} at ${job.company}`}
    >
      <div className="job-card-header">
        <div>
          <h3 className="job-card-title">{job.title}</h3>
          <p className="job-card-company">{job.company}</p>
        </div>
        <span className={`status-badge ${getStatusClass(job.status)}`}>
          {job.status}
        </span>
      </div>

      <div className="job-card-meta">
        {job.location && (
          <div className="meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>{job.location}</span>
          </div>
        )}

        {job.salary && (
          <div className="meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            <span>{job.salary}</span>
          </div>
        )}

        <div className="meta-item">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>Applied: {formatDate(job.appliedDate)}</span>
        </div>
      </div>

      {job.tags && job.tags.length > 0 && (
        <div className="job-card-tags">
          {job.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="tag-chip">{tag}</span>
          ))}
          {job.tags.length > 3 && (
            <span className="tag-chip more">+{job.tags.length - 3}</span>
          )}
        </div>
      )}
    </div>
  );
}
