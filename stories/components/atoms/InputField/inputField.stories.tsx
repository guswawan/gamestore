import { Meta } from '@storybook/react';
import InputField, { InputFieldProps } from '../../../../components/atoms/InputField';

export default {
  title: 'Components/Atoms/InputField',
  component: InputField,
} as Meta;

function Template(args: InputFieldProps) {
  return <InputField {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  label: 'Nama Lengkap',
};
