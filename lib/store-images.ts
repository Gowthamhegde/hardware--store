export const STORE_PHOTOS = [
  '/store-photos/photo-01.jpeg',
  '/store-photos/photo-02.jpeg',
  '/store-photos/photo-03.jpeg',
  '/store-photos/photo-04.jpeg',
  '/store-photos/photo-05.jpeg',
  '/store-photos/photo-06.jpeg',
  '/store-photos/photo-07.jpeg',
  '/store-photos/photo-08.jpeg',
  '/store-photos/photo-09.jpeg',
  '/store-photos/photo-10.jpeg',
  '/store-photos/photo-11.jpeg',
  '/store-photos/photo-12.jpeg',
  '/store-photos/photo-13.jpeg',
  '/store-photos/photo-14.jpeg',
];

function hashKey(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

export function getStorePhotoByKey(key: string, fallback = '') {
  if (STORE_PHOTOS.length === 0) return fallback;
  return STORE_PHOTOS[hashKey(key) % STORE_PHOTOS.length] ?? fallback;
}

export function getStorePhotoByIndex(index: number, fallback = '') {
  if (STORE_PHOTOS.length === 0) return fallback;
  const safeIndex = ((index % STORE_PHOTOS.length) + STORE_PHOTOS.length) % STORE_PHOTOS.length;
  return STORE_PHOTOS[safeIndex] ?? fallback;
}