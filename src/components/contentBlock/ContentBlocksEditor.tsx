import { FC, useEffect, useRef, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import classNames from 'classnames';

import Icon from 'components/icon/Icon';

import BlockHeader from './BlockHeader';
import TextBlock from './TextBlock';
import { BlockType, BLOCK_TYPE_META, ContentBlock } from './types';

const BLOCK_OPTIONS: BlockType[] = ['text', 'gallery', 'image'];

const ContentBlocksEditor: FC = () => {
  const { control } = useFormContext<{ contentBlocks: ContentBlock[] }>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contentBlocks',
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  const handleAddBlock = (type: BlockType) => {
    append({ type });
    setIsDropdownOpen(false);
  };

  const addButton = (
    <div
      ref={dropdownRef}
      className='relative inline-block'>
      <button
        type='button'
        className='flex items-center gap-2 rounded border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-primary hover:bg-slate-100 duration-300'
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <Icon
          icon='add'
          size='sm'
        />
        <span>Add Block</span>
        <Icon
          icon='expand_more'
          size='sm'
        />
      </button>
      <div
        className={classNames(
          'absolute z-10 mt-1 w-44 rounded bg-white shadow-lg border border-gray-200',
          { hidden: !isDropdownOpen }
        )}>
        <ul className='py-1 text-sm text-gray-700'>
          {BLOCK_OPTIONS.map(type => {
            const { label, icon } = BLOCK_TYPE_META[type];
            return (
              <li key={type}>
                <button
                  type='button'
                  className='flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100'
                  onClick={() => handleAddBlock(type)}>
                  <Icon
                    icon={icon}
                    size='sm'
                  />
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );

  if (fields.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center p-12'>
        <Icon
          icon='dashboard_customize'
          className='text-9xl text-gray-300'
        />
        <span className='text-gray-500 mb-4'>No content blocks yet</span>
        {addButton}
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className='rounded border border-gray-200 overflow-hidden'>
          <BlockHeader
            type={(field as unknown as ContentBlock).type}
            onRemove={() => remove(index)}
          />
          <div className='bg-white'>
            {(field as unknown as ContentBlock).type === 'text' ? (
              <TextBlock index={index} />
            ) : (
              <div className='p-4'>
                <span className='text-sm text-gray-400 italic'>
                  {BLOCK_TYPE_META[(field as unknown as ContentBlock).type]?.label}{' '}
                  block content will appear here
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
      <div className='pt-2'>{addButton}</div>
    </div>
  );
};

export default ContentBlocksEditor;
