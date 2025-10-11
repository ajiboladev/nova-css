// =============================
// Nova CSS Responsive Engine
// =============================

// Define your breakpoints
const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

// Function to update classes based on current width
function updateResponsiveClasses() {
  const width = window.innerWidth;
  const elements = document.querySelectorAll('[class*="sm:"], [class*="md:"], [class*="lg:"], [class*="xl:"]');

  elements.forEach(el => {
    const classes = el.className.split(/\s+/);
    const baseClasses = [];
    const activeClasses = [];

    classes.forEach(cls => {
      // If it's a responsive class like md:nv-p-4
      if (cls.includes(':')) {
        const [prefix, actual] = cls.split(':');

        // Check if it matches the breakpoint
        if (
          (prefix === 'sm' && width >= breakpoints.sm) ||
          (prefix === 'md' && width >= breakpoints.md) ||
          (prefix === 'lg' && width >= breakpoints.lg) ||
          (prefix === 'xl' && width >= breakpoints.xl)
        ) {
          activeClasses.push(actual);
        }
      } else {
        baseClasses.push(cls);
      }
    });

    // Apply only base + active responsive classes
    el.className = [...baseClasses, ...activeClasses].join(' ');
  });
}

// Listen for resize and load
window.addEventListener('resize', updateResponsiveClasses);
window.addEventListener('DOMContentLoaded', updateResponsiveClasses);
