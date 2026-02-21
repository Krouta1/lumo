import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from '../utils';

// Mutable mock state used by the mocked hook below
let mockWorkspaces: any = { data: undefined, isLoading: true };

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }));
vi.mock('@/components/forms/CreateWorkspaceForm', () => ({
  default: () => React.createElement('div', null, 'MockForm'),
}));
vi.mock('@/queries/use-workspaces', () => ({
  useWorkspaces: () => mockWorkspaces,
  useCreateWorkspace: () => ({ mutateAsync: async () => ({ id: 1 }) }),
}));

describe('Workspaces component', () => {
  it('shows loading skeletons when isLoading is true', async () => {
    mockWorkspaces = { data: undefined, isLoading: true };
    const { default: Workspaces } =
      await import('@/components/workspaces/Workspaces');
    const { container } = renderWithProviders(<Workspaces />);

    const skeletons = container.querySelectorAll('.h-32');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders a list of workspaces when data is present', async () => {
    const now = new Date().toISOString();
    mockWorkspaces = {
      data: [{ id: 1, name: 'Alpha', createdAt: now }],
      isLoading: false,
    };

    const { default: Workspaces } =
      await import('@/components/workspaces/Workspaces');
    renderWithProviders(<Workspaces />);

    expect(await screen.findByText('Alpha')).toBeInTheDocument();
    expect(screen.queryByText('No workspaces yet')).not.toBeInTheDocument();
  });

  it('shows empty state when there are no workspaces', async () => {
    mockWorkspaces = { data: [], isLoading: false };

    const { default: Workspaces } =
      await import('@/components/workspaces/Workspaces');
    renderWithProviders(<Workspaces />);

    expect(await screen.findByText('No workspaces yet')).toBeInTheDocument();
    expect(
      screen.getByText(/Get started by creating your first workspace/i),
    ).toBeInTheDocument();
  });
});
