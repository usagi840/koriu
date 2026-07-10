export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { cart } = req.body; // ex: [{ name: "T-shirt Koriu", price: 2500, quantity: 2 }]

    const body = new URLSearchParams({
      'mode': 'payment',
      'success_url': `${req.headers.origin}/success.html`,
      'cancel_url': `${req.headers.origin}/cancel.html`
    });

    cart.forEach((item, i) => {
      body.append(`line_items[${i}][price_data][currency]`, 'eur');
      body.append(`line_items[${i}][price_data][product_data][name]`, item.name);
      body.append(`line_items[${i}][price_data][unit_amount]`, item.price);
      body.append(`line_items[${i}][quantity]`, item.quantity);
    });

    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    });

    const session = await response.json();
    res.status(200).json({ url: session.url });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
