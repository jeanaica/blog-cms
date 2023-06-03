import DatePicker from 'components/form/DatePicker';

const PublishOn = () => (
  <>
    <DatePicker
      label=''
      name='scheduledAt'
      minDate={new Date()}
    />
  </>
);

export default PublishOn;
