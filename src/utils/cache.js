import { API_BASE_URL } from '../services/apiConfig';

let versionCheckPromise = null;

/**
 * Deduplicated fetch for the backend public data version.
 * Ensures multiple components mounting simultaneously only trigger one request.
 */
const fetchBackendVersion = async () => {
  if (versionCheckPromise) return versionCheckPromise;
  
  versionCheckPromise = fetch(`${API_BASE_URL}/data-version`)
    .then(res => res.json())
    .then(data => data.version || 1)
    .catch(err => {
      console.warn('[Cache] Failed to fetch data version:', err);
      return null;
    })
    .finally(() => {
      // Keep the promise alive briefly for simultaneous calls, then clear it
      setTimeout(() => { versionCheckPromise = null; }, 50);
    });
    
  return versionCheckPromise;
};

/**
 * Version-based cache utility for SWR (Stale-While-Revalidate)
 * 
 * @param {string} key Unique cache key
 * @param {Function} fetcher Async function that returns fresh data
 * @param {Function} [onBackgroundUpdate] Callback for when fresh data arrives
 * @returns {Promise<any>} The cached or fresh data
 */
export const withCache = async (key, fetcher, onBackgroundUpdate) => {
  let localData = null;
  let localVersion = null;

  try {
    const cachedStr = localStorage.getItem(key);
    if (cachedStr) {
      const cached = JSON.parse(cachedStr);
      // Validate structure matches our new version-based schema
      if (cached && cached.data && typeof cached.version === 'number') {
        localData = cached.data;
        localVersion = cached.version;
      } else {
        localStorage.removeItem(key);
      }
    }
  } catch (e) {
    console.warn(`[Cache] Corrupted cache for ${key}, removing it`);
    localStorage.removeItem(key);
  }

  // 1. Instant UI: If we have valid cached data, return it immediately.
  // Then kick off the lightweight background version check.
  if (localData !== null) {
    fetchBackendVersion().then(backendVersion => {
      // If version API fails, fail gracefully and keep using cache
      if (backendVersion === null) return;
      
      // If version differs, fetch full data and update
      if (backendVersion !== localVersion) {
        fetcher().then(freshData => {
          if (freshData && freshData.success !== false) {
            try {
              localStorage.setItem(key, JSON.stringify({
                data: freshData,
                version: backendVersion
              }));
              if (onBackgroundUpdate) {
                onBackgroundUpdate(freshData);
              }
            } catch (err) {
              console.warn(`[Cache] LocalStorage full or unavailable for ${key}`, err);
            }
          }
        }).catch(err => {
          console.warn(`[Cache SWR] Background fresh data fetch failed for ${key}, keeping stale data`, err);
        });
      }
    });
    
    return localData;
  }

  // 2. No Cache / First Visit: Blocking fetch for both data and version
  const [freshData, backendVersion] = await Promise.all([
    fetcher(),
    fetchBackendVersion()
  ]);
  
  if (freshData && freshData.success !== false) {
    try {
      localStorage.setItem(key, JSON.stringify({
        data: freshData,
        version: backendVersion || 1
      }));
    } catch (err) {
      console.warn(`[Cache] LocalStorage full or unavailable for ${key}`, err);
    }
  }
  
  return freshData;
};

/**
 * Invalidate all cache entries that start with a specific prefix.
 * Useful for admin mutations to instantly clear stale data in the same browser session.
 * @param {string} keyPrefix 
 */
export const invalidateCache = (keyPrefix) => {
  try {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(keyPrefix)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));
  } catch (err) {
    console.warn('[Cache] Error invalidating cache', err);
  }
};
