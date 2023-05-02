import DatePicker from 'components/form/datePicker/DatePicker';

const PublishOn = () => (
  <>
    <DatePicker
      label=''
      name='postDate'
      minDate={new Date()}
    />
  </>
);

export default PublishOn;
