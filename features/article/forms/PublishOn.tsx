import DatePicker from 'components/form/DatePicker';
import { useFormContext } from 'react-hook-form';

const PublishOn = () => {
  const { watch } = useFormContext();

  return (
    <>
      <DatePicker
        label=''
        name='scheduledAt'
        minDate={new Date()}
        readOnly={watch('status') === 'PUBLISHED'}
      />
    </>
  );
};

export default PublishOn;
