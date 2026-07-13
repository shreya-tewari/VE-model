"""
Minimal email notifier for contact-form submissions.

No SMTP credentials are configured out of the box (so this runs with zero
external services). It logs the message instead of sending it; swap the
body of `send_contact_notification` for a real provider (SES, Postmark,
SMTP, etc.) when you're ready to go live.
"""
import logging

logger = logging.getLogger("ve_advisor.email")


def send_contact_notification(name: str, email: str, company: str, message: str) -> None:
    logger.info(
        "New contact submission from %s <%s> (%s): %s",
        name, email, company or "no company given", message,
    )
