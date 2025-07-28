import { createPaymentSession } from '../services/paymentService.js';

export const handleCreatePaymentSession = async (req, res) => {
  try {
    const { amount, userId, items } = req.body;
    if (!amount || !userId || !items) {
      return res.status(400).json({ error: 'Missing required fields: amount, userId, and items are required.' });
    }
    const sessionData = await createPaymentSession({ amount, userId, description, items });

    res.json(sessionData);

  } catch (error) {
    console.error('Error in payment controller:', error);
    res.status(500).json({ error: 'Failed to create payment session' });
  }
};
