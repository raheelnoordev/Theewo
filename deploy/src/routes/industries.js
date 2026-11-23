import express from 'express';
import pool from '../config/db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { toCamelCase, toPascalCaseKeys, slugify } from '../utils/helpers.js';

const router = express.Router();

const FIELDS = ['Title', 'Slug', 'ShortDescription', 'Description', 'ImageUrl', 'DisplayOrder', 'IsActive'];

router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Industries ORDER BY DisplayOrder ASC, Title ASC');
    res.json(toCamelCase(rows));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load industries.' });
  }
});

router.get('/:slugOrId', async (req, res) => {
  const { slugOrId } = req.params;
  const isId = /^\d+$/.test(slugOrId);

  try {
    const [rows] = await pool.query(
      isId ? 'SELECT * FROM Industries WHERE IndustryId = ?' : 'SELECT * FROM Industries WHERE Slug = ?',
      [slugOrId]
    );

    if (!rows.length) {
      return res.status(404).json({ message: 'Industry not found.' });
    }

    res.json(toCamelCase(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load industry.' });
  }
});

router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const data = toPascalCaseKeys(req.body);
    if (!data.Title) return res.status(400).json({ message: 'Title is required.' });
    if (!data.Slug) data.Slug = slugify(data.Title);

    const columns = FIELDS.filter((f) => data[f] !== undefined);
    const [result] = await pool.query(
      `INSERT INTO Industries (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`,
      columns.map((c) => data[c])
    );

    const [rows] = await pool.query('SELECT * FROM Industries WHERE IndustryId = ?', [result.insertId]);
    res.status(201).json(toCamelCase(rows[0]));
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'An industry with this slug already exists.' });
    }
    res.status(500).json({ message: 'Failed to create industry.' });
  }
});

router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const data = toPascalCaseKeys(req.body);
    const columns = FIELDS.filter((f) => data[f] !== undefined);
    if (!columns.length) return res.status(400).json({ message: 'No fields to update.' });

    await pool.query(
      `UPDATE Industries SET ${columns.map((c) => `${c} = ?`).join(', ')} WHERE IndustryId = ?`,
      [...columns.map((c) => data[c]), req.params.id]
    );

    const [rows] = await pool.query('SELECT * FROM Industries WHERE IndustryId = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Industry not found.' });
    res.json(toCamelCase(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update industry.' });
  }
});

router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Industries WHERE IndustryId = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Industry not found.' });
    res.json({ message: 'Industry deleted.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete industry.' });
  }
});

export default router;
