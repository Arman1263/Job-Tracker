import { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import DashboardStats from './components/DashboardStats';
import FilterBar from './components/FilterBar';
import JobList from './components/JobList';
import JobDetail from './components/JobDetail';
import JobFormModal from './components/JobFormModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import ClearAllConfirmModal from './components/ClearAllConfirmModal';
import { SAMPLE_JOBS } from './data/sampleJobs';
import { loadJobs, saveJobs, restoreDemoJobs, clearAllJobs } from './utils/storage';
import './App.css';

export default function App() {
  const [jobs, setJobs] = useState(() => loadJobs());
  const [selectedJobId, setSelectedJobId] = useState(() => {
    const initialJobs = loadJobs();
    return initialJobs.length > 0 ? initialJobs[0].id : null;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatus, setActiveStatus] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [deleteCandidateJob, setDeleteCandidateJob] = useState(null);
  const [isClearAllModalOpen, setIsClearAllModalOpen] = useState(false);

  // Mobile navigation state
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);

  // Synchronize state changes to localStorage
  useEffect(() => {
    saveJobs(jobs);
  }, [jobs]);

  // Derived filtered & sorted job list
  const filteredJobs = useMemo(() => {
    return jobs
      .filter(job => {
        // Status filter
        if (activeStatus !== 'All' && job.status !== activeStatus) {
          return false;
        }

        // Search query filter (title, company, location, tags)
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const titleMatch = job.title?.toLowerCase().includes(query);
          const companyMatch = job.company?.toLowerCase().includes(query);
          const locationMatch = job.location?.toLowerCase().includes(query);
          const tagsMatch = job.tags?.some(tag => tag.toLowerCase().includes(query));
          return titleMatch || companyMatch || locationMatch || tagsMatch;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.appliedDate || 0) - new Date(a.appliedDate || 0);
        }
        if (sortBy === 'oldest') {
          return new Date(a.appliedDate || 0) - new Date(b.appliedDate || 0);
        }
        if (sortBy === 'company') {
          return (a.company || '').localeCompare(b.company || '');
        }
        if (sortBy === 'title') {
          return (a.title || '').localeCompare(b.title || '');
        }
        return 0;
      });
  }, [jobs, activeStatus, searchQuery, sortBy]);

  // Ensure an active selectedJob exists if filteredJobs changes
  const selectedJob = useMemo(() => {
    const found = jobs.find(j => j.id === selectedJobId);
    if (found) return found;
    return filteredJobs.length > 0 ? filteredJobs[0] : null;
  }, [jobs, selectedJobId, filteredJobs]);

  // Select job
  const handleSelectJob = (id) => {
    setSelectedJobId(id);
    setIsMobileDetailOpen(true);
  };

  // Close mobile detail
  const handleCloseMobileDetail = () => {
    setIsMobileDetailOpen(false);
  };

  // Quick filter status change
  const handleStatusFilterChange = (status) => {
    setActiveStatus(status);
  };

  // Update status directly from detail dropdown
  const handleJobStatusChange = (jobId, newStatus) => {
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === jobId
          ? { ...job, status: newStatus, updatedAt: new Date().toISOString() }
          : job
      )
    );
  };

  // Save notes directly from detail panel
  const handleSaveNotes = (jobId, newNotes) => {
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === jobId
          ? { ...job, notes: newNotes, updatedAt: new Date().toISOString() }
          : job
      )
    );
  };

  // Add or Edit job
  const handleSaveJob = (jobPayload) => {
    setJobs(prevJobs => {
      const existsIndex = prevJobs.findIndex(j => j.id === jobPayload.id);
      if (existsIndex >= 0) {
        const updated = [...prevJobs];
        updated[existsIndex] = jobPayload;
        return updated;
      } else {
        return [jobPayload, ...prevJobs];
      }
    });

    setSelectedJobId(jobPayload.id);
    setIsMobileDetailOpen(true);
  };

  // Open modal for new job
  const handleOpenNewJobModal = () => {
    setEditingJob(null);
    setIsFormModalOpen(true);
  };

  // Open modal for editing job
  const handleOpenEditJobModal = (job) => {
    setEditingJob(job);
    setIsFormModalOpen(true);
  };

  // Delete single job
  const handleDeleteConfirm = (jobId) => {
    setJobs(prevJobs => {
      const updated = prevJobs.filter(j => j.id !== jobId);
      if (selectedJobId === jobId) {
        setSelectedJobId(updated.length > 0 ? updated[0].id : null);
      }
      return updated;
    });
    setDeleteCandidateJob(null);
    setIsMobileDetailOpen(false);
  };

  // Non-destructive restore: adds back only missing demo jobs
  const handleRestoreDemoJobs = () => {
    const existingIds = new Set(jobs.map(j => j.id));
    const missing = SAMPLE_JOBS.filter(d => !existingIds.has(d.id));

    if (missing.length === 0) {
      alert("All demo applications are already present in your tracker. Existing applications were not modified.");
      return;
    }

    const confirmed = window.confirm(
      `Restore ${missing.length} missing demo listing${missing.length > 1 ? 's' : ''}? ` +
      `Your existing applications (including custom-added and edited listings) will remain completely untouched.`
    );

    if (confirmed) {
      const { updatedJobs } = restoreDemoJobs(jobs);
      setJobs(updatedJobs);
      if (!selectedJobId && updatedJobs.length > 0) {
        setSelectedJobId(updatedJobs[0].id);
      }
    }
  };

  // Clear all applications confirmation handler
  const handleClearAllConfirm = () => {
    const cleared = clearAllJobs();
    setJobs(cleared);
    setSelectedJobId(null);
    setIsMobileDetailOpen(false);
    setIsClearAllModalOpen(false);
  };

  // Clear filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveStatus('All');
  };

  const isFiltered = searchQuery.trim() !== '' || activeStatus !== 'All';

  return (
    <div className="app-wrapper">
      <Header
        onOpenNewJobModal={handleOpenNewJobModal}
        onResetDemoJobs={handleRestoreDemoJobs}
        onOpenClearAllModal={() => setIsClearAllModalOpen(true)}
        totalJobsCount={jobs.length}
      />

      <main className="main-content">
        {/* Synthetic Data Disclaimer Banner */}
        <div className="demo-banner" role="status">
          <div className="demo-banner-content">
            <span className="demo-badge">Demo Mode</span>
            <span>All entries are realistic fictional sample records designed for testing and portfolio evaluation. No real job vacancies implied.</span>
          </div>
          <span className="results-count">Stored in localStorage</span>
        </div>

        {/* Dashboard Stat Cards */}
        <DashboardStats
          jobs={jobs}
          activeFilter={activeStatus}
          onSelectFilter={handleStatusFilterChange}
        />

        {/* Search, Status Tabs & Sorting Bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeStatus={activeStatus}
          onStatusChange={handleStatusFilterChange}
          sortBy={sortBy}
          onSortChange={setSortBy}
          jobs={jobs}
        />

        {/* Main Two-Column Pipeline Workspace */}
        <div className={`workspace-grid ${isMobileDetailOpen ? 'mobile-detail-open' : ''}`}>
          <JobList
            jobs={filteredJobs}
            selectedJobId={selectedJob?.id}
            onSelectJob={handleSelectJob}
            onClearFilters={handleClearFilters}
            onOpenNewJobModal={handleOpenNewJobModal}
            onRestoreDemoJobs={handleRestoreDemoJobs}
            isFiltered={isFiltered}
          />

          <JobDetail
            key={selectedJob?.id || 'no-job-selected'}
            job={selectedJob}
            onStatusChange={handleJobStatusChange}
            onDeleteClick={(job) => setDeleteCandidateJob(job)}
            onEditClick={handleOpenEditJobModal}
            onCloseMobileDetail={handleCloseMobileDetail}
            onSaveNotes={handleSaveNotes}
          />
        </div>
      </main>

      <footer className="app-footer">
        <p>JobTracker Application Hub • Built with React 19 + Vite • Local persistence via localStorage</p>
      </footer>

      {/* Add / Edit Job Modal */}
      <JobFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveJob}
        editingJob={editingJob}
      />

      {/* Delete Single Job Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteCandidateJob)}
        job={deleteCandidateJob}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteCandidateJob(null)}
      />

      {/* Clear All Applications Confirmation Modal */}
      <ClearAllConfirmModal
        isOpen={isClearAllModalOpen}
        totalCount={jobs.length}
        onConfirm={handleClearAllConfirm}
        onCancel={() => setIsClearAllModalOpen(false)}
      />
    </div>
  );
}
