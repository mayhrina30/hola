
// Instala el paquete de Mercado Pago usando npm o yarn
// npm install mercadopago
const mercadopago = require('mercadopago');

// Configura las credenciales de API
mercadopago.configure({
  access_token: 'TU_ACCESS_TOKEN',
});

// Ruta para procesar el pago
app.post('/procesar-pago', (req, res) => {
  const { monto, descripcion, email } = req.body;

  // Crea un objeto de preferencia de pago
  const preference = {
    items: [
      {
        title: descripcion,
        unit_price: parseFloat(monto),
        quantity: 1,
      },
    ],
    payer: {
      email: email,
    },
  };

  // Crea la preferencia de pago
  mercadopago.preferences
    .create(preference)
    .then((response) => {
      // Redirige al usuario al formulario de pago de Mercado Pago
      res.redirect(response.body.init_point);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error al procesar el pago');
    });
});

// Ruta para recibir la notificación de pago
app.post('/notificacion-pago', (req, res) => {
  const { id, topic } = req.body;

  // Verifica la autenticidad de la notificación
  mercadopago.ipn
    .manage(topic, id)
    .then(() => {
      // Procesa la notificación y actualiza el estado del pago en tu base de datos
      // ...
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});
