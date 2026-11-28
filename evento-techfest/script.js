// Orquestador de ventanas y vistas dedicadas para AUTO PREMIER (BEM)
document.addEventListener("DOMContentLoaded", () => {
  // Arreglo vacío preparado para agregar futuros vehículos sin repetir datos en pantalla
  const AUTOS_FUTUROS = [];

  const enlacesMenu = document.querySelectorAll(".header__enlace");
  const menuMovil = document.querySelector(".header__menu");
  const btnMenuMovil = document.getElementById("btn-menu-movil");
  const tarjetasAuto = document.querySelectorAll(".auto-card");
  const tarjetasServicio = document.querySelectorAll(".servicio-card");
  const botonesRedes = document.querySelectorAll(".footer__icono");

  const btnVerCatalogo = document.getElementById("btn-ver-catalogo");
  const btnCotizarAhora = document.getElementById("btn-cotizar-ahora");

  const ventanaModal = document.getElementById("ventana-modal");
  const ventanaTitulo = document.getElementById("ventana-titulo");
  const ventanaCuerpo = document.getElementById("ventana-cuerpo");
  const btnCerrarVentana = document.getElementById("btn-cerrar-ventana");

  function abrirVentana(titulo, contenidoHtml) {
    if (!ventanaModal || !ventanaTitulo || !ventanaCuerpo) return;
    ventanaTitulo.textContent = titulo;
    ventanaCuerpo.innerHTML = contenidoHtml;
    ventanaModal.classList.add("ventana--abierta");
    ventanaModal.setAttribute("aria-hidden", "false");
  }

  function cerrarVentana() {
    if (!ventanaModal) return;
    ventanaModal.classList.remove("ventana--abierta");
    ventanaModal.setAttribute("aria-hidden", "true");
  }

  function marcarEnlaceActivo(vista) {
    enlacesMenu.forEach((enlace) => {
      enlace.classList.toggle(
        "header__enlace--activo",
        enlace.getAttribute("data-vista") === vista
      );
    });
  }

  // Ventana del botón rojo "Ver catálogo" (preparada/vacía para futuros autos)
  function abrirVentanaFuturoCatalogo() {
    if (AUTOS_FUTUROS.length === 0) {
      abrirVentana(
        "Próximos Vehículos en Catálogo",
        `
          <div class="ventana__vacio">
            <p><strong>Catálogo futuro en preparación.</strong></p>
            <p>Próximamente incorporaremos nuevos modelos en esta sección.</p>
          </div>
        `
      );
      return;
    }

    const items = AUTOS_FUTUROS.map(
      (auto) => `
        <div class="ventana__item">
          <span class="ventana__item-titulo">${auto.nombre}</span>
          <span>${auto.detalle}</span>
        </div>
      `
    ).join("");

    abrirVentana("Próximos Vehículos en Catálogo", `<div class="ventana__lista">${items}</div>`);
  }

  // Ventana del enlace "Catálogo" del menú superior
  function abrirVentanaCatalogoMenu() {
    abrirVentana(
      "Catálogo Disponible",
      `
        <div class="ventana__lista">
          <div class="ventana__item">
            <span class="ventana__item-titulo">SUV Principal AUTO PREMIER</span>
            <span>Modelo destacado en portada · Cotización inmediata</span>
          </div>
          <div class="ventana__item">
            <span class="ventana__item-titulo">Toyota RAV4 · $38,500</span>
            <span>SUV · 2025</span>
          </div>
          <div class="ventana__item">
            <span class="ventana__item-titulo">BMW Serie 3 · $45,900</span>
            <span>Sedán · 2024</span>
          </div>
          <div class="ventana__item">
            <span class="ventana__item-titulo">Ford Mustang · $52,800</span>
            <span>Deportivo · 2025</span>
          </div>
        </div>
        <button type="button" class="boton boton--primario" id="btn-abrir-cotizar-catalogo">
          Ir a cotizar
        </button>
      `
    );

    const btnIr = document.getElementById("btn-abrir-cotizar-catalogo");
    if (btnIr) {
      btnIr.addEventListener("click", () => abrirVentanaCotizador("portada"));
    }
  }

  // Ventana aparte de Servicios
  function abrirVentanaServicios() {
    abrirVentana(
      "Servicios AUTO PREMIER",
      `
        <div class="ventana__lista">
          <div class="ventana__item">
            <span class="ventana__item-titulo">Revisión y Diagnóstico Pre-Entrega</span>
            <span>Inspección mecánica, electrónica y de seguridad antes de entregarte el vehículo.</span>
          </div>
          <div class="ventana__item">
            <span class="ventana__item-titulo">Mantenimiento Preventivo y Taller</span>
            <span>Cambio de aceites, filtros, frenos y servicio técnico especializado.</span>
          </div>
          <div class="ventana__item">
            <span class="ventana__item-titulo">Gestión de Documentación y Transferencia</span>
            <span>Asesoría y trámite ágil para dejar tu auto listo para circular.</span>
          </div>
          <div class="ventana__item">
            <span class="ventana__item-titulo">Entrega a Domicilio y Prueba de Manejo</span>
            <span>Coordinación de prueba de manejo y entrega directa en el lugar acordado.</span>
          </div>
        </div>
      `
    );
  }

  // Ventana aparte de Financiamiento
  function abrirVentanaFinanciamiento() {
    abrirVentana(
      "Planes de Financiamiento y Formas de Pago",
      `
        <p><strong>Plazos disponibles:</strong> Puedes financiar tu vehículo en planes de <strong>12, 24, 36 o 48 meses</strong> según tu presupuesto.</p>
        <div class="ventana__lista">
          <div class="ventana__item">
            <span class="ventana__item-titulo">Opciones de autos para financiar</span>
            <span>SUV Principal AUTO PREMIER, Toyota RAV4 ($38,500), BMW Serie 3 ($45,900) y Ford Mustang ($52,800).</span>
          </div>
          <div class="ventana__item">
            <span class="ventana__item-titulo">Cómo puedes pagar</span>
            <span>Pago al contado, transferencia bancaria, crédito directo en cuotas mensuales o dejando tu auto actual como parte de pago.</span>
          </div>
        </div>
        <button type="button" class="boton boton--primario" id="btn-cotizar-desde-fin">
          Simular cuota en cotizador
        </button>
      `
    );

    const btnSimular = document.getElementById("btn-cotizar-desde-fin");
    if (btnSimular) {
      btnSimular.addEventListener("click", () => abrirVentanaCotizador("portada"));
    }
  }

  // Ventana aparte de Nosotros
  function abrirVentanaNosotros() {
    abrirVentana(
      "Nosotros · AUTO PREMIER",
      `
        <p>En <strong>AUTO PREMIER</strong> conectamos a cada conductor con el vehículo ideal mediante transparencia, atención directa y respaldo real.</p>
        <div class="ventana__lista">
          <div class="ventana__item">
            <span class="ventana__item-titulo">Compromiso y Respaldo</span>
            <span>Unidades revisadas y asesoría personalizada antes, durante y después de tu compra.</span>
          </div>
          <div class="ventana__item">
            <span class="ventana__item-titulo">Beneficio para Clientes Habituales</span>
            <span>Reconocemos a quienes regresan o amplían su flota con descuentos especiales en su cotización.</span>
          </div>
        </div>
      `
    );
  }

  // Ventana aparte de Contacto
  function abrirVentanaContacto() {
    abrirVentana(
      "Contacto y Asesores",
      `
        <div class="ventana__lista">
          <div class="ventana__item">
            <span class="ventana__item-titulo">Gerencia AUTO PREMIER</span>
            <span>Celular / WhatsApp: <strong>68036928</strong></span>
          </div>
          <div class="ventana__item">
            <span class="ventana__item-titulo">Asesor de Ventas — SUV y Familiares</span>
            <span>Celular: <strong>71248910</strong> · Atención comercial</span>
          </div>
          <div class="ventana__item">
            <span class="ventana__item-titulo">Asesor de Ventas — Sedanes y Deportivos</span>
            <span>Celular: <strong>76532109</strong> · Cotizaciones y pruebas de manejo</span>
          </div>
        </div>
      `
    );
  }

  // Ventana aparte para Redes Sociales
  function abrirVentanaRedSocial(red) {
    const redesInfo = {
      instagram: {
        titulo: "Instagram · @autopremier.oficial",
        detalle: "Fotos de unidades, novedades del concesionario y entregas recientes.",
        contacto: "Consultas directas al 68036928"
      },
      facebook: {
        titulo: "Facebook · AUTO PREMIER Concesionario",
        detalle: "Campañas vigentes, planes de financiamiento y atención a clientes.",
        contacto: "Consultas directas al 68036928"
      },
      whatsapp: {
        titulo: "WhatsApp Oficial · AUTO PREMIER",
        detalle: "Escríbenos para coordinar visitas, cotizaciones o hablar con gerencia.",
        contacto: "Número de gerencia: 68036928"
      }
    };

    const info = redesInfo[red] || redesInfo.whatsapp;
    abrirVentana(
      info.titulo,
      `
        <div class="ventana__item">
          <span class="ventana__item-titulo">${info.titulo}</span>
          <span>${info.detalle}</span>
        </div>
        <p>${info.contacto}.</p>
      `
    );
  }

  // Ventana de Cotizador: inicia con el auto de la portada por defecto, muestra opciones y descuento cliente habitual
  function abrirVentanaCotizador(autoInicial = "portada") {
    abrirVentana(
      "Cotizar Vehículo",
      `
        <form id="form-cotizador" class="ventana__cuerpo">
          <div class="ventana__campo">
            <label for="cot-auto" class="ventana__etiqueta-campo">Vehículo a cotizar</label>
            <select id="cot-auto" class="ventana__control">
              <option value="34900" ${autoInicial === "portada" ? "selected" : ""}>SUV Principal AUTO PREMIER ($34,900)</option>
              <option value="38500" ${autoInicial === "38500" ? "selected" : ""}>Toyota RAV4 ($38,500)</option>
              <option value="45900" ${autoInicial === "45900" ? "selected" : ""}>BMW Serie 3 ($45,900)</option>
              <option value="52800" ${autoInicial === "52800" ? "selected" : ""}>Ford Mustang ($52,800)</option>
            </select>
          </div>

          <div class="ventana__campo">
            <label for="cot-meses" class="ventana__etiqueta-campo">Plazo de pago</label>
            <select id="cot-meses" class="ventana__control">
              <option value="12">12 meses</option>
              <option value="24" selected>24 meses</option>
              <option value="36">36 meses</option>
              <option value="48">48 meses</option>
            </select>
          </div>

          <label class="ventana__check">
            <input type="checkbox" id="cot-cliente-habitual">
            <span>Soy cliente habitual (aplicar 8% de descuento)</span>
          </label>

          <button type="submit" class="boton boton--primario">Calcular cotización</button>

          <div class="ventana__resultado" id="cot-resultado"></div>
        </form>
      `
    );

    const calcular = () => {
      const selectAuto = document.getElementById("cot-auto");
      const selectMeses = document.getElementById("cot-meses");
      const checkHabitual = document.getElementById("cot-cliente-habitual");
      const resultado = document.getElementById("cot-resultado");
      if (!selectAuto || !selectMeses || !checkHabitual || !resultado) return;

      const precioBase = Number(selectAuto.value);
      const meses = Number(selectMeses.value);
      const nombreAuto = selectAuto.options[selectAuto.selectedIndex].text;
      const esHabitual = checkHabitual.checked;
      const precioFinal = esHabitual ? Math.round(precioBase * 0.92) : precioBase;
      const cuotaMensual = Math.round(precioFinal / meses);

      resultado.innerHTML = esHabitual
        ? `<strong>${nombreAuto}</strong> · Cliente habitual (-8%): total <strong>$${precioFinal.toLocaleString()}</strong> en ${meses} meses → <strong>$${cuotaMensual.toLocaleString()} / mes</strong>.`
        : `<strong>${nombreAuto}</strong> · Total <strong>$${precioFinal.toLocaleString()}</strong> en ${meses} meses → <strong>$${cuotaMensual.toLocaleString()} / mes</strong>.`;
    };

    calcular();

    const form = document.getElementById("form-cotizador");
    const checkHabitual = document.getElementById("cot-cliente-habitual");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        calcular();
      });
    }
    if (checkHabitual) {
      checkHabitual.addEventListener("change", calcular);
    }
  }

  // Navegación del menú superior (cada enlace abre su ventana aparte)
  enlacesMenu.forEach((enlace) => {
    enlace.addEventListener("click", (evento) => {
      const vista = enlace.getAttribute("data-vista");
      if (!vista) return;
      evento.preventDefault();

      marcarEnlaceActivo(vista);
      if (menuMovil) {
        menuMovil.classList.remove("header__menu--abierto");
      }

      if (vista === "inicio") {
        cerrarVentana();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (vista === "catalogo") {
        abrirVentanaCatalogoMenu();
      } else if (vista === "servicios") {
        abrirVentanaServicios();
      } else if (vista === "financiamiento") {
        abrirVentanaFinanciamiento();
      } else if (vista === "nosotros") {
        abrirVentanaNosotros();
      } else if (vista === "contacto") {
        abrirVentanaContacto();
      }
    });
  });

  // Menú móvil
  if (btnMenuMovil && menuMovil) {
    btnMenuMovil.addEventListener("click", () => {
      menuMovil.classList.toggle("header__menu--abierto");
    });
  }

  // Botones del Hero
  if (btnVerCatalogo) {
    btnVerCatalogo.addEventListener("click", () => {
      marcarEnlaceActivo("catalogo");
      abrirVentanaFuturoCatalogo();
    });
  }

  if (btnCotizarAhora) {
    btnCotizarAhora.addEventListener("click", () => {
      abrirVentanaCotizador("portada");
    });
  }

  // Tarjetas de autos en catálogo actual -> abren cotizador con ese auto
  tarjetasAuto.forEach((tarjeta) => {
    tarjeta.addEventListener("click", () => {
      const precio = tarjeta.getAttribute("data-precio") || "portada";
      abrirVentanaCotizador(precio);
    });
  });

  // Tarjetas de servicios -> abren su ventana correspondiente
  tarjetasServicio.forEach((tarjeta) => {
    tarjeta.addEventListener("click", () => {
      const vista = tarjeta.getAttribute("data-vista");
      if (vista === "nosotros") {
        abrirVentanaNosotros();
      } else if (vista === "financiamiento") {
        abrirVentanaFinanciamiento();
      } else {
        abrirVentanaServicios();
      }
    });
  });

  // Botones de redes sociales en el footer -> abren ventana dedicada
  botonesRedes.forEach((boton) => {
    boton.addEventListener("click", () => {
      const red = boton.getAttribute("data-red");
      abrirVentanaRedSocial(red);
    });
  });

  // Cierre de ventana
  if (btnCerrarVentana) {
    btnCerrarVentana.addEventListener("click", cerrarVentana);
  }

  if (ventanaModal) {
    ventanaModal.addEventListener("click", (evento) => {
      if (evento.target === ventanaModal) {
        cerrarVentana();
      }
    });
  }

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      cerrarVentana();
    }
  });
});