import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import style from "./styles/contact.module.css";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function isValidEmail(email: string) {
  // simple, reliable-enough for client-side checks
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialState);
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const errors: Errors = useMemo(() => {
    const next: Errors = {};

    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!isValidEmail(form.email)) next.email = "Please enter a valid email address.";

    if (!form.subject.trim()) next.subject = "Subject is required.";

    const msg = form.message.trim();
    if (!msg) next.message = "Message is required.";
    else if (msg.length < 20) next.message = "Message should be at least 20 characters.";

    return next;
  }, [form]);

  const isFormValid = Object.keys(errors).length === 0;

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setStatus("idle"); // reset status when user edits
  }

  function markTouched<K extends keyof FormState>(key: K) {
    setTouched((prev) => ({ ...prev, [key]: true }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // mark all as touched so errors show if user tried to submit immediately
    setTouched({ name: true, email: true, subject: true, message: true });

    if (!isFormValid) return;

    setIsSubmitting(true);
    setStatus("idle");

    try {
      await new Promise((r) => setTimeout(r, 700));

      setStatus("success");
      setForm(initialState);
      setTouched({ name: false, email: false, subject: false, message: false });
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      <h1>Contact</h1>
      <p>
        Use this form to reach out regarding opportunities, collaborations, or questions about my work.
      </p>

      {status === "success" && (
        <div role="status" style={{ padding: 12, backgroundColor: "var(--success)", marginBottom: 12 }}>
          Your message was sent successfully.
        </div>
      )}

      {status === "error" && (
        <div role="alert" style={{ padding: 12, backgroundColor: "var(--error)", marginBottom: 12 }}>
          Something went wrong. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="name" style={{color: "var(--text)"}}>Name</label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            onBlur={() => markTouched("name")}
            aria-invalid={Boolean(touched.name && errors.name)}
            aria-describedby={touched.name && errors.name ? "name-error" : undefined}
            className={style.inputCell}
            placeholder="Your name"
          />
          {touched.name && errors.name && (
            <p id="name-error" role="alert" style={{ marginTop: 6 }}>
              {errors.name}
            </p>
          )}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="email" style={{color: "var(--text)"}}>Email</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            onBlur={() => markTouched("email")}
            aria-invalid={Boolean(touched.email && errors.email)}
            aria-describedby={touched.email && errors.email ? "email-error" : undefined}
            className={style.inputCell}
            placeholder="name@example.com"
          />
          {touched.email && errors.email && (
            <p id="email-error" role="alert" style={{ marginTop: 6 }}>
              {errors.email}
            </p>
          )}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="subject" style={{color: "var(--text)"}}>Subject</label>
          <input
            id="subject"
            type="text"
            value={form.subject}
            onChange={(e) => updateField("subject", e.target.value)}
            onBlur={() => markTouched("subject")}
            aria-invalid={Boolean(touched.subject && errors.subject)}
            aria-describedby={touched.subject && errors.subject ? "subject-error" : undefined}
            className={style.inputCell}
            placeholder="What is this about?"
          />
          {touched.subject && errors.subject && (
            <p id="subject-error" role="alert" style={{ marginTop: 6 }}>
              {errors.subject}
            </p>
          )}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="message" style={{color: "var(--text)"}}>Message</label>
          <textarea
            id="message"
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            onBlur={() => markTouched("message")}
            aria-invalid={Boolean(touched.message && errors.message)}
            aria-describedby={touched.message && errors.message ? "message-error" : undefined}
            className={style.inputMes}
            placeholder="Write your message (at least 20 characters)..."
          />
          {touched.message && errors.message && (
            <p id="message-error" role="alert" style={{ marginTop: 6 }}>
              {errors.message}
            </p>
          )}
        </div>

        <button type="submit" disabled={!isFormValid || isSubmitting} className={style.SubButton}>
          {isSubmitting ? "Sending..." : "Send message"}
        </button>
      </form>
    </main>
  );
}
