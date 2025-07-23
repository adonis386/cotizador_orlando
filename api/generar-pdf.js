import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido' });
    return;
  }

  const { titulo = 'Cotización', descripcion = '' } = req.body || {};

  // Crear PDF
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Título
  page.drawText(titulo, {
    x: 50,
    y: 800,
    size: 24,
    font,
    color: rgb(0, 0.2, 0.6),
  });

  // Descripción
  page.drawText(descripcion, {
    x: 50,
    y: 760,
    size: 14,
    font,
    color: rgb(0, 0, 0),
    maxWidth: 495,
    lineHeight: 18,
  });

  const pdfBytes = await pdfDoc.save();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="cotizacion.pdf"');
  res.send(Buffer.from(pdfBytes));
} 