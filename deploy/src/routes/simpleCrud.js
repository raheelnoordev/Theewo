import express from 'express';
import pool from '../config/db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { toCamelCase, toPascalCaseKeys } from '../utils/helpers.js';

function createCrudRouter(table, idField, fields) {
  const router = express.Router();

  router.get('/', async (_req, res) => {
    try {
      const order = fields.includes('DisplayOrder') ? 'DisplayOrder ASC' : 'CreatedAt DESC';
      const [rows] = await pool.query(`SELECT * FROM ${table} ORDER BY ${order}`);
      res.json(toCamelCase(rows));
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: `Failed to load ${table}.` });
    }
  });

  router.post('/', authenticate, requireAdmin, async (req, res) => {
    try {
      const data = toPascalCaseKeys(req.body);
      const columns = fields.filter((f) => data[f] !== undefined);
      if (!columns.length) return res.status(400).json({ message: 'No data provided.' });

      const [result] = await pool.query(
        `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`,
        columns.map((c) => data[c])
      );

      const [rows] = await pool.query(`SELECT * FROM ${table} WHERE ${idField} = ?`, [result.insertId]);
      res.status(201).json(toCamelCase(rows[0]));
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: `Failed to create ${table} record.` });
    }
  });

  router.put('/:id', authenticate, requireAdmin, async (req, res) => {
    try {
      const data = toPascalCaseKeys(req.body);
      const columns = fields.filter((f) => data[f] !== undefined);
      if (!columns.length) return res.status(400).json({ message: 'No fields to update.' });

      await pool.query(
        `UPDATE ${table} SET ${columns.map((c) => `${c} = ?`).join(', ')} WHERE ${idField} = ?`,
        [...columns.map((c) => data[c]), req.params.id]
      );

      const [rows] = await pool.query(`SELECT * FROM ${table} WHERE ${idField} = ?`, [req.params.id]);
      if (!rows.length) return res.status(404).json({ message: 'Record not found.' });
      res.json(toCamelCase(rows[0]));
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: `Failed to update ${table} record.` });
    }
  });

  router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
    try {
      const [result] = await pool.query(`DELETE FROM ${table} WHERE ${idField} = ?`, [req.params.id]);
      if (!result.affectedRows) return res.status(404).json({ message: 'Record not found.' });
      res.json({ message: 'Record deleted.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: `Failed to delete ${table} record.` });
    }
  });

  return router;
}

export const teamMembersRouter = createCrudRouter('TeamMembers', 'TeamMemberId', [
  'FullName', 'Designation', 'Bio', 'ImageUrl', 'LinkedInUrl', 'DisplayOrder', 'IsActive',
]);

export const testimonialsRouter = createCrudRouter('Testimonials', 'TestimonialId', [
  'ClientName', 'ClientDesignation', 'CompanyName', 'Message', 'ImageUrl', 'Rating', 'IsActive',
]);

export const officesRouter = createCrudRouter('Offices', 'OfficeId', [
  'Country', 'City', 'OfficeTitle', 'Address', 'Phone', 'Email', 'Latitude', 'Longitude', 'DisplayOrder', 'IsActive',
]);

export const featuredLogosRouter = createCrudRouter('FeaturedLogos', 'FeaturedLogoId', [
  'Name', 'ImageUrl', 'DisplayOrder', 'IsActive',
]);

export const awardsRouter = createCrudRouter('Awards', 'AwardId', [
  'Title', 'ImageUrl', 'DisplayOrder', 'IsActive',
]);

export const partnershipsRouter = createCrudRouter('Partnerships', 'PartnershipId', [
  'Name', 'ImageUrl', 'DisplayOrder', 'IsActive',
]);

export const technologiesRouter = createCrudRouter('Technologies', 'TechnologyId', [
  'Name', 'Category', 'IconUrl', 'DisplayOrder', 'IsActive',
]);
