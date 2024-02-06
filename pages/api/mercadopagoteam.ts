import { NextApiRequest, NextApiResponse } from "next";
const mercadopago = require("mercadopago");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const body = req.body;

  console.log(body);

  if (!body.form.fullName) {
    return res.status(400).json({ data: "USER_NOT_FILLED" });
  }

  mercadopago.configure({
    access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
  });

  const tax = process.env.NEXT_PUBLIC_TAX_TEAM_PAYMENT;

  const getReference = () => {
    let preference = {
      items: [
        {
          title: "Equipe Cursilho ICR - Taxa",
          description: "Pagamento da Equipe do Cursilho de Cristandade da Igreja Cristã em Recife",
          unit_price: Number(tax),
          quantity: 1,
        },
      ],
      payer: {
        name: body.name,
      },
    };
    return preference;
  };

  const reference = getReference();

  mercadopago.preferences
    .create(reference)
    .then(function (response: any) {
      return res.status(200).json({ url: response.body.init_point });
    })
    .catch(function (error: any) {
      return res.status(500).json({ error: error.message });
    });
}
