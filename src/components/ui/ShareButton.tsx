import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

interface ShareButtonProps {
  url: string;
  title?: string;
  text?: string;
  extraClasses?: string;
}

/**
 * A UI component for sharing a link
 *
 * - Uses the Web Share API if available, or falls back to clipboard copy. If none
 *   are available, the button is not rendered.
 * - Accepts a URL, title and text to share. Text and title are optional and
 *   displayed by the supported platforms alongside the URL.
 *
 * Note that the Web Share API is only available on mobile devices and only on
 * secure contexts (https).
 *
 * Future enhancements:
 * - The share url passed currently is the Cat API's image url and not the app's
 *   url, since the app is not deployed.
 */

const ShareButton = ({ url, title, text, extraClasses }: ShareButtonProps) => {
  const navigatorCanShare = navigator.canShare && navigator.canShare({ url, title, text });

  if (!(navigatorCanShare || navigator.clipboard)) return null;

  const handleShare = async () => {
    if (navigatorCanShare) {
      try {
        await navigator.share({ url, title, text });
      } catch (error) {
        console.error('Sharing failed:', error); // NOTE: Promise is also rejected when user cancels
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      } catch (error) {
        console.error('Copying to clipboard failed:', error);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      aria-label="share this content"
      title="share this content"
      className={`share ${extraClasses}`.trim()}
    >
      <FontAwesomeIcon icon={faShareNodes} />
    </button>
  );
};

export default memo(ShareButton);
