const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Cache utility for SWR (Stale-While-Revalidate) pattern
 * 
 * @param {string} key Unique cache key
 * @param {Function} fetcher Async function that returns fresh data
 * @param {Function} [onBackgroundUpdate] Callback for when fresh data arrives
 * @param {number} [ttl] Time-to-live in milliseconds
 * @returns {Promise<any>} The cached or fresh data
 */
export const withCache = async (key, fetcher, onBackgroundUpdate, ttl = DEFAULT_TTL) => {
  try {
    const cachedStr = localStorage.getItem(key);
    if (cachedStr) {
      const cached = JSON.parse(cachedStr);
      
      // Validate cache structure
      if (cached && cached.timestamp && cached.data) {
        const isStale = Date.now() - cached.timestamp > ttl;
        
        if (isStale) {
          // Stale-while-revalidate: Fetch fresh data without blocking
          fetcher().then(freshData => {
            // Only update if we received valid data
            if (freshData && !freshData.success === false) {
              localStorage.setItem(key, JSON.stringify({
                data: freshData,
                timestamp: Date.now()
              }));
              if (onBackgroundUpdate) {
                onBackgroundUpdate(freshData);
              }
            }
          }).catch(err => {
            console.warn(`[Cache SWR] Background fetch failed for ${key}, keeping stale data`, err);
          });
        }
        
        return cached.data;
      }
    }
  } catch (e) {
    console.warn(`[Cache] Corrupted cache for ${key}, removing it`);
    localStorage.removeItem(key);
  }

  // No cache or corrupted cache: blocking fetch
  const freshData = await fetcher();
  
  if (freshData && !freshData.success === false) {
    try {
      localStorage.setItem(key, JSON.stringify({
        data: freshData,
        timestamp: Date.now()
      }));
    } catch (err) {
      console.warn(`[Cache] LocalStorage full or unavailable for ${key}`, err);
    }
  }
  
  return freshData;
};

/**
 * Invalidate all cache entries that start with a specific prefix
 * @param {string} keyPrefix 
 */
export const invalidateCache = (keyPrefix) => {
  try {
    // Collect keys first to avoid mutation issues while iterating
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
