import { components } from 'react-select';

const MultiValueRemove = (props: any) => {
  if (props.hasRemovable && props.data.notRemovable) {
    return null;
  }
  return <components.MultiValueRemove {...props} />;
};

export default MultiValueRemove;
