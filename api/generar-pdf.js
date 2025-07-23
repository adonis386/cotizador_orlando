import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

function wrapText(text, font, fontSize, maxWidth) {
  const words = text.split(' ');
  let lines = [];
  let currentLine = '';
  for (let word of words) {
    const testLine = currentLine ? currentLine + ' ' + word : word;
    const width = font.widthOfTextAtSize(testLine, fontSize);
    if (width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido' });
    return;
  }

  // Azul corporativo (del logo)
  const azulLogo = rgb(0.0, 0.45, 0.8); // #0073cc aprox
  const azulFondo = rgb(0.93, 0.97, 1); // fondo suave azul

  // Recibe todas las cotizaciones
  const { cotizaciones = {} } = req.body || {};

  // Crear PDF multipágina
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const opciones = ["hotel", "cabana", "auto", "parques", "traslados", "vuelos", "tours"];

  for (const opcion of opciones) {
    const datos = cotizaciones[opcion] || {};
    // Desestructurar con valores por defecto
    const {
      titulo = opcion.charAt(0).toUpperCase() + opcion.slice(1),
      nombreTitulo = '',
      checkin = '',
      checkout = '',
      descripcion = '',
      personas = 1,
      nombres = [],
      imagenes = [],
      encabezadoDerecho = '',
      fechaReserva = '',
      logo = '',
      // Específicos de auto
      autoSeleccionado = '',
      llegadaDia = '',
      llegadaHora = '',
      devolDia = '',
      devolHora = '',
      nota = ''
    } = datos;

    let y = 800;
    const page = pdfDoc.addPage([595, 842]);

    // Logo (izquierda)
    if (logo && logo.startsWith('data:image/')) {
      let img;
      if (logo.startsWith('data:image/jpeg')) {
        img = await pdfDoc.embedJpg(logo);
      } else if (logo.startsWith('data:image/png')) {
        img = await pdfDoc.embedPng(logo);
      }
      if (img) {
        const imgDims = img.scale(60 / img.height); // 60px alto
        page.drawImage(img, {
          x: 40,
          y: y - imgDims.height + 10,
          width: imgDims.width,
          height: imgDims.height,
        });
      }
    }
    // Encabezado derecho
    if (encabezadoDerecho) {
      page.drawText(encabezadoDerecho, {
        x: 340,
        y: y,
        size: 10,
        font,
        color: azulLogo,
      });
    }
    // Fecha de reserva
    if (fechaReserva) {
      page.drawText(fechaReserva, {
        x: 340,
        y: y - 14,
        size: 10,
        font,
        color: azulLogo,
      });
    }
    y -= 60;
    // Línea separadora
    page.drawLine({
      start: { x: 40, y: y },
      end: { x: 555, y: y },
      thickness: 1.5,
      color: azulLogo,
    });
    y -= 20;
    // Título (opción)
    page.drawText(titulo.toUpperCase(), {
      x: 40,
      y,
      size: 16,
      font: fontBold,
      color: azulLogo,
    });
    y -= 24;
    if (opcion === 'auto') {
      // Tabla de auto seleccionado, llegada, devolución
      page.drawRectangle({ x: 40, y: y - 90, width: 515, height: 90, borderColor: azulLogo, borderWidth: 1.5, color: azulFondo });
      page.drawText('Auto seleccionado:', { x: 50, y: y - 20, size: 12, font: fontBold, color: azulLogo });
      page.drawText(autoSeleccionado, { x: 180, y: y - 20, size: 12, font, color: rgb(0.1,0.1,0.1) });
      page.drawText('Llegada:', { x: 50, y: y - 50, size: 12, font: fontBold, color: azulLogo });
      page.drawText(llegadaDia, { x: 120, y: y - 50, size: 12, font, color: rgb(0.1,0.1,0.1) });
      page.drawText(llegadaHora, { x: 220, y: y - 50, size: 12, font, color: rgb(0.1,0.1,0.1) });
      page.drawText('Devolución:', { x: 320, y: y - 50, size: 12, font: fontBold, color: azulLogo });
      page.drawText(devolDia, { x: 410, y: y - 50, size: 12, font, color: rgb(0.1,0.1,0.1) });
      page.drawText(devolHora, { x: 500, y: y - 50, size: 12, font, color: rgb(0.1,0.1,0.1) });
      y -= 110;
      // Total personas
      page.drawText(`TOTAL PERSONAS: ${personas}`, {
        x: 40,
        y,
        size: 13,
        font: fontBold,
        color: rgb(0, 0, 0.3),
      });
      y -= 20;
      // Nombres de personas
      if (nombres && nombres.length > 0) {
        page.drawText('Nombres:', { x: 50, y, size: 11, font: fontBold, color: rgb(0.2,0.2,0.2) });
        y -= 15;
        for (let i = 0; i < nombres.length; i++) {
          page.drawText(`- ${nombres[i]}`, { x: 70, y, size: 11, font, color: rgb(0.2,0.2,0.2) });
          y -= 13;
        }
        y -= 5;
      }
      // Foto del auto (grande y centrada)
      const targetWidth = 300;
      const targetHeight = 180;
      let imgY = y;
      let imgX = 147; // Centrado en A4
      if (imagenes && imagenes[0] && imagenes[0].startsWith('data:image/')) {
        let img;
        if (imagenes[0].startsWith('data:image/jpeg')) {
          img = await pdfDoc.embedJpg(imagenes[0]);
        } else if (imagenes[0].startsWith('data:image/png')) {
          img = await pdfDoc.embedPng(imagenes[0]);
        }
        if (img) {
          const { width, height } = img.size();
          const scale = Math.min(targetWidth / width, targetHeight / height);
          const drawWidth = width * scale;
          const drawHeight = height * scale;
          const offsetX = imgX + (targetWidth - drawWidth) / 2;
          const offsetY = imgY - drawHeight;
          page.drawRectangle({
            x: imgX,
            y: imgY - targetHeight,
            width: targetWidth,
            height: targetHeight,
            color: rgb(1, 1, 1)
          });
          page.drawImage(img, {
            x: offsetX,
            y: offsetY,
            width: drawWidth,
            height: drawHeight,
          });
        }
      }
      y = imgY - targetHeight - 20;
      // Nota en recuadro azul
      if (nota) {
        const descBoxHeight = 120;
        page.drawRectangle({
          x: 40, y: y - descBoxHeight, width: 515, height: descBoxHeight, borderColor: azulLogo, borderWidth: 1.5, color: azulFondo
        });
        const lines = wrapText(nota, font, 12, 495);
        let descY = y - 30;
        for (let line of lines) {
          page.drawText(line, {
            x: 50,
            y: descY,
            size: 12,
            font,
            color: rgb(0.1, 0.1, 0.1),
          });
          descY -= 15;
        }
        y -= descBoxHeight + 10;
      }
      continue;
    }
    // Tabla: nombre, check-in, check-out (fondo azul)
    page.drawRectangle({ x: 40, y: y - 90, width: 515, height: 90, borderColor: azulLogo, borderWidth: 1.5, color: azulFondo });
    page.drawText('Nombre:', { x: 50, y: y - 20, size: 12, font: fontBold, color: azulLogo });
    page.drawText(nombreTitulo, { x: 120, y: y - 20, size: 12, font, color: rgb(0.1,0.1,0.1) });
    page.drawText('Check-in:', { x: 50, y: y - 50, size: 12, font: fontBold, color: azulLogo });
    page.drawText(checkin, { x: 120, y: y - 50, size: 12, font, color: rgb(0.1,0.1,0.1) });
    page.drawText('Check-out:', { x: 250, y: y - 50, size: 12, font: fontBold, color: azulLogo });
    page.drawText(checkout, { x: 340, y: y - 50, size: 12, font, color: rgb(0.1,0.1,0.1) });
    y -= 110;
    // Total personas
    page.drawText(`TOTAL PERSONAS: ${personas}`, {
      x: 40,
      y,
      size: 13,
      font: fontBold,
      color: rgb(0, 0, 0.3),
    });
    y -= 20;
    // Nombres de personas
    if (nombres && nombres.length > 0) {
      page.drawText('Nombres:', { x: 50, y, size: 11, font: fontBold, color: rgb(0.2,0.2,0.2) });
      y -= 15;
      for (let i = 0; i < nombres.length; i++) {
        page.drawText(`- ${nombres[i]}`, { x: 70, y, size: 11, font, color: rgb(0.2,0.2,0.2) });
        y -= 13;
      }
      y -= 5;
    }
    // Imágenes grandes
    const targetWidth = 220;
    const targetHeight = 160;
    let imgY = y;
    let imgX = 40;
    for (let i = 0; i < Math.min(imagenes.length, 3); i++) {
      const imgData = imagenes[i];
      if (imgData && imgData.startsWith('data:image/')) {
        let img;
        if (imgData.startsWith('data:image/jpeg')) {
          img = await pdfDoc.embedJpg(imgData);
        } else if (imgData.startsWith('data:image/png')) {
          img = await pdfDoc.embedPng(imgData);
        }
        if (img) {
          // Escalar manteniendo proporción
          const { width, height } = img.size();
          const scale = Math.min(targetWidth / width, targetHeight / height);
          const drawWidth = width * scale;
          const drawHeight = height * scale;
          // Centrar la imagen en el recuadro
          const offsetX = imgX + (targetWidth - drawWidth) / 2;
          const offsetY = imgY - drawHeight;
          // Dibuja un fondo blanco para el recuadro
          page.drawRectangle({
            x: imgX,
            y: imgY - targetHeight,
            width: targetWidth,
            height: targetHeight,
            color: rgb(1, 1, 1)
          });
          // Dibuja la imagen centrada
          page.drawImage(img, {
            x: offsetX,
            y: offsetY,
            width: drawWidth,
            height: drawHeight,
          });
          imgX += targetWidth + 20;
        }
      }
    }
    y = imgY - targetHeight - 20;
    // Descripción en recuadro (más grande y azul)
    if (descripcion) {
      const descBoxHeight = 180;
      page.drawRectangle({
        x: 40, y: y - descBoxHeight, width: 515, height: descBoxHeight, borderColor: azulLogo, borderWidth: 1.5, color: azulFondo
      });
      const lines = wrapText(descripcion, font, 12, 495);
      let descY = y - 30;
      for (let line of lines) {
        page.drawText(line, {
          x: 50,
          y: descY,
          size: 12,
          font,
          color: rgb(0.1, 0.1, 0.1),
        });
        descY -= 15;
      }
      y -= descBoxHeight + 10;
    }
    // Fin página de opción
  }

  const pdfBytes = await pdfDoc.save();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="cotizacion.pdf"');
  res.send(Buffer.from(pdfBytes));
} 