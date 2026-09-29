/**
 * Unit tests for Responsive Typography System
 * Validates the CSS custom properties and responsive scaling implementation.
 * 
 * Task 2.1: Create CSS custom properties for responsive typography and spacing
 * Requirements: 2.1, 2.5
 */

import '@testing-library/jest-dom';

describe('Responsive Typography System - CSS Custom Properties', () => {
  let mockDocument: Document;
  let mockElement: HTMLElement;

  beforeEach(() => {
    // Create a mock HTML element to test CSS custom property values
    mockElement = document.createElement('div');
    document.body.appendChild(mockElement);
  });

  afterEach(() => {
    document.body.removeChild(mockElement);
  });

  it('defines all required responsive typography variables', () => {
    // Test that CSS custom properties are properly defined in globals.css
    const expectedVars = [
      '--text-xs',
      '--text-sm', 
      '--text-base',
      '--text-lg',
      '--text-xl',
      '--text-2xl',
      '--text-3xl',
      '--text-4xl',
      '--text-5xl',
      '--text-6xl'
    ];

    expectedVars.forEach(cssVar => {
      const computedStyle = getComputedStyle(document.documentElement);
      const value = computedStyle.getPropertyValue(cssVar);
      
      // The CSS custom property should exist and not be empty
      expect(value).toBeTruthy();
      // Should contain clamp() function for responsive scaling
      expect(value).toMatch(/clamp\(/);
    });
  });

  it('defines responsive mono typography variables for technical text', () => {
    const expectedMonoVars = [
      '--text-mono-2xs',
      '--text-mono-xs',
      '--text-mono-sm',
      '--text-mono-base',
      '--text-mono-lg'
    ];

    expectedMonoVars.forEach(cssVar => {
      const computedStyle = getComputedStyle(document.documentElement);
      const value = computedStyle.getPropertyValue(cssVar);
      
      expect(value).toBeTruthy();
      expect(value).toMatch(/clamp\(/);
    });
  });

  it('defines mobile-first responsive spacing variables', () => {
    const expectedSpacingVars = [
      '--spacing-2xs',
      '--spacing-xs',
      '--spacing-sm',
      '--spacing-md',
      '--spacing-lg',
      '--spacing-xl',
      '--spacing-2xl',
      '--spacing-3xl'
    ];

    expectedSpacingVars.forEach(cssVar => {
      const computedStyle = getComputedStyle(document.documentElement);
      const value = computedStyle.getPropertyValue(cssVar);
      
      expect(value).toBeTruthy();
      expect(value).toMatch(/clamp\(/);
    });
  });

  it('defines touch target size standards', () => {
    const computedStyle = getComputedStyle(document.documentElement);
    
    const minTouchTarget = computedStyle.getPropertyValue('--touch-target-min');
    const comfortableTouchTarget = computedStyle.getPropertyValue('--touch-target-comfortable');
    
    expect(minTouchTarget).toBe('44px');
    expect(comfortableTouchTarget).toBe('48px');
  });

  it('defines breakpoint system variables', () => {
    const expectedBreakpoints = [
      '--breakpoint-mobile',
      '--breakpoint-mobile-lg',
      '--breakpoint-tablet',
      '--breakpoint-tablet-lg',
      '--breakpoint-desktop',
      '--breakpoint-desktop-xl'
    ];

    expectedBreakpoints.forEach(cssVar => {
      const computedStyle = getComputedStyle(document.documentElement);
      const value = computedStyle.getPropertyValue(cssVar);
      
      expect(value).toBeTruthy();
      expect(value).toMatch(/px$/); // Should end with px
    });
  });
});

describe('Responsive Typography Utilities', () => {
  let testElement: HTMLElement;

  beforeEach(() => {
    testElement = document.createElement('div');
    document.body.appendChild(testElement);
  });

  afterEach(() => {
    document.body.removeChild(testElement);
  });

  it('applies responsive typography classes correctly', () => {
    const responsiveClasses = [
      'text-responsive-xs',
      'text-responsive-sm', 
      'text-responsive-base',
      'text-responsive-lg',
      'text-responsive-xl',
      'text-responsive-2xl',
      'text-responsive-3xl',
      'text-responsive-4xl',
      'text-responsive-5xl',
      'text-responsive-6xl'
    ];

    responsiveClasses.forEach(className => {
      testElement.className = className;
      const computedStyle = getComputedStyle(testElement);
      const fontSize = computedStyle.fontSize;
      
      // Font size should be applied and be non-zero
      expect(fontSize).toBeTruthy();
      expect(fontSize).not.toBe('0px');
    });
  });

  it('applies mono responsive typography classes with correct font family', () => {
    const monoClasses = [
      'text-mono-responsive-2xs',
      'text-mono-responsive-xs',
      'text-mono-responsive-sm',
      'text-mono-responsive-base',
      'text-mono-responsive-lg'
    ];

    monoClasses.forEach(className => {
      testElement.className = className;
      const computedStyle = getComputedStyle(testElement);
      const fontFamily = computedStyle.fontFamily;
      
      // Should include monospace in font family
      expect(fontFamily).toMatch(/monospace/i);
    });
  });
});

describe('Mobile-First Grid System', () => {
  let gridElement: HTMLElement;

  beforeEach(() => {
    gridElement = document.createElement('div');
    document.body.appendChild(gridElement);
  });

  afterEach(() => {
    document.body.removeChild(gridElement);
  });

  it('applies responsive product grid class', () => {
    gridElement.className = 'grid-responsive-products';
    const computedStyle = getComputedStyle(gridElement);
    
    // Should be a grid container
    expect(computedStyle.display).toBe('grid');
    
    // Should have grid-template-columns defined
    const gridColumns = computedStyle.gridTemplateColumns;
    expect(gridColumns).toBeTruthy();
  });
});

describe('Touch Target Accessibility', () => {
  let buttonElement: HTMLButtonElement;

  beforeEach(() => {
    buttonElement = document.createElement('button');
    document.body.appendChild(buttonElement);
  });

  afterEach(() => {
    document.body.removeChild(buttonElement);
  });

  it('applies minimum touch targets to interactive elements', () => {
    buttonElement.className = 'touch-target';
    const computedStyle = getComputedStyle(buttonElement);
    
    // Should have minimum touch target dimensions
    expect(computedStyle.minHeight).toBe('44px');
    expect(computedStyle.minWidth).toBe('44px');
  });

  it('applies comfortable touch targets when specified', () => {
    buttonElement.className = 'touch-target-comfortable';
    const computedStyle = getComputedStyle(buttonElement);
    
    expect(computedStyle.minHeight).toBe('48px');
    expect(computedStyle.minWidth).toBe('48px');
  });
});