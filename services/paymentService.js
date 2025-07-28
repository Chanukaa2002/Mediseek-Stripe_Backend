import "dotenv/config";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const findOrCreateCustomer = async (userId) => {
  const existingCustomers = await stripe.customers.list({
    metadata: { userId: userId },
    limit: 1,
  });

  if (existingCustomers.data.length > 0) {
    console.log(`Found existing customer for userId: ${userId}`);
    return existingCustomers.data[0];
  }
  console.log(`Creating new customer for userId: ${userId}`);
  return await stripe.customers.create({
    metadata: {
      userId: userId,
    },
  });
};

export const createPaymentSession = async ({ amount, userId, items }) => {
  const customer = await findOrCreateCustomer(userId);

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2024-06-20" }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: "usd",
    customer: customer.id,
    metadata: {
      userId: userId,
      items: JSON.stringify(items),
    },
    automatic_payment_methods: {
      enabled: true,
    },
  });
  return {
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  };
};
