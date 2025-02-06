export interface LoadingGridProps {
  length?: number;
  extraClasses?: string;
}

/**
 * A skeleton loading grid
 *
 * - Can be used to show a loading state for a grid of a known length and style.
 * - Use the extra class to pass the css classes of the grid-to-be-loaded, to match
 *   its layout, or use it standalone, as a single-element loading placeholder.
 */
const LoadingGrid = ({ extraClasses = '', length = 1 }) => {
  return (
    <section className={`${extraClasses} loading-grid`.trim()}>
      {Array.from({ length }).map((_, index) => (
        <span key={index} className="image image-loading"></span>
      ))}
    </section>
  );
};

export default LoadingGrid;
