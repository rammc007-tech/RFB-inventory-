'use client'

import { Printer, Eye, Download, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface PrintButtonProps {
  endpoint: string
  options: {
    title: string
    subtitle?: string
    columns: Array<{ header: string; dataKey: string; width?: number }>
    data: any[]
    filename?: string
    showDate?: boolean
  }
  className?: string
}

export function PrintButton({ endpoint, options, className }: PrintButtonProps) {
  const [loading, setLoading] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMenu])

  const generatePDF = async (): Promise<Blob | null> => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          options: {
            ...options,
            filename: options.filename || 'document',
          }
        }),
      })

      if (response.ok) {
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.includes('application/pdf')) {
          const blob = await response.blob()
          return blob
        } else {
          const errorData = await response.json().catch(() => ({}))
          alert(`Failed to generate PDF: ${errorData.error || errorData.details || 'Unknown error'}`)
          return null
        }
      } else {
        try {
          const errorData = await response.json()
          alert(`Failed to generate PDF: ${errorData.error || errorData.details || 'Server error'}`)
        } catch {
          alert(`Failed to generate PDF: HTTP ${response.status}`)
        }
        return null
      }
    } catch (error: any) {
      console.error('Error generating PDF:', error)
      alert(`Failed to generate PDF: ${error?.message || 'Network error'}`)
      return null
    }
  }

  // Example: Simplify handleDownload / handlePreview
  const handlePDFAction = async (action: 'download' | 'preview' | 'print') => {
    setLoading(true)
    setShowMenu(false)
    try {
      const blob = await generatePDF()
      if (!blob) return

      const url = window.URL.createObjectURL(blob)

      if (action === 'download') {
        const a = document.createElement('a')
        a.href = url
        a.download = `${options.filename || 'document'}.pdf`
        a.click()
        document.body.appendChild(a)
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      } else if (action === 'preview' || action === 'print') {
        const win = window.open(url, '_blank')
        if (win) {
          win.focus()
          if (action === 'print') {
            win.onload = () => {
              win.print()
              setTimeout(() => {
                win.close()
                window.URL.revokeObjectURL(url)
              }, 1000)
            }
          }
        } else {
          alert('Please allow popups')
          window.URL.revokeObjectURL(url)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={() => setShowMenu(!showMenu)}
        disabled={loading}
        className={className || 'flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed bg-white'}
      >
        <Printer className="h-5 w-5" />
        {loading ? 'Generating...' : 'Print'}
        <ChevronDown className="h-4 w-4" />
      </button>
      
      {showMenu && (
        <div className="absolute right-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <button
            onClick={() => handlePDFAction('download')}
            disabled={loading}
            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            <Download className="h-4 w-4 text-gray-600" />
            <span>Download PDF</span>
          </button>
          <button
            onClick={() => handlePDFAction('preview')}
            disabled={loading}
            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm border-t border-gray-200"
          >
            <Eye className="h-4 w-4 text-gray-600" />
            <span>Preview PDF</span>
          </button>
          <button
            onClick={() => handlePDFAction('print')}
            disabled={loading}
            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm border-t border-gray-200"
          >
            <Printer className="h-4 w-4 text-gray-600" />
            <span>Print Directly</span>
          </button>
        </div>
      )}
    </div>
  )
}
