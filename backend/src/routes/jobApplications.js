import express from 'express';
import pool from '../config/db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { toCamelCase, toPascalCaseKeys } from '../utils/helpers.js';

const router = express.Router();

const FIELDS = [
  'JobId', 'FullName', 'Email', 'Phone', 'LinkedInUrl', 'PortfolioUrl',
  'ResumeUrl', 'CoverLetter', 'ApplicationStatus',
];

router.get('/', authenticate, requireAdmin, async (_req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT ja.*, j.Title AS JobTitle, j.Slug AS JobSlug
       FROM JobApplications ja
       JOIN Jobs j ON ja.JobId = j.JobId
       ORDER BY ja.CreatedAt DESC`
    );
    res.json(toCamelCase(rows));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load job applications.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = toPascalCaseKeys(req.body);
    if (!data.JobId || !data.FullName || !data.Email) {
      return res.status(400).json({ message: 'Job, full name, and email are required.' });
    }

    const columns = FIELDS.filter((f) => data[f] !== undefined);
    const [result] = await pool.query(
      `INSERT INTO JobApplications (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`,
      columns.map((c) => data[c])
    );

    const [rows] = await pool.query('SELECT * FROM JobApplications WHERE JobApplicationId = ?', [result.insertId]);
    res.status(201).json(toCamelCase(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to submit application.' });
  }
});

router.put('/:id/status', authenticate, requireAdmin, async (req, res) => {
  const status = typeof req.body === 'string' ? req.body : req.body?.status || req.body?.applicationStatus;
  if (!status) return res.status(400).json({ message: 'Status is required.' });

  try {
    await pool.query('UPDATE JobApplications SET ApplicationStatus = ? WHERE JobApplicationId = ?', [
      status,
      req.params.id,
    ]);
    const [rows] = await pool.query('SELECT * FROM JobApplications WHERE JobApplicationId = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Application not found.' });
    res.json(toCamelCase(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update application status.' });
  }
});

router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM JobApplications WHERE JobApplicationId = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Application not found.' });
    res.json({ message: 'Application deleted.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete application.' });
  }
});

export default router;
