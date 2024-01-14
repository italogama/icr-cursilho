import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

type SheetForm = {
  email: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const body = req.body as SheetForm;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/drive", "https://www.googleapis.com/auth/drive.file", "https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheet = google.sheets({ version: "v4", auth });

    const response = await sheet.spreadsheets.values.update({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Funçoes!A1",
      requestBody: {
        values: [[`=ÍNDICE(Dados!AF:AF; CORRESP("${body.email}"; Dados!D:D; 0))`]],
      },
      includeValuesInResponse: true,
      valueInputOption: "USER_ENTERED",
    });

    if (response.data.updatedData?.values) {
      if (response.data.updatedData?.values[0][0] === "Sim") {
        return res.status(400).json({ data: "USER_PAYED_ALREADY" });
      } else if (response.data.updatedData?.values[0][0] === "#N/A" || response.data.updatedData?.values[0][0] === "#N/D") {
        return res.status(404).json({ data: "USER_NOT_FOUND" });
      } else {
        // go to checkout
        return res.status(200).json({ data: "USER_FOUND" });
      }
    }

    return res.status(200).json({ data: response.data });
  } catch (e: any) {
    return res.status(500).send({ message: e.message ?? "Something went wrong" });
  }
}
