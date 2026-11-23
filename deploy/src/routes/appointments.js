import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import pool from '../config/db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { toCamelCase } from '../utils/helpers.js';
import { sendAppointmentEmails } from '../utils/mailer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../../uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `appt-${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|pdf|doc|docx|zip/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    cb(ext ? null : new Error('Only images, PDF, Word, or ZIP files are allowed.'), ext);
  },
});

const router = express.Router();

const SERVICES = [
  'Website Development',
  'Mobile App Development',
  'AI Solutions',
  'Digital Marketing',
  'SEO',
  'Branding & Graphic Design',
  'UI/UX Design',
  'E-Commerce Solutions',
  'Custom Software Development',
  'ERP/CRM Solutions',
  'Cloud Solutions',
  'IT Consultancy',
  'Other',
];

router.get('/services', (_req, res) => {
  res.json(SERVICES);
});

router.get('/', authenticate, requireAdmin, async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Appointments ORDER BY CreatedAt DESC');
    res.json(toCamelCase(rows));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load appointments. Did you create the Appointments table?' });
  }
});

router.post('/', upload.single('attachment'), async (req, res) => {
  try {
    const body = req.body || {};
    const fullName = (body.fullName || '').trim();
    const email = (body.email || '').trim();
    const phone = (body.phone || '').trim();
    const service = (body.service || '').trim();
    const preferredDate = (body.preferredDate || '').trim();
    const preferredTime = (body.preferredTime || '').trim();
    const meetingType = (body.meetingType || '').trim();
    const projectDescription = (body.projectDescription || '').trim();
    const agreePrivacy = body.agreePrivacy === 'true' || body.agreePrivacy === true || body.agreePrivacy === '1' || body.agreePrivacy === 'on';

    if (!fullName || !email || !phone || !service || !preferredDate || !preferredTime || !meetingType || !projectDescription) {
      return res.status(400).json({ message: 'Please fill all required fields.' });
    }
    if (!agreePrivacy) {
      return res.status(400).json({ message: 'You must agree to the Privacy Policy.' });
    }

    const attachmentUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const [result] = await pool.query(
      `INSERT INTO Appointments (
        FullName, CompanyName, Email, Phone, Country, City, Service,
        PreferredDate, PreferredTime, MeetingType, ProjectBudget, ProjectTimeline,
        ProjectDescription, AttachmentUrl, HeardAboutUs, AgreePrivacy, Status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 'New')`,
      [
        fullName,
        body.companyName || null,
        email,
        phone,
        body.country || null,
        body.city || null,
        service,
        preferredDate,
        preferredTime,
        meetingType,
        body.projectBudget || null,
        body.projectTimeline || null,
        projectDescription,
        attachmentUrl,
        body.heardAboutUs || null,
      ]
    );

    const [rows] = await pool.query('SELECT * FROM Appointments WHERE AppointmentId = ?', [result.insertId]);
    const saved = toCamelCase(rows[0]);

    const emailResult = await sendAppointmentEmails({
      fullName: saved.fullName,
      email: saved.email,
      phone: saved.phone,
      companyName: saved.companyName,
      country: saved.country,
      city: saved.city,
      service: saved.service,
      preferredDate: saved.preferredDate,
      preferredTime: saved.preferredTime,
      meetingType: saved.meetingType,
      projectBudget: saved.projectBudget,
      projectTimeline: saved.projectTimeline,
      projectDescription: saved.projectDescription,
      attachmentUrl: saved.attachmentUrl,
      heardAboutUs: saved.heardAboutUs,
    });

    res.status(201).json({
      message: 'Thank you! Your appointment request has been received successfully. Our team will contact you within 24 business hours to confirm your meeting.',
      data: saved,
      email: emailResult,
    });
  } catch (err) {
    console.error(err);
    if (err.message?.includes("doesn't exist") || err.code === 'ER_NO_SUCH_TABLE') {
      return res.status(500).json({ message: 'Appointments table missing. Please run create-appointments.sql in phpMyAdmin.' });
    }
    res.status(500).json({ message: err.message || 'Failed to book appointment.' });
  }
});

router.put('/:id/status', authenticate, requireAdmin, async (req, res) => {
  const status = typeof req.body === 'string' ? req.body : req.body?.status;
  if (!status) return res.status(400).json({ message: 'Status is required.' });
  try {
    await pool.query('UPDATE Appointments SET Status = ? WHERE AppointmentId = ?', [status, req.params.id]);
    const [rows] = await pool.query('SELECT * FROM Appointments WHERE AppointmentId = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Appointment not found.' });
    res.json(toCamelCase(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update status.' });
  }
});

router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Appointments WHERE AppointmentId = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Appointment not found.' });
    res.json({ message: 'Appointment deleted.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete appointment.' });
  }
});

export default router;
