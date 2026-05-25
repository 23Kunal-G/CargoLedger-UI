'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Payment } from '@/lib/types'
import { colors } from '@/lib/colors'
import { apiClient } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/api-endpoints'
import { unwrapApiList } from '@/lib/api-response'

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchPayments = async () => {
    setIsLoading(true)
    setError('')

    const response = await apiClient.get<Payment[]>(API_ENDPOINTS.PAYMENTS.LIST)

    if (response.success) {
      setPayments(unwrapApiList<Payment>(response.data))
    } else {
      setError(response.error || 'Unable to load payments')
    }

    setIsLoading(false)
  }

  useEffect(() => {
    fetchPayments()
  }, [])

  const handleVerifyPayment = async (paymentId: string) => {
    const response = await apiClient.post(API_ENDPOINTS.PAYMENTS.VERIFY(paymentId))

    if (response.success) {
      fetchPayments()
    } else {
      setError(response.error || 'Unable to verify payment')
    }
  }

  const handleRefundPayment = async (paymentId: string) => {
    const response = await apiClient.post(API_ENDPOINTS.PAYMENTS.REFUND(paymentId))

    if (response.success) {
      fetchPayments()
    } else {
      setError(response.error || 'Unable to refund payment')
    }
  }

  return (
    <div className="space-y-6 p-6 sm:p-8">
      <div>
        <h1 className="text-3xl font-bold" style={{ color: colors.neutral.darkGray }}>
          Payments
        </h1>
        <p className="mt-2 text-sm" style={{ color: colors.neutral.secondaryText }}>
          Manage shipment payments and refunds
        </p>
        {error && (
          <p className="mt-2 text-sm" style={{ color: colors.status.cancelled }}>
            {error}
          </p>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Payments</CardTitle>
          <CardDescription>{payments.length} total payments</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-32 items-center justify-center">
              <p className="text-sm" style={{ color: colors.neutral.secondaryText }}>
                Loading payments...
              </p>
            </div>
          ) : payments.length === 0 ? (
            <div className="flex h-32 items-center justify-center">
              <p className="text-sm" style={{ color: colors.neutral.secondaryText }}>
                No payments found
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-semibold">Shipment</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Amount</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Method</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-b">
                      <td className="px-4 py-4 text-sm">{payment.shipmentId}</td>
                      <td className="px-4 py-4 text-sm font-semibold">Rs. {payment.amount}</td>
                      <td className="px-4 py-4 text-sm">{payment.method}</td>
                      <td className="px-4 py-4 text-sm">
                        <Badge>{payment.status}</Badge>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleVerifyPayment(payment.id)}
                            title="Verify payment"
                          >
                            <CheckCircle size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRefundPayment(payment.id)}
                            title="Refund payment"
                          >
                            <RefreshCcw size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
