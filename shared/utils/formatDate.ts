const formatDate = (dateValue?: string | Date) => {
  let date = new Date();

  if (dateValue) {
    date = new Date(dateValue);
  }

  return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' : ''}${
    date.getMonth() + 1
  }-${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;
};

export default formatDate;
