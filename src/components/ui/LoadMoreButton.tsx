interface LoadMoreButtonProps {
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  onClick: () => void;
  isError?: boolean;
}

/**
 * Button to load more images
 *
 * - Shows an error message by passing the isError prop.
 * - Indicates loading state and end of the list by disabling the button and changing
 *   the text and style.
 */
const LoadMoreButton = ({
  isFetchingNextPage,
  hasNextPage,
  onClick,
  isError,
}: LoadMoreButtonProps) => {
  const loadMoreButtonDisabled = isFetchingNextPage || !hasNextPage;

  const loadMoreButtonClass = hasNextPage ? 'button' : 'button button-neutral';

  const loadMoreButtonText = hasNextPage
    ? isFetchingNextPage
      ? 'Loading more...'
      : 'Load more'
    : 'You have seen it all!';

  return (
    <section className="load-more-section">
      {isError && !isFetchingNextPage && (
        <p className="error-message">
          An error occurred while loading more images. Please try again.
        </p>
      )}
      <button onClick={onClick} className={loadMoreButtonClass} disabled={loadMoreButtonDisabled}>
        {loadMoreButtonText}
      </button>
    </section>
  );
};

export default LoadMoreButton;
