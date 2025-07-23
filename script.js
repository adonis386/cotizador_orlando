document.addEventListener('DOMContentLoaded', function() {
  // Switch secciones
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

  // Hoteles
  const formHotel = document.getElementById('hotel-form');
  const resultadoHotel = document.getElementById('resultado-hotel');
  const resetHotel = document.getElementById('reset-hotel');

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

  // Cabañas
  const formCabana = document.getElementById('cabana-form');
  const resultadoCabana = document.getElementById('resultado-cabana');
  const resetCabana = document.getElementById('reset-cabana');

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

  // Auto
  const formAuto = document.getElementById('auto-form');
  const resultadoAuto = document.getElementById('resultado-auto');
  const resetAuto = document.getElementById('reset-auto');

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

  // Parques
  const formParques = document.getElementById('parques-form');
  const resultadoParques = document.getElementById('resultado-parques');
  const resetParques = document.getElementById('reset-parques');

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

  // Crédito
  const formCredito = document.getElementById('credito-form');
  const resultadoCredito = document.getElementById('resultado-credito');
  const resetCredito = document.getElementById('reset-credito');

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
}); 