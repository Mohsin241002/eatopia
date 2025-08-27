"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import Header from "@/components/Header";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  // Initialize EmailJS once (only client-side)
  useEffect(() => {
    emailjs.init("ZF6p4gNuQnINTnlBN"); // your public key
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const sendConfirmationEmail = async (email: string, name: string) => {
    try {
      await emailjs.send(
        "service_1kvjpjc", // your service ID
        "template_5i4aj9k", // your template ID
        {
          to_email: email,
          from_name: "Eatopia",
          to_name: name,
          message: "Thank you for contacting us. We'll get back to you soon."
        }
      );
      return true;
    } catch (error) {
      console.error("Email error:", error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setStatus("");

    try {
      // Save to Firestore with collection name "contacts"
      await addDoc(collection(db, "contacts"), {
        ...form,
        createdAt: serverTimestamp(),
      });

      // Send confirmation email
      const emailSent = await sendConfirmationEmail(form.email, form.name);

      if (emailSent) {
        setStatus("✅ Thanks! Please check your email for confirmation.");
      } else {
        setStatus("⚠ Message saved, but email failed.");
      }

      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("❌ Something went wrong. Try again.");
    } finally {
      setSending(false);
    }
  };

  const getStatusClass = (status: string) => {
    if (status.includes("✅")) return "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800";
    if (status.includes("⚠")) return "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
    if (status.includes("❌")) return "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800";
    return "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16 pt-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-riveta-black mb-4 text-gray-900 dark:text-white">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl font-riveta text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
            Have questions or feedback? We'd love to hear from you!
          </p>
        </section>

        {/* Contact Form Section */}
        <section className="max-w-2xl mx-auto">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-riveta-medium text-gray-700 dark:text-gray-300 mb-3">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-riveta text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-riveta-medium text-gray-700 dark:text-gray-300 mb-3">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-riveta text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-riveta-medium text-gray-700 dark:text-gray-300 mb-3">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us how we can help you..."
                  required
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-riveta text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 resize-vertical"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-2xl font-riveta-medium text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>

              {status && (
                <div className={`p-4 rounded-2xl text-sm font-riveta border ${getStatusClass(status)}`}>
                  {status}
                </div>
              )}
            </form>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="mt-16 text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-riveta-medium text-gray-900 dark:text-white mb-2">Email</h3>
              <p className="text-gray-600 dark:text-gray-400 font-riveta">hello@eatopia.com</p>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-riveta-medium text-gray-900 dark:text-white mb-2">Phone</h3>
              <p className="text-gray-600 dark:text-gray-400 font-riveta">+1 (555) 123-4567</p>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-riveta-medium text-gray-900 dark:text-white mb-2">Location</h3>
              <p className="text-gray-600 dark:text-gray-400 font-riveta">St Joseph's University<br />Philadelphia, PA</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
