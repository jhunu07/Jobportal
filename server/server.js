//import * as Sentry from '@sentry/node';
//import './config/instrument.js';
import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();
import connection from './config/db.js';

import connectCloudinary from './config/cloudinary.js';
//import Sentry from './config/sentry.js';
import companyRoutes from './routes/companyRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js'
import  {clerkMiddleware} from '@clerk/express';
import  clerkWebhooks  from './controllers/webhooks.js';



const app = express();
const PORT = process.env.PORT || 5000;

( async () => {
  try {
    // Connect to MongoDB and Cloudinary
    await connection();
    await connectCloudinary();

    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(clerkMiddleware())

    // Routes
    app.get('/', (req, res) => res.send('SERVER WORKING'));

    // Webhooks route
    app.post('/webhooks', clerkWebhooks);

    // Company API routes
    app.use('/api/company', companyRoutes);
    app.use('/api/jobs',jobRoutes )
    app.use('/api/user', userRoutes);

    // Start Server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
})();