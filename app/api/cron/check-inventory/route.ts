import { NextRequest, NextResponse } from 'next/server'
import { checkExpirations } from '@/core/alerts/actions/check-expirations'
import { checkLowStock } from '@/core/alerts/actions/check-low-stock'
import { updateExpirationAlerts } from '@/core/alerts/actions/update-expiration-alerts'
import { updateStockAlerts } from '@/core/alerts/actions/update-stock-alerts'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response('Unauthorized', {
        status: 401,
      })
    }

    console.log('Iniciando verificación de inventario')

    const [
      expirationAlerts,
      stockAlerts,
      updatedExpirationAlerts,
      updatedStockAlerts,
    ] = await Promise.all([
      checkExpirations(),
      checkLowStock(),
      updateExpirationAlerts(),
      updateStockAlerts(),
    ])

    return NextResponse.json({
      newAlerts: {
        expiration: expirationAlerts,
        restock: stockAlerts,
      },
      updatedAlerts: {
        expiration: updatedExpirationAlerts,
        restock: updatedStockAlerts,
      },
      success: true,
    })
  } catch (error) {
    console.error('Error en cron job:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
