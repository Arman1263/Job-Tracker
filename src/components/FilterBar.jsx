import { STATUS_OPTIONS } from '../data/sampleJobs';

export default function FilterBar({
  searchQuery,
  onSearchChange,
  activeStatus,
  onStatusChange,
  sortBy,
  onSortChange,
  jobs
}) {
  const allCount = jobs.length;

  const getStatusCount = (statusVal) => {
    return jobs.filter(j => j.status === statusVal).length;
  };

  const filterTabs = [
    { value: 'All', label: 'All', count: allCount },
    ...STATUS_OPTIONS.map(opt => ({
      value: opt.value,
      label: opt.label,
      count: getStatusCount(opt.value)
    }))
  ];

  return (
    <div className="filter-bar">
      <div className="filter-top-row">
        {/* Search input for Title, Company, Location */}
        <div className="search-input-wrapper">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search by title, company, or location..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search jobs"
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => onSearchChange('')}
              aria-label="Clear search query"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="sort-wrapper">
          <label htmlFor="sort-select" className="sort-label">Sort:</label>
          <select
            id="sort-select"
            className="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="newest">Applied: Newest First</option>
            <option value="oldest">Applied: Oldest First</option>
            <option value="company">Company (A-Z)</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Status Filter Pills */}
      <div className="status-filter-pills" role="tablist" aria-label="Job status filters">
        {filterTabs.map(tab => {
          const isActive = activeStatus === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`filter-pill ${isActive ? 'active' : ''}`}
              onClick={() => onStatusChange(tab.value)}
            >
              <span>{tab.label}</span>
              <span className={`pill-badge ${isActive ? 'active-badge' : ''}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
