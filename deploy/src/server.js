import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';
import servicesRoutes from './routes/services.js';
import industriesRoutes from './routes/industries.js';
import caseStudiesRoutes from './routes/caseStudies.js';
import jobsRoutes from './routes/jobs.js';
import jobApplicationsRoutes from './routes/jobApplications.js';
import pagesRoutes from './routes/pages.js';
import contactRoutes from './routes/contact.js';
import appointmentsRoutes from './routes/appointments.js';
import siteSettingsRoutes from './routes/siteSettings.js';
import uploadRoutes from './routes/upload.js';
import { teamMembersRouter, testimonialsRouter, officesRouter, featuredLogosRouter, awardsRouter, partnershipsRouter, technologiesRouter } from './routes/simpleCrud.js';
import { testDatabaseConnection } from './config/db.js';
import { getEmailHealth } from './utils/mailer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend root (next to package.json) — works on Hostinger deploy
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const corsOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || corsOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/api/health', async (_req, res) => {
  try {
    await testDatabaseConnection();
    res.json({ status: 'ok', database: 'connected', timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(503).json({
      status: 'degraded',
      database: 'disconnected',
      message: err.message,
      timestamp: new Date().toISOString(),
    });
  }
});

app.get('/api/health/email', async (_req, res) => {
  const email = await getEmailHealth();
  res.status(email.verified ? 200 : 503).json({
    status: email.verified ? 'ok' : 'error',
    email,
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/industries', industriesRoutes);
app.use('/api/case-studies', caseStudiesRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/job-applications', jobApplicationsRoutes);
app.use('/api/pages', pagesRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/site-settings', siteSettingsRoutes);
app.use('/api/team-members', teamMembersRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/offices', officesRouter);
app.use('/api/featured-logos', featuredLogosRouter);
app.use('/api/awards', awardsRouter);
app.use('/api/partnerships', partnershipsRouter);
app.use('/api/technologies', technologiesRouter);
app.use('/api/upload', uploadRoutes);

// Serve React frontend from backend/public (Hostinger single-domain deploy)
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
    return next();
  }
  res.sendFile(path.join(publicPath, 'index.html'), (err) => {
    if (err) next();
  });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: err.message || 'Internal server error.' });
});

async function startServer() {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
  });

  try {
    await testDatabaseConnection();
    console.log(`Database connected: ${process.env.DB_NAME} @ ${process.env.DB_HOST}`);
  } catch (err) {
    console.error('Database connection failed (server still running):', err.message);
  }
}

startServer();
