import express from 'express';
import pool from '../config/db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { toCamelCase, toPascalCaseKeys, slugify } from '../utils/helpers.js';

const router = express.Router();

const FIELDS = [
  'Title', 'Slug', 'ShortDescription', 'Description', 'Icon', 'ImageUrl',
  'MetaTitle', 'MetaDescription', 'DisplayOrder', 'IsFeatured', 'IsActive',
];

router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Services ORDER BY DisplayOrder ASC, Title ASC');
    res.json(toCamelCase(rows));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load services.' });
  }
});

router.get('/:slugOrId', async (req, res) => {
  const { slugOrId } = req.params;
  const isId = /^\d+$/.test(slugOrId);

  try {
    const [rows] = await pool.query(
      isId ? 'SELECT * FROM Services WHERE ServiceId = ?' : 'SELECT * FROM Services WHERE Slug = ?',
      [slugOrId]
    );

    if (!rows.length) {
      return res.status(404).json({ message: 'Service not found.' });
    }

    res.json(toCamelCase(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load service.' });
  }
});

router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const data = toPascalCaseKeys(req.body);
    if (!data.Title) {
      return res.status(400).json({ message: 'Title is required.' });
    }
    if (!data.Slug) data.Slug = slugify(data.Title);

    const columns = FIELDS.filter((f) => data[f] !== undefined);
    const values = columns.map((c) => data[c]);
    const placeholders = columns.map(() => '?').join(', ');

    const [result] = await pool.query(
      `INSERT INTO Services (${columns.join(', ')}) VALUES (${placeholders})`,
      values
    );

    const [rows] = await pool.query('SELECT * FROM Services WHERE ServiceId = ?', [result.insertId]);
    res.status(201).json(toCamelCase(rows[0]));
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'A service with this slug already exists.' });
    }
    res.status(500).json({ message: 'Failed to create service.' });
  }
});

router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const data = toPascalCaseKeys(req.body);
    const columns = FIELDS.filter((f) => data[f] !== undefined);
    if (!columns.length) {
      return res.status(400).json({ message: 'No fields to update.' });
    }

    const sets = columns.map((c) => `${c} = ?`).join(', ');
    const values = [...columns.map((c) => data[c]), req.params.id];

    await pool.query(`UPDATE Services SET ${sets} WHERE ServiceId = ?`, values);

    const [rows] = await pool.query('SELECT * FROM Services WHERE ServiceId = ?', [req.params.id]);
    if (!rows.length) {
      return res.status(404).json({ message: 'Service not found.' });
    }

    res.json(toCamelCase(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update service.' });
  }
});

router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Services WHERE ServiceId = ?', [req.params.id]);
    if (!result.affectedRows) {
      return res.status(404).json({ message: 'Service not found.' });
    }
    res.json({ message: 'Service deleted.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete service.' });
  }
});

export default router;
