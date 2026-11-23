import express from 'express';
import pool from '../config/db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { toCamelCase } from '../utils/helpers.js';

const router = express.Router();

router.get('/stats', authenticate, requireAdmin, async (_req, res) => {
  try {
    const tables = [
      ['services', 'Services'],
      ['industries', 'Industries'],
      ['caseStudies', 'CaseStudies'],
      ['pages', 'Pages'],
      ['jobs', 'Jobs'],
      ['applications', 'JobApplications'],
      ['contactMessages', 'ContactMessages'],
      ['appointments', 'Appointments'],
      ['testimonials', 'Testimonials'],
      ['teamMembers', 'TeamMembers'],
      ['offices', 'Offices'],
    ];

    const stats = {};
    for (const [key, table] of tables) {
      try {
        const [rows] = await pool.query(`SELECT COUNT(*) AS count FROM ${table}`);
        stats[key] = rows[0].count;
      } catch {
        stats[key] = 0;
      }
    }

    const [recentMessages] = await pool.query(
      `SELECT * FROM ContactMessages ORDER BY CreatedAt DESC LIMIT 5`
    );
    const [recentApplications] = await pool.query(
      `SELECT ja.*, j.Title AS JobTitle
       FROM JobApplications ja
       JOIN Jobs j ON ja.JobId = j.JobId
       ORDER BY ja.CreatedAt DESC LIMIT 5`
    );

    let recentAppointments = [];
    try {
      const [rows] = await pool.query(
        `SELECT * FROM Appointments ORDER BY CreatedAt DESC LIMIT 5`
      );
      recentAppointments = rows;
    } catch {
      recentAppointments = [];
    }

    res.json({
      ...stats,
      recentMessages: toCamelCase(recentMessages),
      recentApplications: toCamelCase(recentApplications),
      recentAppointments: toCamelCase(recentAppointments),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load dashboard stats.' });
  }
});

export default router;
