import { createPaymentSession } from '../services/paymentService.js';

export const handleCreatePaymentSession = async (req, res) => {
  try {
    // --- THIS IS THE FIX ---
    // Make sure 'description' is included here when destructuring req.body
    const { amount, userId, description, items } = req.body;

    // Basic validation to ensure required fields are present
    if (!amount || !userId || !items) {
      return res.status(400).json({ error: 'Missing required fields: amount, userId, and items are required.' });
    }

    // Now the 'description' variable exists and can be safely passed to the service
    const sessionData = await createPaymentSession({ amount, userId, description, items });

    // Send the session data back to the mobile app
    res.json(sessionData);

  } catch (error) {
    // Log the actual error for debugging
    console.error('Error in payment controller:', error);
    res.status(500).json({ error: 'Failed to create payment session' });
  }
};

