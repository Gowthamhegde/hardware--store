/**
 * CategoryMapper - Maps brand folders to product categories
 * ponytail: Simple pattern matching, no ML needed
 */

export type ProductCategory =
  | 'Switches & Sockets'
  | 'Cables & Wires'
  | 'Smart Home'
  | 'Home Theatre & Audio'
  | 'MCB & DB';

export interface CategoryMapping {
  brand: string;
  primaryCategory: ProductCategory;
  secondaryCategories: ProductCategory[];
  confidence: number;
}

export interface CategoryRule {
  pattern: RegExp;
  category: ProductCategory;
  priority: number;
}

export class CategoryMapper {
  private rules: CategoryRule[] = [
    // High priority - explicit category indicators
    { pattern: /wire|cable/i, category: 'Cables & Wires', priority: 3 },
    { pattern: /fan|light|smart|locker/i, category: 'Smart Home', priority: 3 },
    { pattern: /theater|theatre/i, category: 'Home Theatre & Audio', priority: 3 },
    { pattern: /mcb|db|breaker/i, category: 'MCB & DB', priority: 3 },
    
    // Medium priority - brand-specific defaults
    { pattern: /schneider/i, category: 'Switches & Sockets', priority: 2 },
    { pattern: /havells1/i, category: 'Switches & Sockets', priority: 2 },
    
    // Low priority - general default  
    { pattern: /anchor|finolex|kolors|legrand|norisys|panasonic/i, category: 'Switches & Sockets', priority: 1 },
  ];

  /**
   * Infer category from folder name
   * @param folderName - Folder or path segment
   * @param brand - Brand name for context
   * @returns ProductCategory
   */
  inferCategory(folderName: string, brand: string = ''): ProductCategory {
    const normalized = folderName.toLowerCase();
    
    // Apply rules by priority
    const matches = this.rules
      .filter(rule => rule.pattern.test(normalized))
      .sort((a, b) => b.priority - a.priority);
    
    if (matches.length > 0) {
      return matches[0].category;
    }
    
    // Default fallback
    return 'Switches & Sockets';
  }

  /**
   * Map brand to category with confidence
   * @param brand - Brand name
   * @param imageCount - Number of images for this brand
   * @returns CategoryMapping with confidence score
   */
  mapBrandToCategory(brand: string, imageCount: number): CategoryMapping {
    const normalized = brand.toLowerCase();
    
    // Check for multi-category hints in brand name
    const categories: ProductCategory[] = [];
    let primaryCategory: ProductCategory = 'Switches & Sockets';
    let confidence = 0.5; // Default confidence
    
    // Detect primary category
    if (/wire|cable/.test(normalized)) {
      primaryCategory = 'Cables & Wires';
      confidence = 0.9;
    } else if (/fan|light|smart|yale|luker/.test(normalized)) {
      primaryCategory = 'Smart Home';
      confidence = 0.9;
    } else if (/theater|theatre/.test(normalized)) {
      primaryCategory = 'Home Theatre & Audio';
      confidence = 0.9;
    } else if (/schneider/.test(normalized)) {
      primaryCategory = 'Switches & Sockets';
      confidence = 0.8;
    } else if (/havells/.test(normalized)) {
      // Havells does both switches and wires
      primaryCategory = 'Switches & Sockets';
      categories.push('Cables & Wires');
      confidence = 0.7;
    } else if (/anchor|finolex/.test(normalized)) {
      // These also do both
      primaryCategory = 'Switches & Sockets';
      categories.push('Cables & Wires');
      confidence = 0.7;
    } else {
      confidence = 0.6;
    }
    
    return {
      brand,
      primaryCategory,
      secondaryCategories: categories,
      confidence,
    };
  }

  /**
   * Get all category rules
   */
  getCategoryRules(): CategoryRule[] {
    return [...this.rules];
  }

  /**
   * Add custom rule
   * ponytail: Simple extension point if needed later
   */
  addRule(pattern: RegExp, category: ProductCategory, priority: number = 1): void {
    this.rules.push({ pattern, category, priority });
    this.rules.sort((a, b) => b.priority - a.priority);
  }
}
