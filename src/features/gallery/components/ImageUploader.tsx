import { type FC } from 'react';

import MultiImageUpload from 'components/form/MultiImageUpload';

type Props = {
  name: string;
  disabled?: boolean;
  maxImages?: number;
};

/**
 * ImageUploader - Gallery-specific image uploader component
 *
 * Wraps MultiImageUpload with gallery-specific configuration:
 * - Always shows metadata (alt text and captions)
 * - No maximum image limit by default
 * - Images are drag-to-reorder enabled
 *
 * @param name - Form field name for react-hook-form
 * @param disabled - Whether the uploader is disabled
 * @param maxImages - Optional maximum number of images (no limit by default)
 *
 * @example
 * ```tsx
 * <ImageUploader name="images" />
 * <ImageUploader name="images" maxImages={10} />
 * ```
 */
const ImageUploader: FC<Props> = ({ name, disabled, maxImages }) => {
  return (
    <MultiImageUpload
      name={name}
      disabled={disabled}
      maxImages={maxImages}
      showMetadata
    />
  );
};

export default ImageUploader;
