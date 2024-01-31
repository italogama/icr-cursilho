import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

type SheetForm = {
  fullName: string;
  cpf: string;
  profession: string;
  nickname: string;
  email: string;
  birthDate: string;
  civilStatus: string;
  shirtSize: string;
  address: string;
  addressCity: string;
  addressZipCode: string;
  homePhone: string;
  workPhone: string;
  contact1Name: string;
  contact1Phone: string;
  contact2Name: string;
  contact2Phone: string;
  diet: string;
  dietSpec: string;
  healthProblem: string;
  healthProblemSpec: string;
  medication: string;
  medicationSpec: string;
  terms: boolean;
  inviterName: string;
  inviterPhone: string;
  inviterCursillo: string;
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

    const response = await sheet.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "A2:AB2",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            body.fullName,
            body.nickname,
            body.profession,
            body.email,
            body.birthDate,
            body.civilStatus,
            body.cpf,
            body.shirtSize,
            body.address,
            body.addressCity,
            body.addressZipCode,
            body.homePhone,
            body.workPhone,
            body.contact1Name,
            body.contact1Phone,
            body.contact2Name,
            body.contact2Phone,
            body.diet,
            body.dietSpec,
            body.healthProblem,
            body.healthProblemSpec,
            body.medication,
            body.medicationSpec,
            body.terms,
            body.inviterName,
            body.inviterPhone,
            body.inviterCursillo,
          ],
        ],
      },
    });

    return res.status(200).json({ data: response.data });
  } catch (e: any) {
    return res.status(500).send({ message: e.message ?? "Something went wrong" });
  }
}
