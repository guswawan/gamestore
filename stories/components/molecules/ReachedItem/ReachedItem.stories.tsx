import { Meta } from '@storybook/react';
import ReachedItem, { ReachedItemProps } from '../../../../components/molecules/ReachedItem';

export default {
  title: 'Components/Molecules/ReachedItem',
  component: ReachedItem,
} as Meta;

function Template(args: ReachedItemProps) {
  return <ReachedItem {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  title: 'Players Top Up',
  count: '290M+',
};
