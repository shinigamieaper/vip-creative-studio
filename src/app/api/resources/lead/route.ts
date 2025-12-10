import { NextResponse } from "next/server";
import { sendResourceLeadEmails } from "@/lib/services/email";
import { syncMailchimpContact } from "@/lib/services/mailchimp";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      email,
      companyName,
      resourceTitle,
      resourceType,
      downloadUrl,
      webinarUrl,
    } = body ?? {};

    if (!email || !companyName || !resourceTitle || !resourceType) {
      return NextResponse.json(
        {
          success: false,
          error: "Email, company name, resource title, and resource type are required.",
        },
        { status: 400 },
      );
    }

    if (resourceType !== "download" && resourceType !== "webinar") {
      return NextResponse.json(
        { success: false, error: "Invalid resource type." },
        { status: 400 },
      );
    }

    await sendResourceLeadEmails({
      email,
      companyName,
      resourceTitle,
      resourceType,
      downloadUrl,
      webinarUrl,
    });

    const typeTag =
      resourceType === "download" ? "resource_download" : "resource_webinar";

    try {
      await syncMailchimpContact({
        email,
        statusIfNew: "subscribed",
        mergeFields: {
          COMPANY: companyName,
          RES_TITLE: resourceTitle,
        },
        tags: ["resource_lead", typeTag],
      });
    } catch (mailchimpError) {
      // eslint-disable-next-line no-console
      console.error("Mailchimp sync failed for resource lead:", mailchimpError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error handling resource lead submission:", error);
    return NextResponse.json(
      { success: false, error: "Unable to submit lead right now. Please try again later." },
      { status: 500 },
    );
  }
}
