import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#292D68] px-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-8">{children}</div>
    </div>
  )
}
