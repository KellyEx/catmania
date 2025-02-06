import { Link } from 'react-router-dom';

interface EmptySectionProps {
  type?: 'no-cat' | 'no-cats' | 'no-favourites';
}

const MESSAGES = {
  'no-cat': {
    emoji: '🙀',
    label: 'screaming cat',
    text: "Looks like the cat you're looking for has wandered off to chase a laser pointer.",
  },
  'no-cats': {
    emoji: '😿',
    label: 'sad cat',
    text: 'Seems like the cats went out for a walk...',
  },
  'no-favourites': {
    emoji: '😻',
    label: 'love cat',
    text: (
      <>
        No favourite cats yet. Add some from the <Link to="/">home page</Link>!
      </>
    ),
  },
};

/**
 * Display relevant messages when a section is empty
 *
 * - Reusable way to display messages when a section is empty in a consistent way.
 * - Different messages can be displayed based on the type prop.
 */
const EmptySection = ({ type = 'no-cats' }: EmptySectionProps) => {
  const { emoji, label, text } = MESSAGES[type];

  return (
    <section className="empty-section">
      <span role="img" className="emoji" aria-label={`${label} emoji`}>
        {emoji}
      </span>
      <h2 className="title">{text}</h2>
    </section>
  );
};

export default EmptySection;
