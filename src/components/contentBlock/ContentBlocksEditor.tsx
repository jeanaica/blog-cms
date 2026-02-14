import { type FC, useEffect, useRef, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import classNames from 'classnames';

import Icon from 'components/icon/Icon';

import BlockHeader from './BlockHeader';
import GalleryBlock from './GalleryBlock';
import SingleImageBlock from './SingleImageBlock';
import SortableBlock from './SortableBlock';
import TextBlock from './TextBlock';
import { type BlockType, BLOCK_TYPE_META, type ContentBlock } from './types';

const BLOCK_OPTIONS: BlockType[] = ['text', 'gallery', 'image'];

const ContentBlocksEditor: FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<{ contentBlocks: ContentBlock[] }>();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'contentBlocks',
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const lastBlockRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

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
    requestAnimationFrame(() => {
      lastBlockRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    });
  };

  const handleDragStart = (event: DragEndEvent) => {
    const idx = fields.findIndex(f => f.id === event.active.id);
    setActiveIndex(idx);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveIndex(null);
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex(f => f.id === active.id);
      const newIndex = fields.findIndex(f => f.id === over.id);
      move(oldIndex, newIndex);
    }
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
      <div className='not-prose flex flex-col items-center justify-center p-12'>
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
    <div className='not-prose space-y-4'>
      <div>{addButton}</div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveIndex(null)}>
        <SortableContext
          items={fields.map(f => f.id)}
          strategy={verticalListSortingStrategy}>
          {fields.map((field, index) => {
            const blockErrors = errors.contentBlocks?.[index];
            const isLast = index === fields.length - 1;
            return (
              <div
                key={field.id}
                ref={isLast ? lastBlockRef : undefined}>
                <SortableBlock
                  id={field.id}
                  index={index}
                  activeIndex={activeIndex}
                  hasError={!!blockErrors}>
                  {dragHandleProps => (
                    <>
                      <BlockHeader
                        type={(field as unknown as ContentBlock).type}
                        onRemove={() => remove(index)}
                        hasError={!!blockErrors}
                        {...dragHandleProps}
                      />
                      <div className='bg-gray-50'>
                        {(field as unknown as ContentBlock).type === 'text' ? (
                          <TextBlock index={index} />
                        ) : (field as unknown as ContentBlock).type ===
                          'image' ? (
                          <SingleImageBlock index={index} />
                        ) : (field as unknown as ContentBlock).type ===
                          'gallery' ? (
                          <GalleryBlock index={index} />
                        ) : (
                          <div className='p-4'>
                            <span className='text-sm text-gray-400 italic'>
                              {
                                BLOCK_TYPE_META[
                                  (field as unknown as ContentBlock).type
                                ]?.label
                              }{' '}
                              block content will appear here
                            </span>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </SortableBlock>
              </div>
            );
          })}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default ContentBlocksEditor;
