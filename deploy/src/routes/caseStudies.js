import express from 'express';
import pool from '../config/db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { toCamelCase, toPascalCaseKeys, slugify } from '../utils/helpers.js';

const router = express.Router();

const FIELDS = [
  'Title', 'Slug', 'ClientName', 'ShortDescription', 'Problem', 'Solution',
  'ResultSummary', 'ImageUrl', 'PdfUrl', 'MetaTitle', 'MetaDescription', 'IsFeatured', 'IsActive',
];

async function attachRelations(caseStudy) {
  const id = caseStudy.caseStudyId;
  const [services] = await pool.query(
    `SELECT s.* FROM Services s
     JOIN CaseStudyServices css ON s.ServiceId = css.ServiceId
     WHERE css.CaseStudyId = ?`,
    [id]
  );
  const [industries] = await pool.query(
    `SELECT i.* FROM Industries i
     JOIN CaseStudyIndustries csi ON i.IndustryId = csi.IndustryId
     WHERE csi.CaseStudyId = ?`,
    [id]
  );
  return {
    ...caseStudy,
    services: toCamelCase(services),
    industries: toCamelCase(industries),
  };
}

async function syncRelations(caseStudyId, serviceIds = [], industryIds = []) {
  await pool.query('DELETE FROM CaseStudyServices WHERE CaseStudyId = ?', [caseStudyId]);
  await pool.query('DELETE FROM CaseStudyIndustries WHERE CaseStudyId = ?', [caseStudyId]);

  for (const serviceId of serviceIds) {
    await pool.query(
      'INSERT INTO CaseStudyServices (CaseStudyId, ServiceId) VALUES (?, ?)',
      [caseStudyId, serviceId]
    );
  }
  for (const industryId of industryIds) {
    await pool.query(
      'INSERT INTO CaseStudyIndustries (CaseStudyId, IndustryId) VALUES (?, ?)',
      [caseStudyId, industryId]
    );
  }
}

router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM CaseStudies ORDER BY CreatedAt DESC');
    res.json(toCamelCase(rows));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load case studies.' });
  }
});

router.get('/:slugOrId', async (req, res) => {
  const { slugOrId } = req.params;
  const isId = /^\d+$/.test(slugOrId);

  try {
    const [rows] = await pool.query(
      isId ? 'SELECT * FROM CaseStudies WHERE CaseStudyId = ?' : 'SELECT * FROM CaseStudies WHERE Slug = ?',
      [slugOrId]
    );

    if (!rows.length) {
      return res.status(404).json({ message: 'Case study not found.' });
    }

    const item = await attachRelations(toCamelCase(rows[0]));
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load case study.' });
  }
});

router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const { serviceIds, industryIds, ...body } = req.body;
    const data = toPascalCaseKeys(body);
    if (!data.Title) return res.status(400).json({ message: 'Title is required.' });
    if (!data.Slug) data.Slug = slugify(data.Title);

    const columns = FIELDS.filter((f) => data[f] !== undefined);
    const [result] = await pool.query(
      `INSERT INTO CaseStudies (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`,
      columns.map((c) => data[c])
    );

    await syncRelations(result.insertId, serviceIds || [], industryIds || []);

    const [rows] = await pool.query('SELECT * FROM CaseStudies WHERE CaseStudyId = ?', [result.insertId]);
    const item = await attachRelations(toCamelCase(rows[0]));
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'A case study with this slug already exists.' });
    }
    res.status(500).json({ message: 'Failed to create case study.' });
  }
});

router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { serviceIds, industryIds, ...body } = req.body;
    const data = toPascalCaseKeys(body);
    const columns = FIELDS.filter((f) => data[f] !== undefined);

    if (columns.length) {
      await pool.query(
        `UPDATE CaseStudies SET ${columns.map((c) => `${c} = ?`).join(', ')} WHERE CaseStudyId = ?`,
        [...columns.map((c) => data[c]), req.params.id]
      );
    }

    if (serviceIds !== undefined || industryIds !== undefined) {
      await syncRelations(req.params.id, serviceIds || [], industryIds || []);
    }

    const [rows] = await pool.query('SELECT * FROM CaseStudies WHERE CaseStudyId = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Case study not found.' });

    const item = await attachRelations(toCamelCase(rows[0]));
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update case study.' });
  }
});

router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await pool.query('DELETE FROM CaseStudyServices WHERE CaseStudyId = ?', [req.params.id]);
    await pool.query('DELETE FROM CaseStudyIndustries WHERE CaseStudyId = ?', [req.params.id]);
    const [result] = await pool.query('DELETE FROM CaseStudies WHERE CaseStudyId = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Case study not found.' });
    res.json({ message: 'Case study deleted.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete case study.' });
  }
});

export default router;
