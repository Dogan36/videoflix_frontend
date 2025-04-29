// src/utils/columnUtils.js
/**
 * Utility to determine number of columns based on viewport width.
 * 
 * Define your breakpoints in ascending order of maxWidth.
 * Each breakpoint includes a maxWidth (inclusive) and corresponding column count.
 * The last entry should have maxWidth = Infinity to catch all larger widths.
 */

const defaultBreakpoints = [
    { maxWidth: 600, columns: 2 },
    { maxWidth: 900, columns: 3 },
    { maxWidth: 1200, columns: 4 },
    { maxWidth: Infinity, columns: 5 }
  ];
  
  /**
   * Returns the number of columns that fit in the given width.
   * 
   * @param {number} width - The current viewport or container width in pixels.
   * @param {Array<{maxWidth: number, columns: number}>} breakpoints - Optional custom breakpoints.
   * @returns {number} - The number of columns.
   */
export function getColumnCount(width, breakpoints = defaultBreakpoints) {
    if (typeof width !== 'number' || width < 0) {
      throw new Error('Invalid width provided to getColumnCount');
    }
  
    for (const bp of breakpoints) {
      if (width <= bp.maxWidth) {
        return bp.columns;
      }
    }
  
    // Fallback (should not happen if Infinity is used)
    return 1;
  }
  
  /**
   * Helper that reads window.innerWidth automatically.
   * Useful for client-side only contexts.
   * 
   * @param {Array<{maxWidth: number, columns: number}>} breakpoints 
   * @returns {number}
   */
export function getColumnCountForWindow(breakpoints) {
    if (typeof window === 'undefined') {
      // Server-side rendering fallback
      return defaultBreakpoints[0].columns;
    }
return getColumnCount(window.innerWidth, breakpoints);
}