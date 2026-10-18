import { useState, useEffect } from 'react';
import { STATUS_OPTIONS, WORK_TYPE_OPTIONS } from '../data/sampleJobs';

function getInitialFormData(editingJob) {
  if (editingJob) {
    return {
      title: editingJob.title || '',
      company: editingJob.company || '',
      status: editingJob.status || 'Applied',
      appliedDate: editingJob.appliedDate || new Date().toISOString().split('T')[0],
      location: editingJob.location || '',
      workType: editingJob.workType || 'Remote',
      salary: editingJob.salary || '',
      jobUrl: editingJob.jobUrl || '',
      contactPerson: editingJob.contactPerson || '',
      tags: Array.isArray(editingJob.tags) ? editingJob.tags.join(', ') : '',
      description: editingJob.description || '',
      notes: editingJob.notes || ''
    };
  }
  return {
    title: '',
    company: '',
    status: 'Applied',
    appliedDate: new Date().toISOString().split('T')[0],
    location: '',
    workType: 'Remote',
    salary: '',
    jobUrl: '',
    contactPerson: '',
    tags: '',
    description: '',
    notes: ''
  };
}

function ModalContent({ onClose, onSave, editingJob }) {
  const [formData, setFormData] = useState(() => getInitialFormData(editingJob));
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    }
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    if (!formData.appliedDate) {
      newErrors.appliedDate = 'Application date is required';
    }
    if (formData.jobUrl && formData.jobUrl.trim() && !formData.jobUrl.startsWith('http')) {
      newErrors.jobUrl = 'URL must start with http:// or https://';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (field === 'title' && !formData.title.trim()) {
      setErrors(prev => ({ ...prev, title: 'Job title is required' }));
    }
    if (field === 'company' && !formData.company.trim()) {
      setErrors(prev => ({ ...prev, company: 'Company name is required' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      title: true,
      company: true,
      appliedDate: true
    });

    if (!validate()) {
      return;
    }

    const processedTags = formData.tags
      ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      : [];

    const jobPayload = {
      ...(editingJob ? { id: editingJob.id, createdAt: editingJob.createdAt } : { id: `job-${Date.now()}`, createdAt: new Date().toISOString() }),
      title: formData.title.trim(),
      company: formData.company.trim(),
      status: formData.status,
      appliedDate: formData.appliedDate,
      location: formData.location.trim(),
      workType: formData.workType,
      salary: formData.salary.trim(),
      jobUrl: formData.jobUrl.trim(),
      contactPerson: formData.contactPerson.trim(),
      tags: processedTags,
      description: formData.description.trim(),
      notes: formData.notes.trim(),
      updatedAt: new Date().toISOString()
    };

    onSave(jobPayload);
    onClose();
  };

  return (
    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <div>
          <h3 id="modal-title" className="modal-title">
            {editingJob ? 'Edit Application' : 'Track New Application'}
          </h3>
          <p className="modal-subtitle">
            {editingJob ? 'Update application details and progress.' : 'Enter details of the opportunity you are targeting.'}
          </p>
        </div>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate className="modal-form">
        <div className="form-grid-2">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="form-title" className="form-label">
              Job Title <span className="req-star">*</span>
            </label>
            <input
              id="form-title"
              type="text"
              className={`form-input ${touched.title && errors.title ? 'input-error' : ''}`}
              placeholder="e.g. Senior Frontend Engineer"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              onBlur={() => handleBlur('title')}
            />
            {touched.title && errors.title && (
              <span className="field-error-msg">{errors.title}</span>
            )}
          </div>

          {/* Company */}
          <div className="form-group">
            <label htmlFor="form-company" className="form-label">
              Company Name <span className="req-star">*</span>
            </label>
            <input
              id="form-company"
              type="text"
              className={`form-input ${touched.company && errors.company ? 'input-error' : ''}`}
              placeholder="e.g. NovaCloud Systems"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              onBlur={() => handleBlur('company')}
            />
            {touched.company && errors.company && (
              <span className="field-error-msg">{errors.company}</span>
            )}
          </div>
        </div>

        <div className="form-grid-3">
          {/* Status */}
          <div className="form-group">
            <label htmlFor="form-status" className="form-label">
              Current Status <span className="req-star">*</span>
            </label>
            <select
              id="form-status"
              className="form-select"
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              {STATUS_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Work Type */}
          <div className="form-group">
            <label htmlFor="form-workType" className="form-label">
              Work Mode
            </label>
            <select
              id="form-workType"
              className="form-select"
              value={formData.workType}
              onChange={(e) => handleChange('workType', e.target.value)}
            >
              {WORK_TYPE_OPTIONS.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Applied Date */}
          <div className="form-group">
            <label htmlFor="form-appliedDate" className="form-label">
              Application Date <span className="req-star">*</span>
            </label>
            <input
              id="form-appliedDate"
              type="date"
              className={`form-input ${touched.appliedDate && errors.appliedDate ? 'input-error' : ''}`}
              value={formData.appliedDate}
              onChange={(e) => handleChange('appliedDate', e.target.value)}
            />
            {touched.appliedDate && errors.appliedDate && (
              <span className="field-error-msg">{errors.appliedDate}</span>
            )}
          </div>
        </div>

        <div className="form-grid-2">
          {/* Location */}
          <div className="form-group">
            <label htmlFor="form-location" className="form-label">
              Location
            </label>
            <input
              id="form-location"
              type="text"
              className="form-input"
              placeholder="e.g. San Francisco, CA or Remote"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
            />
          </div>

          {/* Salary */}
          <div className="form-group">
            <label htmlFor="form-salary" className="form-label">
              Compensation / Salary Range
            </label>
            <input
              id="form-salary"
              type="text"
              className="form-input"
              placeholder="e.g. $140,000 - $165,000"
              value={formData.salary}
              onChange={(e) => handleChange('salary', e.target.value)}
            />
          </div>
        </div>

        <div className="form-grid-2">
          {/* URL */}
          <div className="form-group">
            <label htmlFor="form-jobUrl" className="form-label">
              Posting / Career Link
            </label>
            <input
              id="form-jobUrl"
              type="url"
              className={`form-input ${errors.jobUrl ? 'input-error' : ''}`}
              placeholder="https://company.com/jobs/role"
              value={formData.jobUrl}
              onChange={(e) => handleChange('jobUrl', e.target.value)}
            />
            {errors.jobUrl && (
              <span className="field-error-msg">{errors.jobUrl}</span>
            )}
          </div>

          {/* Contact */}
          <div className="form-group">
            <label htmlFor="form-contact" className="form-label">
              Recruiter / Point of Contact
            </label>
            <input
              id="form-contact"
              type="text"
              className="form-input"
              placeholder="e.g. Jane Doe (Tech Recruiter)"
              value={formData.contactPerson}
              onChange={(e) => handleChange('contactPerson', e.target.value)}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="form-group">
          <label htmlFor="form-tags" className="form-label">
            Skills & Tags (comma separated)
          </label>
          <input
            id="form-tags"
            type="text"
            className="form-input"
            placeholder="e.g. React, TypeScript, GraphQL, Node"
            value={formData.tags}
            onChange={(e) => handleChange('tags', e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="form-desc" className="form-label">
            Job Description & Key Responsibilities
          </label>
          <textarea
            id="form-desc"
            className="form-textarea"
            rows="4"
            placeholder="Paste or summarize the job description requirements..."
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>

        {/* Notes */}
        <div className="form-group">
          <label htmlFor="form-notes" className="form-label">
            Interview Notes & Follow-up Checklist
          </label>
          <textarea
            id="form-notes"
            className="form-textarea"
            rows="3"
            placeholder="Initial recruiter conversation, referral contact, technical questions..."
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button
            type="button"
            className="btn-ghost"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            {editingJob ? 'Save Changes' : 'Add Application'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function JobFormModal({ isOpen, onClose, onSave, editingJob }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <ModalContent
        key={editingJob ? editingJob.id : 'new-job-form'}
        onClose={onClose}
        onSave={onSave}
        editingJob={editingJob}
      />
    </div>
  );
}
