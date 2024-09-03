import { NextApiRequest, NextApiResponse } from "next";
const mercadopago = require("mercadopago");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const eventTitle = process.env.NEXT_PUBLIC_EVENT_TITLE;

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const body = req.body;

  if (!body.email) {
    return res.status(400).json({ message: "O email é obrigatório" });
  }

  mercadopago.configure({
    access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
  });

  let preference = {
    items: [
      {
        title: eventTitle,
        description: "Cursilho de Cristandade da Igreja Cristã em Recife",
        unit_price: 370,
        quantity: 1,
      },
    ],
    payer: {
      name: body.fullName,
      email: body.email,
    },
    payment_methods: {
      excluded_payment_types: [
        {
          id: "bank_transfer",
        },
      ],
    },
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response: any) {
      return res.status(200).json({ data: response.body.init_point });
    })
    .catch(function (error: any) {
      console.log(error);
    });
}
