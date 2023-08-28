import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
})

export const POST = async (request: NextRequest) => {
  const req = await request.json()
  const {
    cover_image,
    description,
    end_date,
    guests,
    name,
    start_date,
    trip_id,
    total_price,
    user_id,
  } = req
  const session = await stripe.checkout.sessions.create({
    success_url: 'http://localhost:3000/trips/success',
    line_items: [
      {
        price_data: {
          currency: 'BRL',
          unit_amount: total_price * 100,
          product_data: {
            name,
            description,
            images: [cover_image],
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    metadata: {
      trip_id,
      user_id,
      start_date,
      end_date,
      guests,
      total_price,
    },
  })

  return new NextResponse(
    JSON.stringify({
      session_id: session.id,
    }),
    {
      status: 201,
    },
  )
}
