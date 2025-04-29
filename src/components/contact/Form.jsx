"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { scale: 0 },
  show: { scale: 1 },
};

const inputClasses = "w-full p-3 rounded-md shadow-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 custom-bg";
const errorClasses = "inline-block self-start text-accent text-sm mt-1";
const buttonClasses = "px-8 py-3 rounded-md shadow-lg bg-accent text-background hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer capitalize font-medium transition-colors";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const sendEmail = async (data) => {
    try {
      const subject = `Message from ${data.name}`;
      const body = `${data.message}%0D%0A%0D%0AReply to: ${data.email}`;
      const mailtoUrl = `mailto:AyandaKweyamavezi5@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

      // Try to open in new tab first (better for mobile)
      const newWindow = window.open(mailtoUrl, '_blank');
      
      // Fallback if popup blocked or doesn't open
      setTimeout(() => {
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          window.location.href = mailtoUrl;
        }
      }, 500);

      toast.success("Opening email client...");
      
      // Log the submission for debugging
      console.log("Form submission attempt:", { subject, body });
    } catch (error) {
      toast.error("Couldn't open email client. Please email us directly at AyandaKweyamavezi5@gmail.com");
      console.error("Email error:", error);
    }
  };

  const onSubmit = async (data) => {
    await sendEmail(data);
    reset();
  };

  return (
    <>
      <Toaster richColors position="top-center" />
      <motion.form
        variants={containerVariants}
        initial="hidden"
        animate="show"
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full flex flex-col gap-4"
      >
        <motion.div variants={itemVariants} className="w-full">
          <input
            type="text"
            placeholder="Your Name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name should be at least 3 characters",
              },
              maxLength: {
                value: 50,
                message: "Name should be less than 50 characters",
              },
            })}
            className={inputClasses}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className={errorClasses}>{errors.name.message}</p>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="w-full">
          <input
            type="email"
            placeholder="Your Email"
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              }
            })}
            className={inputClasses}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className={errorClasses}>{errors.email.message}</p>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="w-full">
          <textarea
            placeholder="Your Message"
            rows={5}
            {...register("message", {
              required: "Message is required",
              minLength: {
                value: 20,
                message: "Message should be at least 20 characters",
              },
              maxLength: {
                value: 1000,
                message: "Message should be less than 1000 characters",
              },
            })}
            className={inputClasses}
            aria-invalid={!!errors.message}
          />
          {errors.message && (
            <p className={errorClasses}>{errors.message.message}</p>
          )}
        </motion.div>

        <motion.button
          variants={itemVariants}
          type="submit"
          disabled={isSubmitting}
          className={buttonClasses}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </motion.button>

        <motion.p 
          variants={itemVariants}
          className="text-sm text-muted-foreground text-center font-bold"
        >
          Alternatively, you can email me directly at AyandaKweyamavezi5@gmail.com or better yet you call or whatsApp me on 0691327681
        </motion.p>
      </motion.form>
    </>
  );
}