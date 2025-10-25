

// server.js
import express from 'express';
import cors from 'cors';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Plaid client config (Sandbox)
const config = new Configuration({
	basePath: PlaidEnvironments.sandbox,
	baseOptions: {
		headers: {
			'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
			'PLAID-SECRET': process.env.PLAID_SECRET,
		},
	},
});

const client = new PlaidApi(config);
let accessToken = null;

// 1️⃣ Create link token (fake sandbox user)
app.post('/create_link_token', async (req, res) => {
	try {
		const response = await client.linkTokenCreate({
			user: { client_user_id: 'fake-user-123' }, // any string works in sandbox
			client_name: 'My Expo App (Sandbox)',
			products: ['auth', 'transactions'],
			country_codes: ['US'],
			language: 'en',
		});
		res.json(response.data);
	} catch (error) {
		console.error('Error creating link token:', error.response?.data || error.message);
		res.status(500).json({ error: error.message });
	}
});

// 2️⃣ Exchange public token for access token
app.post('/exchange_public_token', async (req, res) => {
	try {
		const { public_token } = req.body;
		const response = await client.itemPublicTokenExchange({ public_token });

		accessToken = response.data.access_token;
		const item_id = response.data.item_id;

		res.json({ access_token: accessToken, item_id });
	} catch (error) {
		console.error('Exchange error:', error.response?.data || error.message);
		res.status(500).json({ error: error.message });
	}
});

// 3️⃣ Fetch accounts
app.get('/accounts', async (req, res) => {
	try {
		if (!accessToken) throw new Error('Access token not set');
		const response = await client.accountsGet({ access_token: accessToken });
		res.json(response.data.accounts);
	} catch (error) {
		console.error('Accounts error:', error.response?.data || error.message);
		res.status(500).json({ error: error.message });
	}
});

// 4️⃣ Fetch transactions (last 30 days)
app.get('/transactions', async (req, res) => {
	try {
		if (!accessToken) throw new Error('Access token not set');

		const endDate = new Date().toISOString().split('T')[0];
		const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
			.toISOString()
			.split('T')[0];

		const response = await client.transactionsGet({
			access_token: accessToken,
			start_date: startDate,
			end_date: endDate,
		});

		res.json(response.data.transactions);
	} catch (error) {
		console.error('Transactions error:', error.response?.data || error.message);
		res.status(500).json({ error: error.message });
	}
});

app.listen(3000, () => console.log('✅ Backend running on port 3000'));

