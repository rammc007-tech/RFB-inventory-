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
    extra?: {
      dailyTotals?: { date: string; total: string }[]
      monthlyTotals?: { month: string; total: string }[]
      grandTotal?: string
      recipeDetails?: Array<{
        recipeName: string
        description: string
        yield: string
        ingredients: Array<{ itemName: string; quantity: string; unit: string }>
      }>
      detailedBreakdown?: Array<{
        recipeName: string
        date: string
        quantity: string
        ingredients: Array<{ itemName: string; quantity: string; unitCost: string; total: string }>
        laborCost: string
        overheadCost: string
        totalCost: string
        costPerUnit: string
      }>
      summary?: {
        totalProductions: number
        totalQuantity: string
        totalCost: string
        averageCostPerUnit: string
      }
      purchaseDetails?: Array<{
        date: string
        supplier: string
        totalAmount: string
        items: Array<{
          itemName: string
          quantity: string
          unitPrice: string
          lineTotal: string
        }>
      }>
    }
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
      if (!blob) {
        // Fallback to browser print if PDF generation fails
        handleBrowserPrint()
        return
      }

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
          // Fallback to browser print if popup blocked
          handleBrowserPrint()
        }
      }
    } catch (error) {
      console.error('PDF action failed, using browser print fallback:', error)
      // Fallback to browser print on any error
      handleBrowserPrint()
    } finally {
      setLoading(false)
    }
  }

  // Alternative browser print method (fallback)
  const handleBrowserPrint = () => {
    try {
      // Create a printable HTML table from the data
      const printWindow = window.open('', '_blank')
      if (!printWindow) {
        alert('Please allow popups to use print feature')
        return
      }

      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>${options.title}</title>
            <style>
              @media print {
                @page { margin: 1cm; }
                body { margin: 0; }
              }
              body {
                font-family: Arial, sans-serif;
                padding: 20px;
                color: #000;
              }
              h1 { color: #D64545; margin-bottom: 10px; }
              h2 { color: #666; margin-bottom: 20px; font-size: 14px; }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
              }
              th {
                background-color: #D64545;
                color: white;
                padding: 10px;
                text-align: left;
                font-weight: bold;
              }
              td {
                padding: 8px;
                border-bottom: 1px solid #ddd;
              }
              tr:nth-child(even) { background-color: #f9f9f9; }
              .summary {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #D64545;
              }
              .grand-total {
                font-size: 18px;
                font-weight: bold;
                color: #D64545;
                margin-top: 20px;
                text-align: right;
              }
            </style>
          </head>
          <body>
            <h1>${options.title}</h1>
            ${options.subtitle ? `<h2>${options.subtitle}</h2>` : ''}
            <table>
              <thead>
                <tr>
                  ${options.columns.map(col => `<th>${col.header}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${options.data.map(row => `
                  <tr>
                    ${options.columns.map(col => `<td>${row[col.dataKey] || ''}</td>`).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
            ${options.extra?.grandTotal ? `
              <div class="summary">
                <div class="grand-total">GRAND TOTAL: ${options.extra.grandTotal}</div>
              </div>
            ` : ''}
            ${options.extra?.dailyTotals && options.extra.dailyTotals.length > 0 ? `
              <div class="summary">
                <h3>Daily Totals:</h3>
                ${options.extra.dailyTotals.map(d => `<p>${d.date}: ${d.total}</p>`).join('')}
              </div>
            ` : ''}
            ${options.extra?.monthlyTotals && options.extra.monthlyTotals.length > 0 ? `
              <div class="summary">
                <h3>Monthly Totals:</h3>
                ${options.extra.monthlyTotals.map(m => `<p>${m.month}: ${m.total}</p>`).join('')}
              </div>
            ` : ''}
          </body>
        </html>
      `

      printWindow.document.write(html)
      printWindow.document.close()
      printWindow.focus()
      
      // Wait for content to load, then print
      setTimeout(() => {
        printWindow.print()
        // Close after print dialog
        setTimeout(() => {
          printWindow.close()
        }, 1000)
      }, 500)
    } catch (error) {
      console.error('Browser print failed:', error)
      alert('Print failed. Please try again or use the download option.')
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
