"use client";

import { FormEvent, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { FaGithub, FaLinkedinIn, FaTelegramPlane } from "react-icons/fa";

const socialLinks = [
  {
    key: "github",
    href: "https://github.com/AzizkhonM",
    icon: FaGithub,
  },
  {
    key: "linkedin",
    href: "https://linkedin.com/in/azizkhon-muzaffarov/",
    icon: FaLinkedinIn,
  },
  {
    key: "telegram",
    href: "https://t.me/azizkhon_muzaffarov",
    icon: FaTelegramPlane,
  },
] as const;

type FormValues = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = {
  name: string;
  email: string;
  message: string;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  message: "",
};

export function Contact() {
  const t = useTranslations("Contact");

  const [values, setValues] = useState<FormValues>(initialValues);

  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);

  // Restore saved form values
  useEffect(() => {
    try {
      const saved = localStorage.getItem("contact-form");

      if (saved) {
        const parsed = JSON.parse(saved);

        if (
          parsed &&
          typeof parsed === "object" &&
          typeof parsed.name === "string" &&
          typeof parsed.email === "string" &&
          typeof parsed.message === "string"
        ) {
          setValues({
            name: parsed.name,
            email: parsed.email,
            message: parsed.message,
          });
        }
      }
    } catch {
      // Ignore invalid localStorage data
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save form values
  useEffect(() => {
    if (!isHydrated) return;

    try {
      localStorage.setItem("contact-form", JSON.stringify(values));
    } catch {
      // Ignore localStorage errors
    }
  }, [values, isHydrated]);

  function validateName(name: string) {
    if (!name.trim()) {
      return t("form.errors.nameRequired");
    }

    if (name.trim().length < 3) {
      return t("form.errors.nameMin");
    }

    return "";
  }

  function validateEmail(email: string) {
    if (!email.trim()) {
      return t("form.errors.emailRequired");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return t("form.errors.emailInvalid");
    }

    return "";
  }

  function validateMessage(message: string) {
    if (!message.trim()) {
      return t("form.errors.messageRequired");
    }

    if (message.trim().length < 10) {
      return t("form.errors.messageMin");
    }

    return "";
  }

  function validateForm(currentValues: FormValues): FormErrors {
    return {
      name: validateName(currentValues.name),
      email: validateEmail(currentValues.email),
      message: validateMessage(currentValues.message),
    };
  }

  function handleChange(field: keyof FormValues, value: string) {
    setSubmitError("");

    const nextValues = {
      ...values,
      [field]: value,
    };

    setValues(nextValues);

    let error = "";

    if (field === "name") {
      error = validateName(value);
    }

    if (field === "email") {
      error = validateEmail(value);
    }

    if (field === "message") {
      error = validateMessage(value);
    }

    setErrors((previous) => ({
      ...previous,
      [field]: error,
    }));
  }

  const formErrors = validateForm(values);

  const isFormValid =
    values.name.trim().length >= 3 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) &&
    values.message.trim().length >= 10 &&
    !formErrors.name &&
    !formErrors.email &&
    !formErrors.message;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(values);

    setErrors(nextErrors);
    setSubmitError("");

    if (nextErrors.name || nextErrors.email || nextErrors.message) {
      return;
    }

    if (isSending || sent) return;

    setIsSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSent(true);

      localStorage.removeItem("contact-form");
    } catch (error) {
      console.error("Contact form error:", error);

      setSubmitError(t("form.error"));
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section id="contact" className="relative min-h-dvh bg-[#FFFAF0]">
      <div className="flex min-h-dvh flex-col px-6 py-8 md:px-10 md:py-10">
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] opacity-50">
            {t("number")}
          </p>

          <p className="text-[10px] uppercase tracking-[0.2em] opacity-50">
            {t("label")}
          </p>
        </div>

        {/* CONTENT */}
        <div className="mt-[8dvh] flex flex-1 flex-col">
          {/* HEADLINE */}
          <div>
            <h2
              className="
                max-w-5xl
                font-advaken
                text-[clamp(3rem,8vw,8rem)]
                font-medium
                lowercase
                leading-[0.86]
                tracking-[-0.05em]
              "
            >
              <span className="block">{t("headline.line1")}</span>

              <span className="block">{t("headline.line2")}</span>
            </h2>
          </div>

          {/* FORM */}
          <div className="mt-12 w-full max-w-4xl md:mt-16">
            <form onSubmit={handleSubmit} noValidate>
              {/* NAME */}
              <div className="border-b border-[#171411]/15">
                <label
                  htmlFor="contact-name"
                  className="block pt-4 text-[9px] uppercase tracking-[0.2em] opacity-40"
                >
                  {t("form.name")}
                </label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  disabled={isSending || sent}
                  placeholder={t("form.namePlaceholder")}
                  className="
                    w-full
                    bg-transparent
                    py-4
                    text-sm
                    outline-none
                    placeholder:text-[#171411]/30
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                />

                {errors.name && (
                  <p className="pb-3 text-[9px] uppercase tracking-[0.12em] text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div className="border-b border-[#171411]/15">
                <label
                  htmlFor="contact-email"
                  className="block pt-4 text-[9px] uppercase tracking-[0.2em] opacity-40"
                >
                  {t("form.email")}
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={(event) =>
                    handleChange("email", event.target.value)
                  }
                  disabled={isSending || sent}
                  placeholder={t("form.emailPlaceholder")}
                  className="
                    w-full
                    bg-transparent
                    py-4
                    text-sm
                    outline-none
                    placeholder:text-[#171411]/30
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                />

                {errors.email && (
                  <p className="pb-3 text-[9px] uppercase tracking-[0.12em] text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* MESSAGE */}
              <div className="border-b border-[#171411]/15">
                <label
                  htmlFor="contact-message"
                  className="block pt-4 text-[9px] uppercase tracking-[0.2em] opacity-40"
                >
                  {t("form.message")}
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={(event) =>
                    handleChange("message", event.target.value)
                  }
                  disabled={isSending || sent}
                  placeholder={t("form.messagePlaceholder")}
                  className="
                    w-full
                    resize-none
                    bg-transparent
                    py-4
                    text-sm
                    leading-relaxed
                    outline-none
                    placeholder:text-[#171411]/30
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                />

                {errors.message && (
                  <p className="pb-3 text-[9px] uppercase tracking-[0.12em] text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>

              {submitError && (
                <p
                  aria-live="polite"
                  className="pt-4 text-right text-[9px] uppercase tracking-[0.12em] text-red-600"
                >
                  {submitError}
                </p>
              )}

              {/* SUBMIT */}
              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  disabled={!isFormValid || isSending || sent}
                  className="
                    border
                    border-[#171411]
                    px-6
                    py-3
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    transition-all
                    duration-300
                    hover:bg-[#171411]
                    hover:text-[#FFFAF0]
                    disabled:cursor-not-allowed
                    disabled:opacity-30
                    disabled:hover:bg-transparent
                    disabled:hover:text-[#171411]
                  "
                >
                  {isSending
                    ? t("form.sending")
                    : sent
                      ? t("form.success")
                      : t("form.submit")}
                </button>
              </div>
            </form>
          </div>

          {/* SOCIAL LINKS */}
          <div className="mt-16 border-t border-[#171411]/15 pt-6 md:mt-20">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {socialLinks.map(({ key, href, icon: Icon }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(`social.${key}`)}
                  className="
                      group
                      flex
                      flex-col
                      items-center
                      gap-3
                      transition-opacity
                      duration-300
                      hover:opacity-60
                    "
                >
                  <Icon
                    className="
                        h-5
                        w-5
                        transition-transform
                        duration-300
                        group-hover:-translate-y-0.5
                      "
                  />

                  <span className="text-[9px] uppercase tracking-[0.18em] opacity-45">
                    {t(`social.${key}`)}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-12 flex items-end justify-between border-t border-[#171411]/10 pt-5 text-[9px] uppercase tracking-[0.2em] opacity-35">
          <span>AZIZKHON</span>
          <span>2026</span>
        </div>
      </div>
    </section>
  );
}
