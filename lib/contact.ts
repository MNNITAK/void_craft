export const CONTACT_EMAIL = "voidcraft.admin@gmail.com";

/**
 * Builds a Gmail web compose URL that opens a pre-filled message in a new tab.
 * Unlike `mailto:`, this reliably lands the user in Gmail with a ready draft
 * rather than depending on a configured desktop mail client.
 */
export function gmailComposeUrl({
  subject,
  body,
  to = CONTACT_EMAIL,
}: {
  subject: string;
  body: string;
  to?: string;
}): string {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to,
    su: subject,
    body,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

/** Default "say hi" draft used by plain Gmail / email links across the site. */
export const HELLO_DRAFT = {
  subject: "Hi Void Craft — let's talk",
  body: `Hi Void Craft,

We're [your business / role] and we want to [what you're trying to build or automate].

Here's the rough idea:
-

We'd love to hear how you'd approach it, a ballpark timeline, and rough pricing.

Thanks,
[Your name]`,
};

/** Convenience URL for the "just email us" links. */
export const HELLO_GMAIL_URL = gmailComposeUrl(HELLO_DRAFT);
