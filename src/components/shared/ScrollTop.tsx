import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to the top of the page when the pathname changes
 *
 * Used in the App component to scroll to top between page navigations, while
 * keeping the scroll position when only the query params change (e.g. modal open).
 *
 * NOTES:
 * Creating a component rather than a hook, because it needs to be rendered within
 * the Router component to have access to the location object.
 */
const ScrollTop = () => {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPathRef.current) {
      window.scrollTo(0, 0);
      prevPathRef.current = location.pathname;
    }
  }, [location]);

  return null;
};

export default ScrollTop;
