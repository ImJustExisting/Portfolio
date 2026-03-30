import type { FormEvent } from "react";
import { useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { submitContactForm, resetContactStatus } from "../store/contactSlice";
import StatusBanner from "../stories/StatusBanner";
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
  const dispatch = useAppDispatch();
  const { status, error} = useAppSelector((state) => state.contact);

  const [form, setForm] = useState<FormState>(initialState);
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const [submitAttempted, setSubmitAttempted] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const errors: Errors = useMemo(() => {
    const next: Errors = {};

    if (!form.name.trim()) next.name = "*Name is required";
    if (!form.email.trim()) next.email = "*Email is required";
    else if (!isValidEmail(form.email))
      next.email = "*Please enter a valid email address";

    if (!form.subject.trim()) next.subject = "*Subject is required";

    const msg = form.message.trim();
    if (!msg) next.message = "*Message is required";
    else if (msg.length < 20)
      next.message = "*Message should be at least 20 characters";

    return next;
  }, [form]);

  const isFormValid = Object.keys(errors).length === 0;

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (status !== "idle") dispatch(resetContactStatus());
  }

  function markTouched<K extends keyof FormState>(key: K) {
    setTouched((prev) => ({ ...prev, [key]: true }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setSubmitAttempted(true);
    setTouched({ name: true, email: true, subject: true, message: true });

    if (!isFormValid) {
      if (errors.name) nameRef.current?.focus();
      else if (errors.email) emailRef.current?.focus();
      else if (errors.subject) subjectRef.current?.focus();
      else if (errors.message) messageRef.current?.focus();
      return;
    }

    const result = await dispatch(submitContactForm(form));

    if (submitContactForm.fulfilled.match(result)) {
      setForm(initialState);
      setTouched({ name: false, email: false, subject: false, message: false });
      setSubmitAttempted(false);
    }
  }

  const nameInvalid = Boolean(touched.name && errors.name);
  const emailInvalid = Boolean(touched.email && errors.email);
  const subjectInvalid = Boolean(touched.subject && errors.subject);
  const messageInvalid = Boolean(touched.message && errors.message);

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      <h1>Contact</h1>
      <p>
        Use this form to reach out regarding opportunities, collaborations, or
        questions about my work.
      </p>

      {status === "succeeded" && (
        <div style={{ marginBottom: 12 }}>
          <StatusBanner
            type="success"
            message="Your message was sent successfully."
          />
        </div>
      )}

      {status === "failed" && (
        <div style={{ marginBottom: 12 }}>
          <StatusBanner
            type="error"
            message={error ?? "Something went wrong. Please try again."}
          />
        </div>
      )}

      {submitAttempted && !isFormValid && status !== "succeeded" && (
        <div style={{ marginBottom: 12 }}>
          <StatusBanner
            type="info"
            message="Please fill out all required fields correctly before submitting."
          />
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: 12 }}>
          <label
            htmlFor="name"
            className={`${style.formLabel} ${nameInvalid ? style.labelError : ""}`}
          >
            Name
          </label>

          <input
            ref={nameRef}
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            onBlur={() => markTouched("name")}
            aria-invalid={nameInvalid}
            aria-describedby={nameInvalid ? "name-error" : undefined}
            className={`${style.inputCell} ${nameInvalid ? style.inputError : ""}`}
            placeholder="Your name"
          />

          {touched.name && errors.name && (
            <p id="name-error" role="alert" className={style.formError}>
              {errors.name}
            </p>
          )}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label
            htmlFor="email"
            className={`${style.formLabel} ${emailInvalid ? style.labelError : ""}`}
          >
            Email
          </label>

          <input
            ref={emailRef}
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            onBlur={() => markTouched("email")}
            aria-invalid={emailInvalid}
            aria-describedby={emailInvalid ? "email-error" : undefined}
            className={`${style.inputCell} ${emailInvalid ? style.inputError : ""}`}
            placeholder="name@example.com"
          />

          {touched.email && errors.email && (
            <p id="email-error" role="alert" className={style.formError}>
              {errors.email}
            </p>
          )}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label
            htmlFor="subject"
            className={`${style.formLabel} ${subjectInvalid ? style.labelError : ""}`}
          >
            Subject
          </label>

          <input
            ref={subjectRef}
            id="subject"
            type="text"
            value={form.subject}
            onChange={(e) => updateField("subject", e.target.value)}
            onBlur={() => markTouched("subject")}
            aria-invalid={subjectInvalid}
            aria-describedby={subjectInvalid ? "subject-error" : undefined}
            className={`${style.inputCell} ${subjectInvalid ? style.inputError : ""}`}
            placeholder="What is this about?"
          />

          {touched.subject && errors.subject && (
            <p id="subject-error" role="alert" className={style.formError}>
              {errors.subject}
            </p>
          )}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label
            htmlFor="message"
            className={`${style.formLabel} ${messageInvalid ? style.labelError : ""}`}
          >
            Message
          </label>

          <textarea
            ref={messageRef}
            id="message"
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            onBlur={() => markTouched("message")}
            aria-invalid={messageInvalid}
            aria-describedby={messageInvalid ? "message-error" : undefined}
            className={`${style.inputMes} ${messageInvalid ? style.inputError : ""}`}
            placeholder="Write your message (at least 20 characters)..."
          />

          {touched.message && errors.message && (
            <p id="message-error" role="alert" className={style.formError}>
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "loading" || !isFormValid}
          className={style.SubButton}
        >
          {status === "loading" ? "Sending..." : "Send message"}
        </button>
      </form>
    </main>
  );
}
