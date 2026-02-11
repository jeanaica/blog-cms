import { components, type MultiValueRemoveProps } from 'react-select';

type OptionData = { value: string; label: string; notRemovable?: boolean };

type Props = MultiValueRemoveProps<OptionData, true> & {
  hasRemovable?: boolean;
};

const MultiValueRemove = (props: Props) => {
  if (props.hasRemovable && props.data.notRemovable) {
    return null;
  }
  return <components.MultiValueRemove {...props} />;
};

export default MultiValueRemove;
