
// // =============================
// // Nova CSS Responsive Engine
// // =============================

// // nova.js responsive engine using Bootstrap breakpoints
// (function() {
//   const breakpoints = {
//     xs: 0,     // Extra small: below 576px
//     sm: 576,   // Small: ≥576px
//     md: 768,   // Medium: ≥768px
//     lg: 992,   // Large: ≥992px
//     xl: 1200   // Extra large: ≥1200px
//   };

//   function getCurrentBreakpoint(width) {
//     if (width >= breakpoints.xl) return 'xl';
//     if (width >= breakpoints.lg) return 'lg';
//     if (width >= breakpoints.md) return 'md';
//     if (width >= breakpoints.sm) return 'sm';
//     return 'xs';
//   }

//   function applyResponsiveClasses() {
//     const width = window.innerWidth;
//     const breakpoint = getCurrentBreakpoint(width);
    
//     // Log the current breakpoint + exact width
//     console.log(`📏 Current width: ${width}px | Breakpoint: ${breakpoint}`);

//     document.querySelectorAll('[class*="sm:"], [class*="md:"], [class*="lg:"], [class*="xl:"]').forEach(el => {
//       el.classList.forEach(cls => {
//         if (cls.includes(':')) {
//           const [bp, actualClass] = cls.split(':');
//           if (breakpoints[bp] !== undefined) {
//             if (bp === breakpoint || (
//               bp === 'sm' && breakpoint !== 'xs' && breakpoint !== 'sm' && width >= breakpoints.sm && width < breakpoints.md
//             )) {
//               el.classList.add(actualClass);
//             } else {
//               el.classList.remove(actualClass);
//             }
//           }
//         }
//       });
//     });
//   }

//   // Initialize and watch for resizing
//   window.addEventListener('resize', applyResponsiveClasses);
//   window.addEventListener('load', applyResponsiveClasses);

//   console.log("✅ Nova.js responsive engine initialized successfully:", breakpoints);
// })();





// =============================
// Nova CSS Responsive Engine
// =============================

// nova.js responsive engine using Bootstrap breakpoints
(function() {
  const breakpoints = {
    xs: 0,     // Extra small: below 576px
    sm: 576,   // Small: ≥576px
    md: 768,   // Medium: ≥768px
    lg: 992,   // Large: ≥992px
    xl: 1200   // Extra large: ≥1200px
  };

  const breakpointOrder = ['xs', 'sm', 'md', 'lg', 'xl'];

  function getCurrentBreakpoint(width) {
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'xs';
  }

  function applyResponsiveClasses() {
    const width = window.innerWidth;
    const currentBreakpoint = getCurrentBreakpoint(width);
    
    // Log the current breakpoint + exact width
    console.log(`📏 Current width: ${width}px | Breakpoint: ${currentBreakpoint}`);

    document.querySelectorAll('[class*="sm:"], [class*="md:"], [class*="lg:"], [class*="xl:"]').forEach(el => {
      // Group classes by their base class name (e.g., all bg-* classes together)
      const responsiveClasses = {};
      
      el.classList.forEach(cls => {
        if (cls.includes(':')) {
          const [bp, actualClass] = cls.split(':');
          if (breakpoints[bp] !== undefined) {
            // Extract the base class pattern (e.g., "bg" from "bg-primary")
            const basePattern = actualClass.split('-')[0];
            
            if (!responsiveClasses[basePattern]) {
              responsiveClasses[basePattern] = [];
            }
            
            responsiveClasses[basePattern].push({
              breakpoint: bp,
              className: actualClass,
              minWidth: breakpoints[bp]
            });
          }
        }
      });

      // For each group of related classes, apply only the highest matching breakpoint
      Object.keys(responsiveClasses).forEach(basePattern => {
        const group = responsiveClasses[basePattern];
        
        // Sort by breakpoint order (descending) to find highest matching
        group.sort((a, b) => breakpoints[b.breakpoint] - breakpoints[a.breakpoint]);
        
        // Find the highest breakpoint that matches current width
        let classToApply = null;
        for (let item of group) {
          if (width >= item.minWidth) {
            classToApply = item.className;
            break;
          }
        }
        
        // Remove all classes in this group, then apply only the matching one
        group.forEach(item => {
          el.classList.remove(item.className);
        });
        
        if (classToApply) {
          el.classList.add(classToApply);
        }
      });
    });
  }

  // Initialize and watch for resizing
  window.addEventListener('resize', applyResponsiveClasses);
  window.addEventListener('load', applyResponsiveClasses);

  console.log("✅ Nova.js responsive engine initialized successfully:", breakpoints);
})();