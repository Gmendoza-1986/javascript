
const descCampaing = 0.40;
const descPrimeraCompra = 0.10;

let carrito = [];
let celulares = []; 

// mail
function guardarEmailDesdeInput() {
  const input = document.querySelector('.mail');
  if (!input) return null;

  const entrada = input.value;
  if (entrada == null || entrada.trim() === "") return null;

  const email = entrada.trim().toLowerCase();
  localStorage.setItem('email', email);
  return email;
}

function precioCon40(precio) {
  return Math.round(precio * (1 - descCampaing));
}

function calcularPrecio(precioBase, aplicaExtra) {
  const con40 = precioCon40(Number(precioBase) || 0);
  const total = aplicaExtra ? Math.round(con40 * (1 - descPrimeraCompra)) : con40;
  return { precioCon40: con40, total };
}

function aplicaTexto(producto, texto) {
  if (!texto) return true;
  const t = texto.toLowerCase();
  return [producto.nombre, producto.marca].some(prop =>
    String(prop ?? "").toLowerCase().includes(t)
  );
}

function aplicaSO(producto, so) {
  const sys = String(producto.sistema ?? "").toLowerCase();
  if (!so || so === "all") return true;
  return sys === so;
}

// Datos
async function cargarCelulares() {
  try {
    const resp = await fetch('./js/productos.json');
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    celulares = Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('Error cargando productos:', err);
    celulares = [];
  }
}

// Cargar celulares
function renderBoxes(items = celulares) {
  const principalBox = document.querySelector("#boxesContainer");
  if (!principalBox) return;

  let boxesContent = '';
  items.forEach((producto) => {
    boxesContent += `
      <div class="col">
        <div class="card h-100 shadow-sm">
          <img src="${producto.image ?? 'https://via.placeholder.com/600x400?text=Celular'}"
               class="card-img-top phone-img"
               alt="Celular ${producto.nombre ?? ''}">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre ?? 'Sin nombre'}</h5>
            <p class="card-text small text-muted">${producto.marca ?? ''}</p>
            <p class="precioLista"></p>
            <p class="precioFinal fw-bold"></p>
            <a href="#" class="btn btn-primary w-100">Ver Detalles</a>
          </div>
        </div>
      </div>
    `;
  });

  principalBox.innerHTML = boxesContent;
}

function pintarPrecios(aplicaExtra) {
  const preciosLista = document.querySelectorAll("#boxesContainer .precioLista");
  const preciosFinales = document.querySelectorAll("#boxesContainer .precioFinal");

  celulares.slice(0, preciosFinales.length).forEach((producto, i) => {
    const lista = Number(producto.precioLista) || 0;
    const { total } = calcularPrecio(lista, aplicaExtra);

    if (preciosLista[i]) {
      preciosLista[i].textContent = "Precio lista: $" + lista.toLocaleString("es-CL");
    }
    if (preciosFinales[i]) {
      preciosFinales[i].textContent = "TOTAL: $" + total.toLocaleString("es-CL");
    }
  });
}

// Filtros
function aplicarFiltros() {
  const buscador = document.getElementById("buscador");
  const filtroSO = document.getElementById("filtroSO");
  const texto = buscador?.value ?? "";
  const so = (filtroSO?.value ?? "all").toLowerCase();

  const cards = document.querySelectorAll("#boxesContainer .col");

  celulares.forEach((producto, i) => {
    const visible = aplicaTexto(producto, texto) && aplicaSO(producto, so);
    if (cards[i]) cards[i].style.display = visible ? "" : "none";
  });
}

// 
function ejecutar() {
  const email = guardarEmailDesdeInput();
  const aplicaExtra = !!email;
  if (aplicaExtra) carrito.push(email);

  pintarPrecios(aplicaExtra); 
  aplicarFiltros();          
}

// Inicio
document.addEventListener("DOMContentLoaded", async () => {
  // datos
  await cargarCelulares();

  // render html
  renderBoxes();

  // precios
  ejecutar();

  
  const buscador = document.getElementById("buscador");
  const filtroSO = document.getElementById("filtroSO");
  if (buscador) buscador.addEventListener("input", aplicarFiltros);
  if (filtroSO) filtroSO.addEventListener("change", aplicarFiltros);

  const emailInput = document.querySelector(".mail");
  if (emailInput) {
    emailInput.addEventListener("change", () => {
      guardarEmailDesdeInput();
      pintarPrecios(true); 
    });
  }
});
