import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { slug, brand, type, featured, btu } = req.query || {};

      let query = supabase.from('products').select('*');

      if (slug) {
        query = query.eq('slug', slug);
        const { data, error } = await query.maybeSingle();
        if (error) throw error;
        if (!data) return res.status(404).json({ error: 'Продуктът не е намерен' });
        return res.status(200).json(data);
      }

      if (brand && brand !== 'всички') query = query.eq('brand', brand);
      if (type && type !== 'всички') query = query.eq('type', type);
      if (featured === '1' || featured === 'true') query = query.eq('featured', true);
      if (btu) query = query.eq('btu', Number(btu));

      const { data, error } = await query.order('featured', { ascending: false }).order('price', { ascending: true });
      if (error) throw error;
      return res.status(200).json(data || []);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}
