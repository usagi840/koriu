export default async function handler(req, res) {
  const response = await fetch('https://api.printify.com/v1/shops.json', {
    headers: {
      'Authorization': `Bearer ${process.env.PRINTIFY_API_TOKEN}`,
      'User-Agent': 'Koriu-test'
    }
  });
  const data = await response.json();
  res.status(200).json(data);
}
