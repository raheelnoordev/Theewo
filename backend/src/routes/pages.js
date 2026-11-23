import express from 'express';
import pool from '../config/db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { toCamelCase, toPascalCaseKeys, slugify } from '../utils/helpers.js';

const router = express.Router();

const FIELDS = ['PageName', 'Slug', 'MetaTitle', 'MetaDescription', 'Content', 'IsActive'];

router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Pages WHERE IsActive = 1 ORDER BY PageName ASC');
    res.json(toCamelCase(rows));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load pages.' });
  }
});

router.get('/admin/all', authenticate, requireAdmin, async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Pages ORDER BY PageName ASC');
    res.json(toCamelCase(rows));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load pages.' });
  }
});

router.get('/:slugOrId', async (req, res) => {
  const { slugOrId } = req.params;
  const isId = /^\d+$/.test(slugOrId);

  try {
    const [rows] = await pool.query(
      isId ? 'SELECT * FROM Pages WHERE PageId = ?' : 'SELECT * FROM Pages WHERE Slug = ?',
      [slugOrId]
    );

    if (!rows.length) return res.status(404).json({ message: 'Page not found.' });
    res.json(toCamelCase(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load page.' });
  }
});

router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const data = toPascalCaseKeys(req.body);
    if (!data.PageName) return res.status(400).json({ message: 'Page name is required.' });
    if (!data.Slug) data.Slug = slugify(data.PageName);

    const columns = FIELDS.filter((f) => data[f] !== undefined);
    const [result] = await pool.query(
      `INSERT INTO Pages (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`,
      columns.map((c) => data[c])
    );

    const [rows] = await pool.query('SELECT * FROM Pages WHERE PageId = ?', [result.insertId]);
    res.status(201).json(toCamelCase(rows[0]));
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'A page with this slug already exists.' });
    }
    res.status(500).json({ message: 'Failed to create page.' });
  }
});

router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const data = toPascalCaseKeys(req.body);
    const columns = FIELDS.filter((f) => data[f] !== undefined);
    if (!columns.length) return res.status(400).json({ message: 'No fields to update.' });

    await pool.query(
      `UPDATE Pages SET ${columns.map((c) => `${c} = ?`).join(', ')} WHERE PageId = ?`,
      [...columns.map((c) => data[c]), req.params.id]
    );

    const [rows] = await pool.query('SELECT * FROM Pages WHERE PageId = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Page not found.' });
    res.json(toCamelCase(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update page.' });
  }
});

router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Pages WHERE PageId = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Page not found.' });
    res.json({ message: 'Page deleted.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete page.' });
  }
});

export default router;
