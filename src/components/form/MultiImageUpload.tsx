import { type DragEvent, type FC, useCallback, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import classNames from 'classnames';

import Icon from 'components/icon/Icon';

import FieldError from './FieldError';
import SortableImageCard from './SortableImageCard';

export type ImageItem = {
  id: string;
  file?: File;
  url?: string;
  caption?: string;
  alt?: string;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const getPreview = (item: ImageItem): string => {
  if (item.url) return item.url;
  if (item.file) return URL.createObjectURL(item.file);
  return '';
};

type Props = {
  name: string;
  disabled?: boolean;
  maxImages?: number;
  showMetadata?: boolean;
};

const MultiImageUpload: FC<Props> = ({
  name,
  disabled,
  maxImages,
  showMetadata,
}) => {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext();

  const [dragActive, setDragActive] = useState(false);
  const [fileErrors, setFileErrors] = useState<string[]>([]);

  const isDisabled = disabled || isSubmitting;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const validateFiles = useCallback(
    (
      files: FileList | File[],
      onChange: (items: ImageItem[]) => void,
      current: ImageItem[]
    ) => {
      const errors: string[] = [];
      const newItems: ImageItem[] = [];
      const remaining = maxImages ? maxImages - current.length : Infinity;

      Array.from(files).forEach(file => {
        if (newItems.length >= remaining) {
          errors.push(`"${file.name}" — Maximum ${maxImages} images allowed.`);
          return;
        }

        if (!ALLOWED_TYPES.includes(file.type)) {
          errors.push(
            `"${file.name}" — Only .jpg, .png, and .webp formats are supported.`
          );
          return;
        }

        if (file.size > MAX_FILE_SIZE) {
          errors.push(`"${file.name}" — Max image size is 10MB.`);
          return;
        }

        newItems.push({
          id: crypto.randomUUID(),
          file,
        });
      });

      setFileErrors(errors);

      if (newItems.length > 0) {
        onChange([...current, ...newItems]);
      }
    },
    [maxImages]
  );

  const handleDrag = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        validate: value => {
          if (!Array.isArray(value) || value.length === 0)
            return 'At least one image is required';
          if (maxImages && value.length > maxImages)
            return `Maximum ${maxImages} images allowed`;
          return true;
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const items: ImageItem[] = Array.isArray(value) ? value : [];

        const handleDrop = (e: DragEvent<HTMLElement>) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(false);
          if (e.dataTransfer.files.length > 0) {
            validateFiles(e.dataTransfer.files, onChange, items);
          }
        };

        const handleRemove = (id: string) => {
          onChange(items.filter(item => item.id !== id));
        };

        const handleDragEnd = (event: DragEndEvent) => {
          const { active, over } = event;
          if (over && active.id !== over.id) {
            const oldIndex = items.findIndex(item => item.id === active.id);
            const newIndex = items.findIndex(item => item.id === over.id);
            onChange(arrayMove(items, oldIndex, newIndex));
          }
        };

        const handleMetadataChange = (
          id: string,
          field: 'caption' | 'alt',
          value: string
        ) => {
          onChange(
            items.map(item =>
              item.id === id ? { ...item, [field]: value } : item
            )
          );
        };

        const atMaxCapacity = maxImages ? items.length >= maxImages : false;

        return (
          <div className='w-full space-y-3'>
            {!atMaxCapacity && (
              <label
                htmlFor={`${name}-input`}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={classNames(
                  'flex flex-col items-center justify-center w-full h-40 border border-dashed cursor-pointer bg-gray-50 rounded-md px-4 py-2',
                  {
                    'border-secondary-700 bg-secondary-100': dragActive,
                    'border-error-300': error || fileErrors.length > 0,
                    'border-secondary-300':
                      !error && fileErrors.length === 0 && !dragActive,
                    'opacity-50 cursor-not-allowed': isDisabled,
                  }
                )}>
                <Icon
                  icon='add_photo_alternate'
                  size={48}
                  className='text-gray-400 mb-2'
                />
                <p className='text-sm text-gray-500 text-center'>
                  <span className='font-semibold'>Click to upload</span> or drag
                  and drop
                </p>
                <p className='text-xs text-gray-500 text-center'>
                  PNG, JPG, JPEG or WEBP (MAX. 10MB each)
                </p>
                <input
                  className='hidden'
                  id={`${name}-input`}
                  type='file'
                  multiple
                  accept='image/jpeg,image/png,image/webp'
                  onChange={e => {
                    if (e.target.files && e.target.files.length > 0) {
                      validateFiles(e.target.files, onChange, items);
                      e.target.value = '';
                    }
                  }}
                  disabled={isDisabled}
                />
              </label>
            )}

            {fileErrors.length > 0 && (
              <div className='space-y-1'>
                {fileErrors.map((err, i) => (
                  <FieldError
                    key={i}
                    message={err}
                  />
                ))}
              </div>
            )}

            {items.length > 0 && (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}>
                <SortableContext
                  items={items.map(item => item.id)}
                  strategy={rectSortingStrategy}>
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                    {items.map(item => (
                      <SortableImageCard
                        key={item.id}
                        id={item.id}
                        preview={getPreview(item)}
                        onRemove={() => handleRemove(item.id)}
                        disabled={isDisabled}
                        caption={showMetadata ? item.caption : undefined}
                        alt={showMetadata ? item.alt : undefined}
                        onCaptionChange={
                          showMetadata
                            ? v => handleMetadataChange(item.id, 'caption', v)
                            : undefined
                        }
                        onAltChange={
                          showMetadata
                            ? v => handleMetadataChange(item.id, 'alt', v)
                            : undefined
                        }
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}

            <FieldError
              message={error?.message}
              className='block'
            />
          </div>
        );
      }}
    />
  );
};

export default MultiImageUpload;
