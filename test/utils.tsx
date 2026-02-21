import React from 'react'
import { render } from '@testing-library/react'
import Providers from '../components/providers/providers'
import { SidebarProvider } from '@/components/ui/sidebar'

export function renderWithProviders(ui: React.ReactElement, options = {}) {
  return render(
    <Providers>
      <SidebarProvider>{ui}</SidebarProvider>
    </Providers>,
    options
  )
}

export * from '@testing-library/react'
