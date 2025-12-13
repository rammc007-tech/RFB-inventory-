import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only admin can reset
    if (session.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Only administrators can perform reset operations' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { type } = body

    if (type === 'production') {
      // Production counter is date-based, so we just return success
      // The counter will automatically show today's count
      return NextResponse.json({
        message: 'Production counter refreshed. The counter automatically resets daily based on the date.',
      })
    }

    if (type === 'inventory-monthly') {
      // Calculate current inventory value
      const itemsWithStock = await prisma.item.findMany({
        where: { deletedAt: null },
        include: {
          stock: true,
        },
      })

      const currentValue = itemsWithStock.reduce((sum, item) => {
        if (!item.stock) return sum
        return sum + (item.stock.quantity * (item.avgPrice || 0))
      }, 0)

      // Update ShopSettings with reset date and value
      await prisma.shopSettings.upsert({
        where: { id: '1' },
        update: {
          lastInventoryReset: new Date(),
          lastInventoryValue: currentValue,
        },
        create: {
          id: '1',
          name: 'RISHA FOODS AND BAKERY',
          shortForm: 'RFB',
          address: 'Server No: 103/1A2, Agaramel, Poonamallee Taluk, Chennai - 600123',
          email: 'rishafoodsandbakery@gmail.com',
          lastInventoryReset: new Date(),
          lastInventoryValue: currentValue,
        },
      })

      return NextResponse.json({
        message: `Monthly inventory value reset completed. Reset value: ₹${currentValue.toLocaleString()}`,
        resetDate: new Date().toISOString(),
        resetValue: currentValue,
      })
    }

    if (type === 'info') {
      // Just informational
      return NextResponse.json({
        message: 'System information refreshed',
      })
    }

    return NextResponse.json(
      { error: 'Invalid reset type' },
      { status: 400 }
    )
  } catch (error: any) {
    console.error('Error in reset operation:', error)
    return NextResponse.json(
      { error: 'Failed to perform reset operation' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get shop settings to retrieve last reset info
    const settings = await prisma.shopSettings.findUnique({
      where: { id: '1' },
    })

    return NextResponse.json({
      lastInventoryReset: settings?.lastInventoryReset || null,
      lastInventoryValue: settings?.lastInventoryValue || null,
    })
  } catch (error: any) {
    console.error('Error fetching reset info:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reset information' },
      { status: 500 }
    )
  }
}

