import { Select } from 'antd';

interface Props {
  width: number;
  items: {
    value: string;
    label: string;
  }[];
  onChange: () => void;
}
export default function CSelect(props: Props) {
  return (
    <Select
      labelInValue
      defaultValue={{ value: props.items[0].value, label: props.items[0].label }}
      style={{ width: props.width }}
      onChange={() => props.onChange}
      options={props.items}
    />
  );
}
