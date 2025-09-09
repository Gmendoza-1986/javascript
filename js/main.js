// Descuentos
const descCampaing = 0.40;
const descPrimeraCompra = 0.10;

// Carrito de correos
let carrito = [];

//  Guardar mail desde input .mail ----
function guardarEmailDesdeInput() {
  const input = document.querySelector('.mail');
  if (!input) return null;

  const entrada = input.value;
  if (entrada == null || entrada.trim() === "") return null;

  const email = entrada.trim().toLowerCase();
  localStorage.setItem('email', email);
  return email;
}

// Productos
const celulares = [
  { id: 1,  nombre: "Galaxy A16",        marca: "Samsung",  sistema: "Android", precioLista: 159990 },
  { id: 2,  nombre: "Galaxy A56",        marca: "Samsung",  sistema: "Android", precioLista: 329990 },
  { id: 3,  nombre: "Galaxy XS25",       marca: "Samsung",  sistema: "Android", precioLista: 259990 },
  { id: 4,  nombre: "Galaxy S24 FE",     marca: "Samsung",  sistema: "Android", precioLista: 799990 },
  { id: 5,  nombre: "Monophone",         marca: "Motorola", sistema: "Android", precioLista: 139990 },
  { id: 6,  nombre: "Moto G04s",         marca: "Motorola", sistema: "Android", precioLista: 104990 },
  { id: 7,  nombre: "Xiaomi 15",         marca: "Xiaomi",   sistema: "Android", precioLista: 3489900 },
  { id: 8,  nombre: "iPhone 13",         marca: "Apple",    sistema: "iOS",     precioLista: 549990 },
  { id: 9,  nombre: "iPhone 13 mini",    marca: "Apple",    sistema: "iOS",     precioLista: 499990 },
  { id: 10, nombre: "iPhone 15",         marca: "Apple",    sistema: "iOS",     precioLista: 899990 },
  { id: 11, nombre: "iPhone 16 Pro",     marca: "Apple",    sistema: "iOS",     precioLista: 1229990 },
  { id: 12, nombre: "iPhone 16 Pro Max", marca: "Apple",    sistema: "iOS",     precioLista: 1457800 }
];

// Promo de precio ----
function precioCon40(precio) {
  return Math.round(precio * (1 - descCampaing));
}

function calcularPrecio(precioBase, aplicaExtra) {
  const con40 = precioCon40(precioBase);
  const total = aplicaExtra ? Math.round(con40 * (1 - descPrimeraCompra)) : con40;
  return { precioCon40: con40, total };
}

//  Precios en las cards (precio lista + total) ----
function pintarPrecios(aplicaExtra) {
  const preciosLista = document.querySelectorAll(".precioLista");
  const preciosFinales = document.querySelectorAll(".precioFinal");

  celulares.slice(0, preciosFinales.length).forEach((producto, i) => {
    const { total } = calcularPrecio(producto.precioLista, aplicaExtra);

    if (preciosLista[i]) {
      preciosLista[i].textContent = "Precio lista: $" + producto.precioLista.toLocaleString("es-CL");
    }
    if (preciosFinales[i]) {
      preciosFinales[i].textContent = "TOTAL: $" + total.toLocaleString("es-CL");
    }
  });
}

//Filtros  (buscador + sistema operativo)
function aplicaTexto(producto, texto) {
  if (!texto) return true;
  const t = texto.toLowerCase();
  return [producto.nombre, producto.marca, producto.sistema].some(prop =>
    String(prop).toLowerCase().includes(t)
  );
}

function aplicaSO(producto, so) {
  if (!so || so === "all") return true;
  return producto.sistema.toLowerCase() === so;
}


function aplicarFiltros() {
  const texto = (document.getElementById("buscador")?.value || "").trim();
  const so = (document.getElementById("filtroSO")?.value || "all").toLowerCase();

  const cards = document.querySelectorAll(".row.row-cols-1 .col"); // cada card
  celulares.forEach((producto, i) => {
    const visible = aplicaTexto(producto, texto) && aplicaSO(producto, so);
    if (cards[i]) cards[i].style.display = visible ? "" : "none";
  });
}

// ejecutar
function ejecutar() {
  const email = guardarEmailDesdeInput();
  const aplicaExtra = !!email;
  if (aplicaExtra) carrito.push(email);

  pintarPrecios(aplicaExtra);
  aplicarFiltros(); 
}

document.addEventListener("DOMContentLoaded", () => {
  ejecutar();

  // filtros
  const buscador = document.getElementById("buscador");
  const filtroSO = document.getElementById("filtroSO");

  if (buscador) {
    buscador.addEventListener("input", aplicarFiltros);
  }
  if (filtroSO) {
    filtroSO.addEventListener("change", aplicarFiltros);
  }

  // recalcula precios
  const emailInput = document.querySelector(".mail");
  if (emailInput) {
    emailInput.addEventListener("change", () => {
      // Guardamos
      guardarEmailDesdeInput();
      pintarPrecios(true);
    });
  }
});
