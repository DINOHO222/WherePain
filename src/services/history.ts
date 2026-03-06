import { HistoryRecord } from '@/types';

const HISTORY_KEY = 'symptom_analysis_history';

export const getHistory = (): HistoryRecord[] => {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to read history:', error);
    return [];
  }
};

export const saveHistory = (record: HistoryRecord) => {
  try {
    const history = getHistory();
    // Keep only the most recent 50 records to prevent QuotaExceededError
    const newHistory = [record, ...history].slice(0, 50);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  } catch (error) {
    console.error('Failed to save history:', error);
  }
};

export const clearHistory = () => {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
};
