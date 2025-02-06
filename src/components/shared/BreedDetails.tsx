import { memo } from 'react';

import { BreedWithDetails } from '../../types';

interface BreedDetailsProps {
  breed: BreedWithDetails;
  full?: boolean;
}

/**
 * Display the details of a breed
 *
 * - A reusable component that displays the details of a breed in a consistent way.
 * - Can show a full description or a short version.
 */
const BreedDetails = ({ breed, full = false }: BreedDetailsProps) => {
  const { name, origin, temperament, description } = breed;

  return (
    <div className="breed-details">
      <h3 className="name">{name}</h3>
      <i className="origin">{origin}</i>
      <span className="temperament">{temperament}</span>
      {full && <p className="description">{description}</p>}
    </div>
  );
};

export default memo(BreedDetails);
