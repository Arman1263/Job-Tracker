import JobCard from './JobCard';

export default function JobList({
  jobs,
  selectedJobId,
  onSelectJob,
  onClearFilters,
  onOpenNewJobModal,
  onRestoreDemoJobs,
  isFiltered
}) {
  if (jobs.length === 0) {
    return (
      <div className="job-list-empty">
        <div className="empty-icon-wrap" aria-hidden="true">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </div>
        <h3 className="empty-title">
          {isFiltered ? 'No applications match your filter' : 'No applications tracked yet'}
        </h3>
        <p className="empty-desc">
          {isFiltered
            ? 'Try clearing your search query or switching to a different status filter to view other applications.'
            : 'Start building your pipeline by adding your first target job opportunity or restoring demo listings.'}
        </p>
        <div className="empty-actions">
          {isFiltered ? (
            <button
              type="button"
              className="btn-secondary"
              onClick={onClearFilters}
            >
              Reset Filters
            </button>
          ) : (
            <>
              <button
                type="button"
                className="btn-primary"
                onClick={onOpenNewJobModal}
              >
                Add First Application
              </button>
              {onRestoreDemoJobs && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={onRestoreDemoJobs}
                >
                  Restore Demo Jobs
                </button>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="job-list-container" aria-label="Job applications list">
      <div className="job-list-header">
        <span className="results-count">
          Showing <strong>{jobs.length}</strong> {jobs.length === 1 ? 'application' : 'applications'}
        </span>
      </div>

      <div className="job-list-scroll">
        {jobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            isSelected={job.id === selectedJobId}
            onSelect={onSelectJob}
          />
        ))}
      </div>
    </div>
  );
}
