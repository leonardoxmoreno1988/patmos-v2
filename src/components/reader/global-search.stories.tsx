import type { Meta, StoryObj } from '@storybook/tanstack-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalSearch } from './global-search';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const meta: Meta<typeof GlobalSearch> = {
  title: 'Reader/GlobalSearch',
  component: GlobalSearch,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GlobalSearch>;

export const AbiertoPorDefecto: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
  },
};