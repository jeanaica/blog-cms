import DatePicker from 'components/form/datePicker/DatePicker';

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
