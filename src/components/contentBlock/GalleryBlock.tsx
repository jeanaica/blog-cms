import { type FC, useState, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import GalleryPicker from 'features/gallery/components/GalleryPicker';
import CreateGalleryModal from 'features/gallery/components/CreateGalleryModal';
import type { Gallery } from 'features/gallery/types/Gallery';

type Props = {
  index: number;
};

const GalleryBlock: FC<Props> = ({ index }) => {
  const { setValue, watch } = useFormContext();
  const selectedGalleryId = watch(`contentBlocks.${index}.galleryId`);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleGallerySelect = useCallback((gallery: Gallery) => {
    // Set galleryId (required for backend)
    setValue(`contentBlocks.${index}.galleryId`, gallery.id, {
      shouldValidate: true,
      shouldDirty: true,
    });

    // Set galleryName and images for display purposes
    setValue(`contentBlocks.${index}.galleryName`, gallery.title, {
      shouldDirty: true,
    });

    setValue(
      `contentBlocks.${index}.images`,
      gallery.images.map(img => ({
        id: crypto.randomUUID(),
        url: img.url,
        alt: img.alt,
        caption: img.caption,
      })),
      {
        shouldDirty: true,
      }
    );
  }, [index, setValue]);

  const handleGalleryCreated = useCallback((gallery: Gallery) => {
    // Auto-select the newly created gallery
    handleGallerySelect(gallery);
    setShowCreateModal(false);
  }, [handleGallerySelect]);

  return (
    <div className='w-full p-4'>
      <GalleryPicker
        onSelect={handleGallerySelect}
        selectedId={selectedGalleryId}
        onCreateClick={() => setShowCreateModal(true)}
      />

      <CreateGalleryModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onGalleryCreated={handleGalleryCreated}
      />
    </div>
  );
};

export default GalleryBlock;
