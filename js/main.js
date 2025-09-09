// Descuentos
const descCampaing = 0.40;
const descPrimeraCompra = 0.10;

// Carrito de correos
let carrito = [];

// ---- 1) Guardar mail desde input .mail ----
function guardarEmailDesdeInput() {
  const input = document.querySelector('.mail');
  if (!input) return null; 

  const entrada = input.value; 
  if (entrada == null || entrada.trim() === "") return null;

  const email = entrada.trim().toLowerCase();
  localStorage.setItem('email', email);
  return email;
}

// ---- 2) Datos de productos ----
const celulares = [
  { id: 1,  nombre: "Galaxy A16",       marca: "Samsung",  sistema: "Android", precioLista: 159990 },
  { id: 2,  nombre: "Galaxy A56",       marca: "Samsung",  sistema: "Android", precioLista: 329990 },
  { id: 3,  nombre: "Galaxy XS25",      marca: "Samsung",  sistema: "Android", precioLista: 259990 },
  { id: 4,  nombre: "Galaxy S24 FE",    marca: "Samsung",  sistema: "Android", precioLista: 799990 },
  { id: 5,  nombre: "Monophone",        marca: "Motorola", sistema: "Android", precioLista: 139990 },
  { id: 6,  nombre: "Moto G04s",        marca: "Motorola", sistema: "Android", precioLista: 104990 },
  { id: 7,  nombre: "Xiaomi 15",        marca: "Xiaomi",   sistema: "Android", precioLista: 3489900 },
  { id: 8,  nombre: "iPhone 13",        marca: "Apple",    sistema: "iOS",     precioLista: 549990 },
  { id: 9,  nombre: "iPhone 13 mini",   marca: "Apple",    sistema: "iOS",     precioLista: 499990 },
  { id: 10, nombre: "iPhone 15",        marca: "Apple",    sistema: "iOS",     precioLista: 899990 },
  { id: 11, nombre: "iPhone 16 Pro",    marca: "Apple",    sistema: "iOS",     precioLista: 1229990 },
  { id: 12, nombre: "iPhone 16 Pro Max",marca: "Apple",    sistema: "iOS",     precioLista: 1457800 }
];

// ---- 3) Helper: calcular precio con 40% ----
function precioCon40(precio) {
  return Math.round(precio * (1 - descCampaing));
}

// ---- 4) Calcular total con posible 10% extra ----
function calcularPrecio(precioBase, aplicaExtra) {
  const con40 = precioCon40(precioBase);
  const total = aplicaExtra ? Math.round(con40 * (1 - descPrimeraCompra)) : con40;
  return { precioCon40: con40, total };
}

// ---- 5) Aplicar promo solo a Samsung  ----
function aplicarPromoSamsung(productos) {
  return productos.map(p => ({
    ...p,
    promocion: p.marca === "Samsung" ? precioCon40(p.precioLista) : null
  }));
}

// Ejemplo: generar nueva lista con promo solo en Samsung
const productosConPromo = aplicarPromoSamsung(celulares);
console.log("Productos con promo (solo Samsung):", productosConPromo);

// ---- 6) Flujo: tomar email del input y calcular precios ----
function ejecutar() {
  // Guardar email si existe en el input .mail
  const email = guardarEmailDesdeInput();
  const aplicaExtra = !!email;

  if (aplicaExtra) {
    carrito.push(email);
    console.log("Tienes un 10% adicional por primera compra");
  } else {
    console.log("No ingresaste e-mail. No se aplicará el 10% extra.");
  }

  // Seleccionamos los contenedores de precios
  const preciosLista = document.querySelectorAll(".precioLista");
  const preciosFinales = document.querySelectorAll(".precioFinal");

  // Recorremos los celulares y asignamos precios
  celulares.slice(0, preciosFinales.length).forEach((producto, i) => {
    const { total } = calcularPrecio(producto.precioLista, aplicaExtra);

    // Mostrar precio de lista
    if (preciosLista[i]) {
      preciosLista[i].textContent = "Precio Normal: $" + producto.precioLista.toLocaleString("es-CL");
    }

    // Mostrar precio final con descuentos
    if (preciosFinales[i]) {
      preciosFinales[i].textContent = "TOTAL: $" + total.toLocaleString("es-CL");
    }
  });
}

// Ejecutar al cargar DOM
document.addEventListener("DOMContentLoaded", ejecutar);
