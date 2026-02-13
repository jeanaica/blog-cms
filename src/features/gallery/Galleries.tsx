import { useCallback, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import useTranslation from 'hooks/useTranslation';

import Container from 'components/container/Container';
import useToast from 'components/toast/hook';
import Modal from 'components/modal/Modal';
import Button from 'components/button/Button';

import Header from './components/Header';
import Item from './components/Item';

import { UPDATE_GALLERY_STATUS, DELETE_GALLERY } from './schema/mutations';
import { GET_GALLERIES } from './schema/queries';

import { type Gallery } from './types/Gallery';

const Galleries = () => {
  const toast = useToast();
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<{
    [option: string]: string | null;
  }>({ status: 'PUBLISHED', sort: 'desc' });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { loading, data, refetch } = useQuery(GET_GALLERIES, {
    variables: {
      status: selectedOption['status'],
      sort: selectedOption['sort'],
    },
  });

  const [updateGallery, { loading: updateLoading }] = useMutation(
    UPDATE_GALLERY_STATUS
  );

  const [deleteGallery, { loading: deleteLoading }] =
    useMutation(DELETE_GALLERY);

  const handleOnChange = (option: string, selected: string | null) =>
    setSelectedOption({ ...selectedOption, [option]: selected });

  const handleUpdateStatus = useCallback(
    async (id: string, status: string) => {
      let message = t('updateSuccess');

      try {
        await updateGallery({
          variables: { id, gallery: { status } },
        });

        toast('success', message);

        refetch();
      } catch {
        message = t('updateFail');
        toast('error', message);
      }
    },
    [updateGallery, refetch, toast, t]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      setDeleteConfirm(id);
    },
    []
  );

  const confirmDelete = useCallback(async () => {
    if (!deleteConfirm) return;

    let message = t('updateSuccess');

    try {
      await deleteGallery({
        variables: { id: deleteConfirm },
      });

      toast('success', message);
      setDeleteConfirm(null);
      refetch();
    } catch {
      message = t('updateFail');
      toast('error', message);
    }
  }, [deleteConfirm, deleteGallery, refetch, toast, t]);

  return (
    <div className='pb-8'>
      <Header onChange={handleOnChange} />

      <Container
        loading={loading}
        isEmpty={!data?.galleries.length}
        className='px-8'>
        {data?.galleries.map((gallery: Gallery) => (
          <Item
            key={gallery.id}
            id={gallery.id}
            gallery={gallery}
            onUpdate={handleUpdateStatus}
            onDelete={handleDelete}
            loading={loading || updateLoading || deleteLoading}
          />
        ))}
      </Container>

      <Modal
        showModal={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        disabled={deleteLoading}>
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Delete Gallery</h3>
          <p className='text-sm text-gray-600'>
            Are you sure you want to delete this gallery? This action cannot be
            undone.
          </p>
          <div className='flex gap-3 justify-center'>
            <Button
              onClick={() => setDeleteConfirm(null)}
                            disabled={deleteLoading}>
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              primary
              disabled={deleteLoading}>
              {deleteLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Galleries;
