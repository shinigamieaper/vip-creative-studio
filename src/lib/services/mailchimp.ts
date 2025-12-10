import crypto from "crypto";

const apiKey = process.env.MAILCHIMP_API_KEY;
const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

function getBaseUrl() {
  if (!serverPrefix) {
    throw new Error("MAILCHIMP_SERVER_PREFIX is not configured.");
  }

  return `https://${serverPrefix}.api.mailchimp.com/3.0`;
}

function getAuthHeader() {
  if (!apiKey) {
    throw new Error("MAILCHIMP_API_KEY is not configured.");
  }

  const token = Buffer.from(`anystring:${apiKey}`).toString("base64");
  return `Basic ${token}`;
}

function getSubscriberHash(email: string): string {
  return crypto.createHash("md5").update(email.toLowerCase()).digest("hex");
}

export type MailchimpStatus =
  | "subscribed"
  | "unsubscribed"
  | "cleaned"
  | "pending"
  | "transactional";

export async function syncMailchimpContact(options: {
  email: string;
  statusIfNew?: MailchimpStatus;
  tags?: string[];
  mergeFields?: Record<string, any>;
}) {
  if (!audienceId) {
    throw new Error("MAILCHIMP_AUDIENCE_ID is not configured.");
  }

  const { email, statusIfNew = "subscribed", tags = [], mergeFields = {} } = options;

  const baseUrl = getBaseUrl();
  const subscriberHash = getSubscriberHash(email);
  const memberUrl = `${baseUrl}/lists/${audienceId}/members/${subscriberHash}`;

  const memberBody = {
    email_address: email,
    status_if_new: statusIfNew,
    merge_fields: mergeFields,
  };

  const memberResponse = await fetch(memberUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthHeader(),
    },
    body: JSON.stringify(memberBody),
  });

  if (!memberResponse.ok) {
    const errorText = await memberResponse.text();
    // eslint-disable-next-line no-console
    console.error("Mailchimp member upsert failed:", memberResponse.status, errorText);
    throw new Error("Failed to sync contact with Mailchimp.");
  }

  if (tags.length > 0) {
    const tagsUrl = `${baseUrl}/lists/${audienceId}/members/${subscriberHash}/tags`;

    const tagsBody = {
      tags: tags.map((name) => ({
        name,
        status: "active",
      })),
    };

    const tagsResponse = await fetch(tagsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
      body: JSON.stringify(tagsBody),
    });

    if (!tagsResponse.ok) {
      const errorText = await tagsResponse.text();
      // eslint-disable-next-line no-console
      console.error("Mailchimp tags update failed:", tagsResponse.status, errorText);
    }
  }
}
