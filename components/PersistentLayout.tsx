'use client'

import { memo } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

// Memoized components to prevent unnecessary re-renders
const MemoizedSidebar = memo(Sidebar)
const MemoizedHeader = memo(Header)

interface PersistentLayoutProps {
  children: React.ReactNode
}

export default function PersistentLayout({ children }: PersistentLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <MemoizedSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <MemoizedHeader />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 