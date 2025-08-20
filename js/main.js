let precioLista = 199990;
const descCampaing = 0.40;
const descPrimeraCompra = 0.10;
let carrito = [];

//pedir mail
function pedirMail() {
  const entrada = prompt("Ingresa tu mail para obtener un 10% adicional, o escribe 'salir' (Cancelar = salir)");
  if (entrada === null) return null;                 // canceló
  const email = entrada.trim().toLowerCase();
  if (email === "" || email === "salir") return null; // vacío o 'salir'
  return email;                                       // devuelve el mail normalizado
}

// calcula precio
function calcularPrecio(precioBase, aplicaExtra) {
  let precioCon40 = Math.round(precioBase * (1 - descCampaing));
  let total = precioCon40;
  if (aplicaExtra) {
    total = Math.round(precioCon40 * (1 - descPrimeraCompra));
  }
  return { precioCon40, total };
}

function ejecutar() {

  let email = pedirMail();
  let aplicaExtra = !!email;

if (aplicaExtra) {
  carrito.push(email);
  console.log("Tienes un 10% adicional por primera compra");
} else {
  console.log("No ingresaste e-mail. No se aplicará el 10% extra.");
}

const { precioCon40, total } = calcularPrecio(precioLista, aplicaExtra);

console.log("Precio lista:", precioLista);
console.log("Total con descuentos:", total);
alert("TOTAL A PAGAR: $" + total);
}


// Ejecutar
ejecutar();
