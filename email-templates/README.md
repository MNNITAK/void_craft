# Void Craft — email templates

Branded, on-theme (void `#0A0A0C` / bone `#F2F0E8` / volt `#0B4FFF`) email for
replying to project enquiries. Table-based HTML with inline styles and web-safe
font fallbacks (Arial / Courier), so it renders consistently across Gmail,
Apple Mail, and Outlook.

## Files
- `lead-response.html` — the HTML email (paste into Gmail / your ESP).
- `lead-response.txt` — plain-text fallback (good for deliverability & accessibility).

## Personalisation tokens
Find & replace before sending:

| Token              | Example                                      |
|--------------------|----------------------------------------------|
| `{{first_name}}`   | Aditya                                        |
| `{{company}}`      | Meridian Labs                                 |
| `{{project_line}}` | an AI receptionist that books appointments    |
| `{{meet_link}}`    | https://cal.com/voidcraft                     |
| `{{sender_name}}`  | Void Craft Team                               |
| `{{sender_role}}`  | Founder                                       |

## Sending from Gmail
1. Open `lead-response.html` in a browser.
2. Select all (Ctrl+A) → copy → paste into a Gmail compose window
   (Gmail keeps the formatting).
3. Or use a "paste as HTML" extension / your ESP's HTML editor for a cleaner paste.
4. Replace the tokens, set the subject from `lead-response.txt`, send.
