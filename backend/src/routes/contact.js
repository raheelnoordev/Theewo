import express from 'express';
import pool from '../config/db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { toCamelCase, toPascalCaseKeys } from '../utils/helpers.js';
import { sendContactEmails } from '../utils/mailer.js';

const router = express.Router();

const FIELDS = ['FullName', 'Email', 'Phone', 'CompanyName', 'CompanyUrl', 'Region', 'ServiceInterest', 'Message', 'IsJobSeeker', 'Status'];

router.get('/', authenticate, requireAdmin, async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM ContactMessages ORDER BY CreatedAt DESC');
    res.json(toCamelCase(rows));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load contact messages.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = toPascalCaseKeys(req.body);
    if (!data.FullName || !data.Email || !data.Message) {
      return res.status(400).json({ message: 'Full name, email, and message are required.' });
    }

    const columns = FIELDS.filter((f) => data[f] !== undefined);
    const [result] = await pool.query(
      `INSERT INTO ContactMessages (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`,
      columns.map((c) => data[c])
    );

    const [rows] = await pool.query('SELECT * FROM ContactMessages WHERE ContactMessageId = ?', [result.insertId]);
    const saved = toCamelCase(rows[0]);

    // Emails should not block saving the inquiry if SMTP fails
    const emailResult = await sendContactEmails({
      fullName: saved.fullName,
      email: saved.email,
      phone: saved.phone,
      companyName: saved.companyName,
      serviceInterest: saved.serviceInterest,
      message: saved.message,
    });

    res.status(201).json({
      message: 'Thank you! Your message has been received.',
      data: saved,
      email: emailResult,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send message.' });
  }
});

router.put('/:id/status', authenticate, requireAdmin, async (req, res) => {
  const status = typeof req.body === 'string' ? req.body : req.body?.status;
  if (!status) return res.status(400).json({ message: 'Status is required.' });

  try {
    await pool.query('UPDATE ContactMessages SET Status = ? WHERE ContactMessageId = ?', [status, req.params.id]);
    const [rows] = await pool.query('SELECT * FROM ContactMessages WHERE ContactMessageId = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Message not found.' });
    res.json(toCamelCase(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update message status.' });
  }
});

router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM ContactMessages WHERE ContactMessageId = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Message not found.' });
    res.json({ message: 'Message deleted.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete message.' });
  }
});

export default router;
