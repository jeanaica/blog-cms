import { type FC, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';

import Loading from 'components/loading/Loading';

import { GET_GALLERIES } from '../schema/queries';
import { type Gallery } from '../types/Gallery';

type Props = {
  onSelect: (gallery: Gallery) => void;
  selectedId?: string;
  className?: string;
};

/**
 * GalleryPicker - Searchable gallery selector component
 *
 * Provides a searchable interface for selecting galleries.
 * Used when creating gallery_ref content blocks.
 *
 * Features:
 * - Real-time search filtering by title
 * - Displays gallery thumbnails and metadata
 * - Shows image count
 * - Highlights selected gallery
 *
 * @param onSelect - Callback when a gallery is selected
 * @param selectedId - Currently selected gallery ID
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <GalleryPicker
 *   onSelect={(gallery) => console.log('Selected:', gallery)}
 *   selectedId="123"
 * />
 * ```
 */
const GalleryPicker: FC<Props> = ({ onSelect, selectedId, className }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, data } = useQuery(GET_GALLERIES, {
    variables: { status: 'PUBLISHED' },
  });

  const galleries: Gallery[] = data?.galleries || [];
  const filteredGalleries = galleries.filter(gallery =>
    gallery.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // Auto-select first gallery if none selected
    if (!selectedId && filteredGalleries.length > 0) {
      onSelect(filteredGalleries[0]);
    }
  }, [filteredGalleries, selectedId, onSelect]);

  if (loading) {
    return (
      <div className='w-full p-8'>
        <Loading />
      </div>
    );
  }

  return (
    <div className={classNames('w-full space-y-4', className)}>
      <div className='w-full'>
        <input
          type='text'
          placeholder='Search galleries...'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className='border-b-secondary-300 border-b w-full md:px-4 py-2 outline-none focus:ring-0 focus:text-black'
        />
      </div>

      {filteredGalleries.length === 0 ? (
        <div className='text-center text-gray-500 py-8'>
          {searchTerm
            ? 'No galleries match your search'
            : 'No published galleries available'}
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto'>
          {filteredGalleries.map(gallery => (
            <button
              key={gallery.id}
              type='button'
              onClick={() => onSelect(gallery)}
              className={classNames(
                'flex flex-col p-3 border rounded hover:shadow-md transition-shadow text-left',
                {
                  'border-secondary-700 bg-secondary-50':
                    gallery.id === selectedId,
                  'border-gray-200': gallery.id !== selectedId,
                }
              )}>
              {gallery.images?.[0]?.url && (
                <img
                  src={gallery.images[0].url}
                  alt={gallery.images[0].alt}
                  className='w-full h-32 object-cover rounded mb-2'
                />
              )}
              <h4 className='font-semibold text-sm'>{gallery.title}</h4>
              <p className='text-xs text-gray-500'>
                {gallery.images?.length || 0} image
                {gallery.images?.length !== 1 ? 's' : ''}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryPicker;
