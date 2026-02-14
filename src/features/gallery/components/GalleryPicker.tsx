import { type FC, useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';

import Loading from 'components/loading/Loading';

import { GET_GALLERIES } from '../schema/queries';
import { type Gallery } from '../types/Gallery';

type Props = {
  onSelect: (gallery: Gallery) => void;
  selectedId?: string;
  className?: string;
  onCreateClick?: () => void;
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
const GalleryPicker: FC<Props> = ({ onSelect, selectedId, className, onCreateClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const hasAutoSelected = useRef(false);

  const { loading, data } = useQuery(GET_GALLERIES);

  const galleries: Gallery[] = data?.galleries || [];
  // Filter out archived galleries and apply search
  const filteredGalleries = galleries
    .filter(gallery => gallery.status !== 'ARCHIVED')
    .filter(gallery =>
      gallery.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  useEffect(() => {
    // Auto-select first gallery if none selected (only once)
    if (!selectedId && filteredGalleries.length > 0 && !hasAutoSelected.current) {
      hasAutoSelected.current = true;
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
            : 'No galleries available'}
        </div>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto'>
          {/* Create Gallery Card */}
          {onCreateClick && (
            <button
              type='button'
              onClick={onCreateClick}
              className='relative flex flex-col border-2 border-dashed border-gray-300 rounded overflow-hidden hover:border-blue-400 hover:bg-blue-50 transition-all'>
              <div className='relative w-full pb-[100%] flex items-center justify-center'>
                <div className='absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400'>
                  <span className='material-icons-outlined text-4xl'>
                    add_circle_outline
                  </span>
                  <span className='text-sm font-medium'>Create Gallery</span>
                </div>
              </div>
            </button>
          )}

          {/* Gallery Cards */}
          {filteredGalleries.map(gallery => (
            <button
              key={gallery.id}
              type='button'
              onClick={() => onSelect(gallery)}
              className={classNames(
                'relative flex flex-col border-2 rounded overflow-hidden hover:shadow-md transition-all',
                {
                  'border-blue-600': gallery.id === selectedId,
                  'border-gray-200': gallery.id !== selectedId,
                }
              )}>
              {gallery.id === selectedId && (
                <span className='material-icons-outlined absolute top-2 right-2 text-blue-600 bg-white rounded-full shadow-md z-10 text-xl'>
                  check_circle
                </span>
              )}
              <div className='relative w-full pb-[100%]'>
                {gallery.images?.[0]?.url && (
                  <img
                    src={gallery.images[0].url}
                    alt={gallery.images[0].alt}
                    className='absolute inset-0 w-full h-full object-cover'
                  />
                )}
              </div>
              <div className='p-2 bg-white text-left'>
                <h4 className='font-semibold text-xs truncate'>{gallery.title}</h4>
                <p className='text-xs text-gray-500'>
                  {gallery.images?.length || 0} image{gallery.images?.length !== 1 ? 's' : ''}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryPicker;
