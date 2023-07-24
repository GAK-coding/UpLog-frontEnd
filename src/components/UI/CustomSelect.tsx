import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

interface CustomSelectProps {
  items: {
    value: string;
    label: string;
  }[];
  value: string;
  placeholder: string;
  onChange: (newValue: string) => void;
}

export default function CustomSelect(props: CustomSelectProps) {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {props.items.find((item) => item.value === props.value)?.label || props.placeholder}
      </MenuButton>
      <MenuList>
        {props.items.map((item, key) => (
          <MenuItem key={key} onClick={() => props.onChange(item.value)}>
            {item.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
