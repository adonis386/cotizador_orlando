document.addEventListener('DOMContentLoaded', function() {
  // Switch secciones (solo si existen)
  const btnHoteles = document.getElementById('btn-hoteles');
  const btnCabanas = document.getElementById('btn-cabanas');
  const btnAuto = document.getElementById('btn-auto');
  const btnParques = document.getElementById('btn-parques');
  const btnCredito = document.getElementById('btn-credito');
  const seccionHoteles = document.getElementById('seccion-hoteles');
  const seccionCabanas = document.getElementById('seccion-cabanas');
  const seccionAuto = document.getElementById('seccion-auto');
  const seccionParques = document.getElementById('seccion-parques');
  const seccionCredito = document.getElementById('seccion-credito');

  if (btnHoteles && btnCabanas && btnAuto && btnParques && btnCredito && seccionHoteles && seccionCabanas && seccionAuto && seccionParques && seccionCredito) {
    btnHoteles.addEventListener('click', function() {
      btnHoteles.classList.add('active');
      btnCabanas.classList.remove('active');
      btnAuto.classList.remove('active');
      btnParques.classList.remove('active');
      btnCredito.classList.remove('active');
      seccionHoteles.style.display = '';
      seccionCabanas.style.display = 'none';
      seccionAuto.style.display = 'none';
      seccionParques.style.display = 'none';
      seccionCredito.style.display = 'none';
    });
    btnCabanas.addEventListener('click', function() {
      btnCabanas.classList.add('active');
      btnHoteles.classList.remove('active');
      btnAuto.classList.remove('active');
      btnParques.classList.remove('active');
      btnCredito.classList.remove('active');
      seccionCabanas.style.display = '';
      seccionHoteles.style.display = 'none';
      seccionAuto.style.display = 'none';
      seccionParques.style.display = 'none';
      seccionCredito.style.display = 'none';
    });
    btnAuto.addEventListener('click', function() {
      btnAuto.classList.add('active');
      btnHoteles.classList.remove('active');
      btnCabanas.classList.remove('active');
      btnParques.classList.remove('active');
      btnCredito.classList.remove('active');
      seccionAuto.style.display = '';
      seccionHoteles.style.display = 'none';
      seccionCabanas.style.display = 'none';
      seccionParques.style.display = 'none';
      seccionCredito.style.display = 'none';
    });
    btnParques.addEventListener('click', function() {
      btnParques.classList.add('active');
      btnHoteles.classList.remove('active');
      btnCabanas.classList.remove('active');
      btnAuto.classList.remove('active');
      btnCredito.classList.remove('active');
      seccionParques.style.display = '';
      seccionHoteles.style.display = 'none';
      seccionCabanas.style.display = 'none';
      seccionAuto.style.display = 'none';
      seccionCredito.style.display = 'none';
    });
    btnCredito.addEventListener('click', function() {
      btnCredito.classList.add('active');
      btnHoteles.classList.remove('active');
      btnCabanas.classList.remove('active');
      btnAuto.classList.remove('active');
      btnParques.classList.remove('active');
      seccionCredito.style.display = '';
      seccionHoteles.style.display = 'none';
      seccionCabanas.style.display = 'none';
      seccionAuto.style.display = 'none';
      seccionParques.style.display = 'none';
    });
  }

  // Hoteles
  const formHotel = document.getElementById('hotel-form');
  const resultadoHotel = document.getElementById('resultado-hotel');
  const resetHotel = document.getElementById('reset-hotel');
  if (formHotel && resultadoHotel && resetHotel) {
    formHotel.addEventListener('submit', function(e) {
    e.preventDefault();
    const precio = parseFloat(document.getElementById('precio-habitacion').value) || 0;
    const cantidad = parseInt(document.getElementById('cantidad-habitaciones').value) || 0;
    const extra = 35 * cantidad;
    const total = (precio * cantidad) + extra;
      resultadoHotel.textContent = `Total: $${total.toFixed(2)} USD (incluye $35 x habitación)`;
    });
    resetHotel.addEventListener('click', function() {
      formHotel.reset();
      resultadoHotel.textContent = '';
    });
  }

  // Cabañas
  const formCabana = document.getElementById('cabana-form');
  const resultadoCabana = document.getElementById('resultado-cabana');
  const resetCabana = document.getElementById('reset-cabana');
  if (formCabana && resultadoCabana && resetCabana) {
    formCabana.addEventListener('submit', function(e) {
      e.preventDefault();
      const precio = parseFloat(document.getElementById('precio-cabana').value) || 0;
      const cantidad = parseInt(document.getElementById('cantidad-cabanas').value) || 0;
      const extra = 35 * cantidad;
      const total = (precio * cantidad) + extra;
      resultadoCabana.textContent = `Total: $${total.toFixed(2)} USD (incluye $35 x cabaña)`;
    });
    resetCabana.addEventListener('click', function() {
      formCabana.reset();
      resultadoCabana.textContent = '';
    });
  }

  // Auto
  const formAuto = document.getElementById('auto-form');
  const resultadoAuto = document.getElementById('resultado-auto');
  const resetAuto = document.getElementById('reset-auto');
  if (formAuto && resultadoAuto && resetAuto) {
    formAuto.addEventListener('submit', function(e) {
      e.preventDefault();
      const precio = parseFloat(document.getElementById('precio-auto').value) || 0;
      const dias = parseInt(document.getElementById('dias-auto').value) || 0;
      const descuentoPorc = parseFloat(document.getElementById('descuento-auto').value) || 0;
      let fee = 0;
      if (dias >= 5) fee = 55;
      else if (dias >= 3) fee = 45;
      else if (dias >= 0) fee = 35;
      const descuento = precio * (descuentoPorc / 100);
      const precioConDescuento = precio - descuento;
      const total = precioConDescuento + fee;
      resultadoAuto.innerHTML = `Total: $${total.toFixed(2)} USD<br>Fee: $${fee} USD<br>Ahorro por descuento: $${descuento.toFixed(2)} USD`;
    });
    resetAuto.addEventListener('click', function() {
      formAuto.reset();
      resultadoAuto.textContent = '';
    });
  }

  // Parques
  const formParques = document.getElementById('parques-form');
  const resultadoParques = document.getElementById('resultado-parques');
  const resetParques = document.getElementById('reset-parques');
  if (formParques && resultadoParques && resetParques) {
    formParques.addEventListener('submit', function(e) {
      e.preventDefault();
      const parque = document.getElementById('parque').value;
      const precioTicket = parseFloat(document.getElementById('precio-ticket').value) || 0;
      const personas = parseInt(document.getElementById('personas').value) || 0;
      const pago = formParques.querySelector('input[name="pago"]:checked').value;
      let fee = 0;
      if (pago === 'contado') {
        if (parque === 'Epic Universe') {
          fee = 7 * personas;
        } else {
          fee = 6 * personas;
        }
      } else {
        fee = 11 * personas;
      }
      const total = (precioTicket * personas) + fee;
      resultadoParques.innerHTML = `Total: $${total.toFixed(2)} USD<br>Fee aplicado: $${fee.toFixed(2)} USD`;
    });
    resetParques.addEventListener('click', function() {
      formParques.reset();
      resultadoParques.textContent = '';
    });
  }

  // Crédito
  const formCredito = document.getElementById('credito-form');
  const resultadoCredito = document.getElementById('resultado-credito');
  const resetCredito = document.getElementById('reset-credito');
  if (formCredito && resultadoCredito && resetCredito) {
    formCredito.addEventListener('submit', function(e) {
      e.preventDefault();
      const montoFactura = parseFloat(document.getElementById('monto-factura').value) || 0;
      const reserva = parseFloat(document.getElementById('reserva').value) || 0;
      const saldo = montoFactura - reserva;
      const cuota = saldo / 6;
      // Calcular fechas de pago
      const hoy = new Date();
      let year = hoy.getFullYear();
      let month = hoy.getMonth() + 1; // JS: 0=enero
      let fechas = [];
      let dia = 15;
      // Primera cuota: 15 del mes siguiente
      for (let i = 0; i < 6; i++) {
        if (i % 2 === 0) {
          dia = 15;
          if (i === 0) month += 1; // primera cuota, mes siguiente
          else month += 1; // cada 2 cuotas, avanzar mes
        } else {
          dia = 30;
        }
        // Ajustar año si el mes pasa de diciembre
        if (month > 12) {
          month = 1;
          year += 1;
        }
        // Formatear fecha DD/MM/YYYY
        const fecha = `${dia.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
        fechas.push(fecha);
      }
      let cuotasHtml = '<ul style="padding-left:1.2em;text-align:left;">';
      for (let i = 0; i < 6; i++) {
        cuotasHtml += `<li>Cuota ${i+1}: $${cuota.toFixed(2)} USD - Pago: <b>${fechas[i]}</b></li>`;
      }
      cuotasHtml += '</ul>';
      resultadoCredito.innerHTML = `Monto de la factura: $${montoFactura.toFixed(2)} USD<br>Reserva: $${reserva.toFixed(2)} USD<br>Saldo a financiar: $${saldo.toFixed(2)} USD<br>${cuotasHtml}`;
    });
    resetCredito.addEventListener('click', function() {
      formCredito.reset();
      resultadoCredito.textContent = '';
    });
  }

  // --- Lógica para cotizacion.html ---
  if (document.getElementById('cotizacion-form')) {
    // Cambiar opción activa
    const btns = document.querySelectorAll('.cotiz-btn');
    // Mostrar solo el formulario de la opción activa
    function mostrarFormularioOpcion(opcion) {
      const formularios = document.querySelectorAll('.cotiz-opcion-form');
      formularios.forEach(f => f.style.display = 'none');
      const form = document.getElementById('form-' + opcion);
      if (form) form.style.display = '';
    }
    // Cambiar opción activa y mostrar formulario
    btns.forEach(btn => {
      btn.addEventListener('click', function() {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const opcion = btn.dataset.opcion;
        mostrarFormularioOpcion(opcion);
        // Actualizar título oculto si existe
        if (document.getElementById('titulo')) document.getElementById('titulo').value = btn.textContent;
        if (document.getElementById('titulo-auto')) document.getElementById('titulo-auto').value = btn.textContent;
      });
    });

    // Datos adicionales dinámicos
    const datosList = document.getElementById('datos-adicionales-list');
    if (document.getElementById('agregar-dato-adicional')) {
      document.getElementById('agregar-dato-adicional').addEventListener('click', function(e) {
        e.preventDefault();
        const idx = datosList.children.length + 1;
        const div = document.createElement('div');
        div.className = 'dato-adicional-item';
        div.innerHTML = `<input type="text" placeholder="Clave" class="dato-clave" style="width:40%"> <input type="text" placeholder="Valor" class="dato-valor" style="width:55%"> <button type="button" class="eliminar-dato">X</button>`;
        datosList.appendChild(div);
        div.querySelector('.eliminar-dato').onclick = () => div.remove();
      });
    }

    // Mostrar campos de nombres según personas
    const personasInput = document.getElementById('personas');
    const nombresDiv = document.getElementById('nombres-personas');
    function renderNombres() {
      const n = parseInt(personasInput.value) || 1;
      let html = '';
      for (let i = 1; i <= n; i++) {
        html += `<div class="form-group"><label>Nombre persona ${i}:</label><input type="text" name="nombre-persona-${i}" required></div>`;
      }
      nombresDiv.innerHTML = html;
    }
    if (personasInput && nombresDiv) {
      personasInput.addEventListener('input', renderNombres);
      renderNombres();
    }

    // Limitar imágenes a 3
    const imagenesInput = document.getElementById('imagenes');
    if (imagenesInput) {
      imagenesInput.addEventListener('change', function() {
        if (imagenesInput.files.length > 3) {
          alert('Solo puedes seleccionar hasta 3 imágenes.');
          imagenesInput.value = '';
        }
      });
    }

    // Convertir imagen a base64
    function fileToBase64(file) {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    }
    // Convertir logo por defecto a base64
    async function defaultLogoToBase64() {
      const response = await fetch('/img/logo.png');
      const blob = await response.blob();
      return await fileToBase64(blob);
    }

    // Nombres dinámicos para Auto
    const autoPersonasInput = document.getElementById('auto-personas');
    const autoNombresDiv = document.getElementById('auto-nombres-personas');
    function renderAutoNombres() {
      const n = parseInt(autoPersonasInput.value) || 1;
      let html = '';
      for (let i = 1; i <= n; i++) {
        html += `<div class="form-group"><label>Nombre persona ${i}:</label><input type="text" name="auto-nombre-persona-${i}" required></div>`;
      }
      autoNombresDiv.innerHTML = html;
    }
    if (autoPersonasInput && autoNombresDiv) {
      autoPersonasInput.addEventListener('input', renderAutoNombres);
      renderAutoNombres();
    }

    // Descargar PDF (envío de datos al backend)
    const descargarBtn = document.getElementById('descargar-pdf');
    if (descargarBtn) {
      descargarBtn.addEventListener('click', async function() {
        const opciones = ["hotel", "cabana", "auto", "parques", "traslados", "vuelos", "tours"];
        let cotizaciones = {};
        for (const opcion of opciones) {
          let datos = {};
          if (opcion === 'auto') {
            // Recoger datos específicos de Auto
            datos = {
              opcion,
              titulo: 'Auto',
              autoSeleccionado: document.getElementById('auto-seleccionado')?.value || '',
              llegadaDia: document.getElementById('auto-llegada-dia')?.value || '',
              llegadaHora: document.getElementById('auto-llegada-hora')?.value || '',
              devolDia: document.getElementById('auto-devol-dia')?.value || '',
              devolHora: document.getElementById('auto-devol-hora')?.value || '',
              personas: parseInt(document.getElementById('auto-personas')?.value) || 1,
              nombres: Array.from(document.getElementById('auto-nombres-personas')?.querySelectorAll('input') || []).map(input => input.value),
              imagenes: [document.getElementById('auto-foto')?.files[0] ? await fileToBase64(document.getElementById('auto-foto').files[0]) : ''],
              nota: document.getElementById('auto-nota')?.value || '',
              encabezadoDerecho: document.getElementById('encabezado-derecho')?.value || '',
              fechaReserva: document.getElementById('fecha-reserva')?.value || '',
              logo: await defaultLogoToBase64()
            };
          } else if (opcion === 'hotel') {
            // Recoger datos de hotel como antes
            datos = {
              opcion,
              titulo: 'Hotel',
              nombreTitulo: document.getElementById('nombre-titulo')?.value || '',
              checkin: document.getElementById('checkin')?.value || '',
              checkout: document.getElementById('checkout')?.value || '',
              personas: parseInt(document.getElementById('personas')?.value) || 1,
              nombres: Array.from(document.getElementById('nombres-personas')?.querySelectorAll('input') || []).map(input => input.value),
              imagenes: Array.from(document.getElementById('imagenes')?.files || []).map(f => f ? fileToBase64(f) : null),
              descripcion: document.getElementById('descripcion')?.value || '',
              encabezadoDerecho: document.getElementById('encabezado-derecho')?.value || '',
              fechaReserva: document.getElementById('fecha-reserva')?.value || '',
              logo: await defaultLogoToBase64()
            };
            // Esperar imágenes
            if (datos.imagenes.length) datos.imagenes = await Promise.all(datos.imagenes);
          } else {
            // Otras opciones: estructura vacía pero con logo y encabezado
            datos = {
              opcion,
              titulo: opcion.charAt(0).toUpperCase() + opcion.slice(1),
              encabezadoDerecho: document.getElementById('encabezado-derecho')?.value || '',
              fechaReserva: document.getElementById('fecha-reserva')?.value || '',
              logo: await defaultLogoToBase64()
            };
          }
          cotizaciones[opcion] = datos;
        }
        // Enviar todas las cotizaciones al backend
        const response = await fetch('/api/generar-pdf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cotizaciones })
        });
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cotizacion.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      });
    }
  }
}); 