
const descCampaing = 0.40;
const descPrimeraCompra = 0.10;
let carrito = [];

//pedir mail y guardar
function guardarEmailDesdeInput() {
  const input = document.querySelector('.mail');
  if (!input) return null;              // no existe el input

  const entrada = input.value;
  if (entrada === null) return null;    // entrada es null

  const email = entrada.trim().toLowerCase();               
  localStorage.setItem('email', email);
  return email;
}
const celulares=[
  {id:, nombre:"S25",marca:"Samsung", sistema:"Android", precioLista:}
  {id:, nombre:"S25",marca:"Samsung", sistema:"Android", precioLista:}
  {id:, nombre:"S25",marca:"Samsung", sistema:"Android", precioLista:}
  {id:, nombre:"S25",marca:"Samsung", sistema:"Android", precioLista:}
  {id:, nombre:"S25",marca:"Samsung", sistema:"Android", precioLista:}
  {id:, nombre:"S25",marca:"Samsung", sistema:"Android", precioLista:}
  {id:, nombre:"S25",marca:"Samsung", sistema:"Android", precioLista:}
  {id:, nombre:"S25",marca:"Samsung", sistema:"Android", precioLista:}
  {id:, nombre:"S25",marca:"Samsung", sistema:"IOS", precioLista:}
  {id:, nombre:"S25",marca:"Samsung", sistema:"IOS", precioLista:}
  {id:, nombre:"S25",marca:"Samsung", sistema:"IOS", precioLista:}
  {id:, nombre:"S25",marca:"Samsung", sistema:"IOS", precioLista:}


]
// calcula precio
function calcularPrecio(precioBase, aplicaExtra) {
  let precioCon40 = Math.round(precioBase * (1 - descCampaing));
  let total = precioCon40;
  if (aplicaExtra) {
    total = Math.round(precioCon40 * (1 - descPrimeraCompra));
  }
  return { precioCon40, total };
}
//promocion samsung
function aplicarPromoSamsung(productos) {
  return productos.map(p => {
    if (p.marca === "Samsung") {
      return {
        ...p,
        promocion: precioCon40(p.precioBase) 
      };
    } else {
      return {
        ...p,
        promocion: null 
      };
    }
  });
}
function ejecutar() {

  let email = guardarEmailDesdeInput();
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
