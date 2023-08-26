import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
})

export const POST = async (request: NextRequest) => {
  try {
    const signature = request.headers.get('stripe-signature')!
    const text = await request.text()
    const event = stripe.webhooks.constructEvent(
      text,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET_KEY!,
    )
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any
      await prisma.tripReservation.create({
        data: {
          trip_id: session.metadata.trip_id,
          user_id: session.metadata.user_id,
          guests: Number(session.metadata.guests),
          start_date: new Date(session.metadata.start_date),
          end_date: new Date(session.metadata.end_date),
          total_paid: Number(session.metadata.total_price),
        },
      })
    }

    return new NextResponse(JSON.stringify({ received: true }), { status: 201 })
  } catch (error) {
    console.log(error)
  }
}
