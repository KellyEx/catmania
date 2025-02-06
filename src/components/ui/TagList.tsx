import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Tag {
  id: string;
  label: string;
}

interface TagListProps {
  title: string;
  tags: Tag[];
  onRemove: (id: string) => void;
}

/**
 * Tag list component that displays a list of tags with a remove button and a title
 *
 * - Accepts a title prop to display a heading above the tags.
 * - Accepts an array of tags with an id and a label to be displayed.
 * - Allows removing each tag by clicking the remove button next to it.
 */
const TagList = ({ title, tags, onRemove }: TagListProps) => {
  if (tags.length === 0) return null;

  return (
    <section className="tags-section">
      <h3 className="title">{title}</h3>
      {tags.map(({ id, label }) => (
        <div className="tag" key={id}>
          <span>{label}</span>
          <button className="remove" onClick={() => onRemove(id)} aria-label={`Remove ${label}`}>
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
      ))}
    </section>
  );
};

export default TagList;
