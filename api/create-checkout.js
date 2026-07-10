export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'mode': 'payment',
        'line_items[0][price_data][currency]': 'eur',
        'line_items[0][price_data][product_data][name]': 'T-shirt Koriu',
        'line_items[0][price_data][unit_amount]': '2500', // 25,00€ en centimes
        'line_items[0][quantity]': '1',
        'success_url': `${req.headers.origin}/success.html`,
        'cancel_url': `${req.headers.origin}/cancel.html`
      })
    });

    const session = await response.json();
    res.status(200).json({ url: session.url });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
