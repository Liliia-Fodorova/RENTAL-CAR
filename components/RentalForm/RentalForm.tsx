"use client";

import { useState, type SubmitEvent } from "react";
import { createBookingRequest } from "@/lib/api/cars";
import css from "./RentalForm.module.css";
import toast from "react-hot-toast";

interface RentalFormProps {
  carId: string;
}

interface FormErrors {
  name: string;
  email: string;
  comment: string;
}

function ErrorIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 7v6" />
      <path d="M12 17h.01" />
    </svg>
  );
}

export default function RentalForm({ carId }: RentalFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
 

 
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    comment: "",
  });

  async function handleSubmit(event: SubmitEvent <HTMLFormElement>) {
      event.preventDefault();
      
      if (isSubmitting) return;


    const nextErrors: FormErrors = {
      name: /^[A-Za-zÀ-ÿА-Яа-яІіЇїЄєҐґ' -]{2,}$/.test(
        name.trim()
      )
        ? ""
        : "Please enter your name.",

      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
        ? ""
        : "Please enter your email.",

      comment: comment.trim()
        ? ""
        : "Comment is required",
    };

    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await createBookingRequest(carId, {
        name: name.trim(),
        email: email.trim(),
        comment: comment.trim(),
      });

      setName("");
      setEmail("");
      setComment("");

      setErrors({
        name: "",
        email: "",
        comment: "",
      });

      toast.success(
       response.message || "Booking request sent successfully!"
      );
        
    } catch (error) {
      console.error("Booking request failed:", error);

     toast.error(
      "Failed to send booking request. Please try again."
     );
    } finally {
      setIsSubmitting(false);
    }
  
  }

  return (
    <form
      className={css.form}
      onSubmit={handleSubmit}
      noValidate
    >
      <h2 className={css.title}>Book your car now</h2>

      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <div className={css.fields}>
        {/* NAME */}
        <div className={css.fieldGroup}>
          <div className={css.field}>
            {errors.name && (
              <label
                htmlFor="rental-name"
                className={css.floatingLabel}
              >
                Name*
              </label>
            )}

            <input
              id="rental-name"
              type="text"
              className={`${css.input} ${
                errors.name ? css.invalid : ""
              }`}
              placeholder={errors.name ? "" : "Name*"}
              value={name}
              aria-label="Name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={
                errors.name ? "name-error" : undefined
              }
              onChange={(event) => {
                setName(event.target.value);
                setErrors((prev) => ({
                  ...prev,
                  name: "",
                }));
              }}
            />

            {errors.name && (
              <span className={css.errorIcon}>
                <ErrorIcon />
              </span>
            )}
          </div>

          {errors.name && (
            <p id="name-error" className={css.error}>
              {errors.name}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div className={css.fieldGroup}>
          <div className={css.field}>
            {errors.email && (
              <label
                htmlFor="rental-email"
                className={css.floatingLabel}
              >
                Email*
              </label>
            )}

            <input
              id="rental-email"
              type="email"
              className={`${css.input} ${
                errors.email ? css.invalid : ""
              }`}
              placeholder={errors.email ? "" : "Email*"}
              value={email}
              aria-label="Email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? "email-error" : undefined
              }
              onChange={(event) => {
                setEmail(event.target.value);
                setErrors((prev) => ({
                  ...prev,
                  email: "",
                }));
              }}
            />

            {errors.email && (
              <span className={css.errorIcon}>
                <ErrorIcon />
              </span>
            )}
          </div>

          {errors.email && (
            <p id="email-error" className={css.error}>
              {errors.email}
            </p>
          )}
        </div>

        {/* COMMENT */}
        <div className={css.fieldGroup}>
          <div className={css.field}>
            <textarea
              id="rental-comment"
              className={`${css.textarea} ${
                errors.comment ? css.invalid : ""
              }`}
              placeholder="Comment"
              value={comment}
              aria-label="Comment"
              aria-invalid={Boolean(errors.comment)}
              aria-describedby={
                errors.comment ? "comment-error" : undefined
              }
              onChange={(event) => {
                setComment(event.target.value);
                setErrors((prev) => ({
                  ...prev,
                  comment: "",
                }));
              }}
            />

            {errors.comment && (
              <span className={css.errorIcon}>
                <ErrorIcon />
              </span>
            )}
          </div>

          {errors.comment && (
            <p id="comment-error" className={css.error}>
              {errors.comment}
            </p>
          )}
        </div>
    </div>

      <button
        className={css.button}
              type="submit"
              disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
}