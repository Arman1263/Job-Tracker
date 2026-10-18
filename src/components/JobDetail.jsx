import { useState } from 'react';
import { STATUS_OPTIONS } from '../data/sampleJobs';

export default function JobDetail({
  job,
  onStatusChange,
  onDeleteClick,
  onEditClick,
  onCloseMobileDetail,
  onSaveNotes
}) {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesDraft, setNotesDraft] = useState(job ? job.notes || '' : '');

  if (!job) {
    return (
      <div className="job-detail-empty">
        <div className="detail-empty-icon" aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        </div>
        <h3>Select an Application</h3>
        <p>Choose any job card on the left to inspect its timeline, full job description, notes, and progress status.</p>
      </div>
    );
  }

  const handleSaveNotes = () => {
    onSaveNotes(job.id, notesDraft);
    setIsEditingNotes(false);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Not set';
    try {
      const date = new Date(dateStr + 'T00:00:00');
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <article className="job-detail-panel" aria-label={`Details for ${job.title}`}>
      {/* Mobile back navigation */}
      <div className="mobile-detail-nav">
        <button
          type="button"
          className="btn-ghost"
          onClick={onCloseMobileDetail}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Applications
        </button>
      </div>

      {/* Main Header */}
      <div className="detail-header">
        <div className="detail-header-info">
          <div className="detail-company-row">
            <span className="detail-company-name">{job.company}</span>
            {job.workType && (
              <span className="work-type-badge">{job.workType}</span>
            )}
          </div>
          <h2 className="detail-title">{job.title}</h2>
        </div>

        <div className="detail-header-actions">
          <div className="status-selector-wrap">
            <label htmlFor="job-status-select" className="visually-hidden">Application Status</label>
            <select
              id="job-status-select"
              className="status-dropdown"
              value={job.status}
              onChange={(e) => onStatusChange(job.id, e.target.value)}
              title="Change application status"
            >
              {STATUS_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="btn-icon"
            onClick={() => onEditClick(job)}
            title="Edit Application"
            aria-label="Edit Application"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
          </button>

          <button
            type="button"
            className="btn-icon danger"
            onClick={() => onDeleteClick(job)}
            title="Delete Application"
            aria-label="Delete Application"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Meta Grid */}
      <div className="detail-meta-grid">
        <div className="detail-meta-box">
          <span className="meta-label">Location</span>
          <span className="meta-value">{job.location || 'Remote / Not specified'}</span>
        </div>

        <div className="detail-meta-box">
          <span className="meta-label">Compensation</span>
          <span className="meta-value highlight">{job.salary || 'Negotiable / Undisclosed'}</span>
        </div>

        <div className="detail-meta-box">
          <span className="meta-label">Date Applied</span>
          <span className="meta-value">{formatDate(job.appliedDate)}</span>
        </div>

        <div className="detail-meta-box">
          <span className="meta-label">Recruiter / Contact</span>
          <span className="meta-value">{job.contactPerson || 'Not listed'}</span>
        </div>
      </div>

      {/* Job URL External Link Banner */}
      {job.jobUrl && (
        <div className="detail-link-banner">
          <div className="link-info">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            <span className="link-url-text">{job.jobUrl}</span>
          </div>
          <a
            href={job.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary btn-sm"
          >
            Visit Posting
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      )}

      {/* Skill Tags */}
      {job.tags && job.tags.length > 0 && (
        <div className="detail-section">
          <h4 className="section-title">Required Competencies & Tags</h4>
          <div className="detail-tags-list">
            {job.tags.map((tag, idx) => (
              <span key={idx} className="tag-pill">{tag}</span>
            ))}
          </div>
        </div>
      )}

      {/* Notes & Interview Updates */}
      <div className="detail-section">
        <div className="section-header-row">
          <h4 className="section-title">Personal & Interview Notes</h4>
          {!isEditingNotes ? (
            <button
              type="button"
              className="btn-link"
              onClick={() => setIsEditingNotes(true)}
            >
              Edit Notes
            </button>
          ) : (
            <div className="notes-btn-group">
              <button
                type="button"
                className="btn-ghost btn-sm"
                onClick={() => {
                  setNotesDraft(job.notes || '');
                  setIsEditingNotes(false);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary btn-sm"
                onClick={handleSaveNotes}
              >
                Save
              </button>
            </div>
          )}
        </div>

        {isEditingNotes ? (
          <textarea
            className="notes-textarea"
            rows="4"
            value={notesDraft}
            onChange={(e) => setNotesDraft(e.target.value)}
            placeholder="Log interview stages, interviewer names, key questions, follow-up deadlines..."
            aria-label="Personal Notes"
          />
        ) : (
          <div className="notes-content-box">
            {job.notes ? (
              <p className="notes-text">{job.notes}</p>
            ) : (
              <p className="notes-placeholder">No notes recorded yet. Click "Edit Notes" to add interview observations or follow-ups.</p>
            )}
          </div>
        )}
      </div>

      {/* Full Job Description */}
      <div className="detail-section">
        <h4 className="section-title">Job Description & Responsibilities</h4>
        <div className="detail-description-body">
          {job.description ? (
            job.description.split('\n\n').map((para, i) => (
              <p key={i} className="desc-paragraph">
                {para.split('\n').map((line, j) => (
                  <span key={j} style={{ display: 'block' }}>
                    {line}
                  </span>
                ))}
              </p>
            ))
          ) : (
            <p className="desc-empty">No detailed description provided for this listing.</p>
          )}
        </div>
      </div>
    </article>
  );
}
