import { NextResponse } from "next/server";
import { sendContactConfirmationEmail, sendContactNotificationEmail } from "@/lib/services/email";
import { syncMailchimpContact } from "@/lib/services/mailchimp";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, message, source } = body ?? {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    await sendContactNotificationEmail({ name, email, company, message, source });
    await sendContactConfirmationEmail({ name, email });

    try {
      await syncMailchimpContact({
        email,
        statusIfNew: "subscribed",
        mergeFields: {
          FNAME: name,
          COMPANY: company ?? "",
        },
        tags: ["contact_form", ...(source ? [String(source)] : [])],
      });
    } catch (mailchimpError) {
      // eslint-disable-next-line no-console
      console.error("Mailchimp sync failed for contact form submission:", mailchimpError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error handling contact form submission:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to submit contact form right now. Please try again later.",
      },
      { status: 500 },
    );
  }
}
