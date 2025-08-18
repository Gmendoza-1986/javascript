let precioLista = 199990;
const descCampaing = 0.40;
const descPrimeraCompra = 0.10;

let carrito = [];

function MailIngresado() {
  let ingreso;

  ingreso = prompt("Ingresa tu mail para obtener un descuento adicional, o escribe 'salir'");
      // Si cancela o escribe 'salir' es solo 40%

    if (ingreso === "salir")  {
        let precioConDescuentoBase = (precioLista * (1 - descCampaing));
        console.log("Carrito sin mails:", carrito);
        alert("No ingresaste e-mail. No se aplicará el 10% extra." + 
        "Total a pagar: $" + Math.round(precioConDescuentoBase)
      );
     
    } else if (ingreso) {
     
      let email = ingreso.trim().toLowerCase();
      carrito.push(email);
      console.log("Tienes un 10% adicional en tu compra");
    // Si agrega mail Aplica 40% + 10% adicional
    let precioConDescuentoBase = precioLista * (1 - descCampaing);
    let precioFinal = precioConDescuentoBase * (1 - descPrimeraCompra);

    console.log("Carrito con mails:", carrito);
    alert(
      "Tienes un 40% de campaña + 10% adicional por primera compra.\n" +
      "Total a pagar: $" + Math.round(precioFinal)
    );

    }

}
MailIngresado();
