import { readdir } from 'fs/promises';
import { join } from 'path';

/**
 * ImageScanner - Recursively scans image directories and builds inventory
 * ponytail: Simple recursive scan, no fancy caching or async pools needed
 */

export interface ImageFile {
  path: string;
  filename: string;
  brand: string;
  extension: string;
  categoryHint: string | null;
}

export interface ImageInventory {
  brands: Map<string, ImageFile[]>;
  totalImages: number;
  categorySuggestions: Map<string, string[]>;
}

export interface ImageStats {
  byBrand: Record<string, number>;
  byCategory: Record<string, number>;
  byExtension: Record<string, number>;
}

export class ImageScanner {
  private validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.jfif'];
  private inventory: ImageFile[] = [];

  /**
   * Scan directory recursively for image files
   * @param basePath - Absolute path to /public/images directory
   * @returns ImageInventory with all images grouped by brand
   */
  async scanDirectory(basePath: string): Promise<ImageInventory> {
    this.inventory = [];
    await this._scanRecursive(basePath, basePath);
    
    const brands = this.groupByBrand(this.inventory);
    const categorySuggestions = this._extractCategoryHints(brands);
    
    return {
      brands,
      totalImages: this.inventory.length,
      categorySuggestions,
    };
  }

  /**
   * Group images by brand name
   */
  groupByBrand(images: ImageFile[]): Map<string, ImageFile[]> {
    const brandMap = new Map<string, ImageFile[]>();
    
    for (const image of images) {
      const existing = brandMap.get(image.brand) || [];
      existing.push(image);
      brandMap.set(image.brand, existing);
    }
    
    return brandMap;
  }

  /**
   * Generate statistics about scanned images
   */
  countImages(): ImageStats {
    const byBrand: Record<string, number> = {};
    const byCategory: Record<string, number> = {};
    const byExtension: Record<string, number> = {};

    for (const image of this.inventory) {
      byBrand[image.brand] = (byBrand[image.brand] || 0) + 1;
      byExtension[image.extension] = (byExtension[image.extension] || 0) + 1;
      
      if (image.categoryHint) {
        byCategory[image.categoryHint] = (byCategory[image.categoryHint] || 0) + 1;
      }
    }

    return { byBrand, byCategory, byExtension };
  }

  /**
   * Recursive directory scanner
   * ponytail: Simple recursive function, ceiling: deep nesting may hit call stack
   */
  private async _scanRecursive(currentPath: string, basePath: string): Promise<void> {
    try {
      const entries = await readdir(currentPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = join(currentPath, entry.name);

        if (entry.isDirectory()) {
          if (entry.name === '__MACOSX') continue;
          await this._scanRecursive(fullPath, basePath);
        } else if (entry.isFile()) {
          if (entry.name.startsWith('._')) continue;
          const ext = this._getExtension(entry.name);
          if (this.validExtensions.includes(ext)) {
            const imageFile = this._createImageFile(fullPath, basePath, entry.name);
            this.inventory.push(imageFile);
          }
        }
      }
    } catch (err) {
      // ponytail: Skip unreadable directories, log and continue
      console.warn(`Skipping directory ${currentPath}:`, err);
    }
  }

  /**
   * Create ImageFile from path
   */
  private _createImageFile(fullPath: string, basePath: string, filename: string): ImageFile {
    // Normalize path to /images/... format
    const relativePath = fullPath
      .replace(basePath, '')
      .replace(/\\/g, '/')
      .replace(/^\//, '');
    
    const normalizedPath = `/images/${relativePath}`;
    
    // Extract brand from path (first directory level)
    const pathParts = relativePath.split('/');
    const brand = this._normalizeBrandName(pathParts[0] || 'Unknown');
    
    // Extract category hint from path
    const categoryHint = this._extractCategoryHint(relativePath);
    
    return {
      path: normalizedPath,
      filename,
      brand,
      extension: this._getExtension(filename),
      categoryHint,
    };
  }

  /**
   * Normalize brand name from folder name
   */
  private _normalizeBrandName(folderName: string): string {
    // ponytail: Simple replacements for known patterns
    const normalized = folderName
      .replace(/\s*fans,lights,smart locker/i, '')
      .replace(/\s*wires and cables/i, '')
      .replace(/havells1/, 'Havells')
      .replace(/schneider electrics/i, 'Schneider Electric')
      .replace(/Home theater/i, 'Home Theatre')
      .trim();
    
    // Capitalize first letter of each word
    return normalized
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  /**
   * Extract category hint from path
   * ponytail: Pattern matching, not ML
   */
  private _extractCategoryHint(path: string): string | null {
    const lowerPath = path.toLowerCase();
    
    if (lowerPath.includes('wire') || lowerPath.includes('cable')) {
      return 'Cables & Wires';
    }
    if (lowerPath.includes('fan') || lowerPath.includes('light') || lowerPath.includes('smart') || lowerPath.includes('locker')) {
      return 'Smart Home';
    }
    if (lowerPath.includes('theater') || lowerPath.includes('theatre')) {
      return 'Home Theatre & Audio';
    }
    if (lowerPath.includes('schneider') || lowerPath.includes('havells1')) {
      return 'Switches & Sockets';
    }
    
    return null;
  }

  /**
   * Extract category suggestions by brand
   */
  private _extractCategoryHints(brands: Map<string, ImageFile[]>): Map<string, string[]> {
    const suggestions = new Map<string, string[]>();
    
    brands.forEach((images, brand) => {
      const hints = new Set<string>();
      for (const image of images) {
        if (image.categoryHint) {
          hints.add(image.categoryHint);
        }
      }
      suggestions.set(brand, Array.from(hints));
    });
    
    return suggestions;
  }

  /**
   * Get file extension
   */
  private _getExtension(filename: string): string {
    const lastDot = filename.lastIndexOf('.');
    return lastDot >= 0 ? filename.slice(lastDot).toLowerCase() : '';
  }
}
