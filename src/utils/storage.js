import { SAMPLE_JOBS } from '../data/sampleJobs';

const STORAGE_KEY = 'job_tracker_re_jobs_v1';

// Set of stable IDs that belong to the initial fictional demo dataset
export const DEMO_JOB_IDS = new Set(SAMPLE_JOBS.map(job => job.id));

/**
 * Safely loads jobs from localStorage.
 * Does NOT alter or overwrite any existing records upon loading.
 */
export function loadJobs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      // First-time load: initialize with sample jobs
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_JOBS));
      } catch (writeErr) {
        console.error("Failed to initialize localStorage with demo jobs:", writeErr);
      }
      return SAMPLE_JOBS;
    }

    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return SAMPLE_JOBS;
  } catch (err) {
    console.error("Failed to load jobs from localStorage, falling back to samples:", err);
    return SAMPLE_JOBS;
  }
}

/**
 * Safely saves jobs array to localStorage.
 */
export function saveJobs(jobs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    return true;
  } catch (err) {
    console.error("Failed to save jobs to localStorage:", err);
    return false;
  }
}

/**
 * Non-destructive demo restoration:
 * Restores only missing fictional sample jobs from SAMPLE_JOBS.
 * Does NOT overwrite, delete, or modify any existing user-added or edited applications.
 * Uses stable IDs to ensure no duplicates are ever created if executed multiple times.
 */
export function restoreDemoJobs(currentJobs) {
  try {
    const existingList = Array.isArray(currentJobs) ? currentJobs : loadJobs();
    const existingIds = new Set(existingList.map(job => job.id));

    // Find any demo jobs whose stable ID is not present in current list
    const missingDemoJobs = SAMPLE_JOBS.filter(demoJob => !existingIds.has(demoJob.id));

    if (missingDemoJobs.length === 0) {
      return {
        updatedJobs: existingList,
        restoredCount: 0
      };
    }

    // Preserve all existing applications as-is, and append missing demo jobs
    const updatedJobs = [...existingList, ...missingDemoJobs];
    saveJobs(updatedJobs);

    return {
      updatedJobs,
      restoredCount: missingDemoJobs.length
    };
  } catch (err) {
    console.error("Failed to restore demo jobs:", err);
    return {
      updatedJobs: Array.isArray(currentJobs) ? currentJobs : [],
      restoredCount: 0,
      error: err.message
    };
  }
}

/**
 * Clears all job applications from localStorage safely.
 */
export function clearAllJobs() {
  try {
    saveJobs([]);
    return [];
  } catch (err) {
    console.error("Failed to clear jobs:", err);
    return [];
  }
}

/**
 * Retained for backward-compatibility; delegates to restoreDemoJobs.
 */
export function resetToSampleJobs(currentJobs) {
  return restoreDemoJobs(currentJobs);
}
