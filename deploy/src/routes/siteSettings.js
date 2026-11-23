import express from 'express';
import pool from '../config/db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { toCamelCase, toPascalCaseKeys } from '../utils/helpers.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM SiteSettings ORDER BY SettingKey ASC');
    const settings = toCamelCase(rows).reduce((acc, item) => {
      acc[item.settingKey] = item.settingValue;
      return acc;
    }, {});
    res.json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load site settings.' });
  }
});

router.get('/list', authenticate, requireAdmin, async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM SiteSettings ORDER BY SettingKey ASC');
    res.json(toCamelCase(rows));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load site settings.' });
  }
});

router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const data = toPascalCaseKeys(req.body);
    if (!data.SettingKey) return res.status(400).json({ message: 'Setting key is required.' });

    const [result] = await pool.query(
      'INSERT INTO SiteSettings (SettingKey, SettingValue) VALUES (?, ?)',
      [data.SettingKey, data.SettingValue ?? '']
    );

    const [rows] = await pool.query('SELECT * FROM SiteSettings WHERE SiteSettingId = ?', [result.insertId]);
    res.status(201).json(toCamelCase(rows[0]));
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'This setting key already exists.' });
    }
    res.status(500).json({ message: 'Failed to create setting.' });
  }
});

router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const data = toPascalCaseKeys(req.body);
    const columns = ['SettingKey', 'SettingValue'].filter((f) => data[f] !== undefined);
    if (!columns.length) return res.status(400).json({ message: 'No fields to update.' });

    await pool.query(
      `UPDATE SiteSettings SET ${columns.map((c) => `${c} = ?`).join(', ')} WHERE SiteSettingId = ?`,
      [...columns.map((c) => data[c]), req.params.id]
    );

    const [rows] = await pool.query('SELECT * FROM SiteSettings WHERE SiteSettingId = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Setting not found.' });
    res.json(toCamelCase(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update setting.' });
  }
});

router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM SiteSettings WHERE SiteSettingId = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Setting not found.' });
    res.json({ message: 'Setting deleted.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete setting.' });
  }
});

export default router;
