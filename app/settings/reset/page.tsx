'use client'

import { DashboardLayout } from '@/components/DashboardLayout'
import { useEffect, useState } from 'react'
import { RotateCcw, AlertTriangle, Info } from 'lucide-react'
import { formatDate, formatCurrency } from '@/lib/utils'

export default function ResetPage() {
  const [stats, setStats] = useState({
    totalItems: 0,
    lowStockItems: 0,
    totalProduction: 0,
    totalValue: 0,
  })
  const [resetInfo, setResetInfo] = useState<{
    lastInventoryReset: string | null
    lastInventoryValue: number | null
  }>({
    lastInventoryReset: null,
    lastInventoryValue: null,
  })
  const [loading, setLoading] = useState(true)
  const [resetting, setResetting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetchStats()
    fetchResetInfo()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchResetInfo = async () => {
    try {
      const response = await fetch('/api/reset')
      if (response.ok) {
        const data = await response.json()
        setResetInfo(data)
      }
    } catch (error) {
      console.error('Failed to fetch reset info:', error)
    }
  }

  const handleReset = async (type: 'production' | 'info' | 'inventory-monthly') => {
    if (type === 'production') {
      if (!confirm('Are you sure you want to reset the daily production counter? This will only affect the display count, not the actual production data.')) {
        return
      }
    }

    if (type === 'inventory-monthly') {
      if (!confirm('Are you sure you want to perform monthly inventory value reset? This will record the current inventory value as the reset point for this month. The actual inventory value will continue to be calculated in real-time.')) {
        return
      }
    }

    setResetting(true)
    setMessage(null)

    try {
      const response = await fetch('/api/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: data.message || 'Reset successful' })
        fetchStats()
        if (type === 'inventory-monthly') {
          fetchResetInfo()
        }
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to reset' })
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to reset' })
    } finally {
      setResetting(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center text-gray-500">Loading...</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Reset Options</h2>
          <p className="text-gray-600 mt-1">Manage system resets and counters</p>
        </div>

        {message && (
          <div
            className={`p-4 rounded-md ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Current Statistics */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalItems}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">Low Stock Items</p>
              <p className="text-2xl font-bold text-red-600">{stats.lowStockItems}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">Today&apos;s Production</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProduction}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">Inventory Value</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalValue)}</p>
            </div>
          </div>
        </div>

        {/* Reset Options */}
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Reset Options</h3>

          {/* Daily Production Counter */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">Daily Production Counter</h4>
                <p className="text-sm text-gray-600 mb-2">
                  The production counter automatically resets daily based on the date. This reset option is informational only.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                  <Info className="h-4 w-4" />
                  <span>Current count: {stats.totalProduction} (for {formatDate(new Date())})</span>
                </div>
              </div>
              <button
                onClick={() => handleReset('production')}
                disabled={resetting}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RotateCcw className="h-4 w-4" />
                {resetting ? 'Resetting...' : 'Refresh Count'}
              </button>
            </div>
          </div>

          {/* Monthly Inventory Value Reset */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">Monthly Inventory Value Reset</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Record the current inventory value as the monthly reset point. This does not change the actual inventory value, 
                  which continues to be calculated in real-time. Use this to track monthly inventory value changes.
                </p>
                <div className="space-y-1 text-sm text-gray-500 mt-2">
                  <p>
                    Current value: <span className="font-semibold text-gray-900">{formatCurrency(stats.totalValue)}</span>
                  </p>
                  {resetInfo.lastInventoryReset && (
                    <p>
                      Last reset: <span className="font-semibold text-gray-900">{formatDate(new Date(resetInfo.lastInventoryReset))}</span>
                      {resetInfo.lastInventoryValue !== null && (
                        <span className="ml-2">
                          (Value: <span className="font-semibold">{formatCurrency(resetInfo.lastInventoryValue)}</span>)
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleReset('inventory-monthly')}
                disabled={resetting}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RotateCcw className="h-4 w-4" />
                {resetting ? 'Resetting...' : 'Reset Monthly'}
              </button>
            </div>
          </div>

          {/* Information Section */}
          <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">How It Works</h4>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Daily Production Counter: Automatically resets at midnight (00:00:00) based on the system date</li>
                  <li>Inventory Value: Calculated in real-time from (Stock Quantity × Average Price) for all items</li>
                  <li>All production and purchase data is preserved - nothing is deleted</li>
                  <li>Use date filters in Purchase/Production pages to view specific date ranges</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

