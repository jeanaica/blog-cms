import { useCallback, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import useTranslation from 'hooks/useTranslation';

import Button from 'components/button/Button';
import Container from 'components/container/Container';
import Dropdown from 'components/dropdown/Dropdown';
import Modal from 'components/modal/Modal';
import useToast from 'components/toast/hook';

import ThoughtCard from './ThoughtCard';
import { GET_THOUGHTS } from '../schema/queries';
import { DELETE_THOUGHT, UPDATE_THOUGHT } from '../schema/mutations';
import { type Thought } from '../types';

const statusOptions = [
  { value: null, label: 'All' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
  { value: 'scheduled', label: 'Scheduled' },
];

const sortOptions = [
  { value: 'desc', label: 'Descending' },
  { value: 'asc', label: 'Ascending' },
];

const ThoughtList = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<{
    [option: string]: string | null;
  }>({ status: null, sort: 'desc' });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { loading, data, refetch } = useQuery(GET_THOUGHTS, {
    variables: {
      status: selectedOption['status'],
      sort: selectedOption['sort'],
    },
  });

  const [deleteThought, { loading: deleteLoading }] =
    useMutation(DELETE_THOUGHT);
  const [updateThought] = useMutation(UPDATE_THOUGHT);

  const handleStatusChange = (selectedOption: string | null) =>
    setSelectedOption(prev => ({ ...prev, status: selectedOption }));

  const handleSortChange = (selectedOption: string | null) =>
    setSelectedOption(prev => ({ ...prev, sort: selectedOption }));

  const handleDelete = useCallback(async () => {
    if (!deleteId) return;
    try {
      await deleteThought({ variables: { id: deleteId } });
      toast('success', t('deleteSuccess'));
      setDeleteId(null);
      refetch();
    } catch {
      toast('error', t('deleteFail'));
    }
  }, [deleteId, deleteThought, refetch, toast, t]);

  const handleStatusUpdate = useCallback(
    async (id: string, status: string) => {
      try {
        await updateThought({ variables: { id, input: { status } } });
        toast('success', t('updateSuccess'));
        refetch();
      } catch {
        toast('error', t('updateFail'));
      }
    },
    [updateThought, refetch, toast, t]
  );

  return (
    <div className='pb-8'>
      <div className='flex justify-between flex-col gap-4 md:flex-row md:gap-8 sticky top-0 pt-8 pb-4 px-8 bg-slate-50 z-20'>
        <Dropdown
          label='Filter by status:'
          options={statusOptions}
          onChange={handleStatusChange}
          defaultValue={statusOptions[0]}
        />
        <Dropdown
          label='Sort:'
          options={sortOptions}
          onChange={handleSortChange}
          defaultValue={sortOptions[0]}
        />
        <div className='flex items-end'>
          <Button
            icon='add_comment'
            primary
            onClick={() => navigate('/thought/add')}>
            New Thought
          </Button>
        </div>
      </div>

      <Container
        loading={loading}
        isEmpty={!data?.thoughts?.length}
        className='px-8'>
        <div className='space-y-4'>
          {data?.thoughts?.map((thought: Thought) => (
            <ThoughtCard
              key={thought.id}
              thought={thought}
              onEdit={() => navigate(`/thought/${thought.id}/edit`)}
              onDelete={() => setDeleteId(thought.id)}
              onStatusUpdate={handleStatusUpdate}
            />
          ))}
        </div>
      </Container>

      <Modal
        showModal={!!deleteId}
        onClose={() => setDeleteId(null)}
        disabled={deleteLoading}>
        <div className='space-y-4'>
          <p className='text-lg font-semibold'>Delete this thought?</p>
          <p className='text-gray-500'>This action cannot be undone.</p>
          <div className='flex gap-4 justify-center'>
            <Button
              text='Cancel'
              onClick={() => setDeleteId(null)}
              disabled={deleteLoading}
            />
            <Button
              text='Delete'
              primary
              onClick={handleDelete}
              isLoading={deleteLoading}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ThoughtList;
