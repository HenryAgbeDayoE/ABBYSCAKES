import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

// Simple in-memory cache to prevent duplicate fetches
const imageCache: Map<string, string[]> = new Map();

/**
 * Dynamically fetches image download URLs from one or more Firebase Storage paths.
 * @param paths Array of folder paths in Firebase Storage, e.g. ['Cakes/Forever', 'Cakes']
 * @returns Array of public image download URLs retrieved from Firebase Storage
 */
export async function fetchImagesFromFirebasePaths(paths: string[]): Promise<string[]> {
  const cacheKey = paths.sort().join('|');
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey)!;
  }

  const fetchedUrls: string[] = [];

  for (const path of paths) {
    if (!path) continue;
    try {
      const storageRef = ref(storage, path);
      const res = await listAll(storageRef);

      // Fetch download URLs for all files in this path
      const urlPromises = res.items.map(async (itemRef) => {
        try {
          return await getDownloadURL(itemRef);
        } catch (err) {
          console.warn(`Failed to get download URL for ${itemRef.fullPath}`, err);
          return null;
        }
      });

      const urls = await Promise.all(urlPromises);
      const validUrls = urls.filter((url): url is string => Boolean(url));
      fetchedUrls.push(...validUrls);

      // Also recursively inspect subfolders if any
      for (const subfolderRef of res.prefixes) {
        try {
          const subRes = await listAll(subfolderRef);
          const subUrlPromises = subRes.items.map(async (itemRef) => {
            try {
              return await getDownloadURL(itemRef);
            } catch (err) {
              return null;
            }
          });
          const subUrls = await Promise.all(subUrlPromises);
          fetchedUrls.push(...subUrls.filter((url): url is string => Boolean(url)));
        } catch {
          // Ignore subfolder read errors silently
        }
      }
    } catch (err) {
      console.warn(`Could not list Firebase Storage path: "${path}"`, err);
    }
  }

  // Deduplicate URLs
  const uniqueUrls = Array.from(new Set(fetchedUrls));

  if (uniqueUrls.length > 0) {
    imageCache.set(cacheKey, uniqueUrls);
  }

  return uniqueUrls;
}
