"use client";

import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Who can advertise ?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "What is advanced verification system ?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    question: "What is Flexible Advertising Options ?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

export default function Faq() {
  // all open by default
  const [openItems, setOpenItems] = useState<boolean[]>(
    faqs.map(() => true)
  );

  const toggle = (index: number) => {
    setOpenItems((prev) =>
      prev.map((item, i) => (i === index ? !item : item))
    );
  };

  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-10 text-4xl font-medium text-gray-700">
          FAQs
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, index) => {
            const isOpen = openItems[index];

            return (
              <div
                key={faq.question}
                className="rounded border border-gray-400 px-6 py-6"
              >
                {/* Header */}
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-start justify-between text-left"
                >
                  <h3 className="text-lg font-medium text-gray-700">
                    {faq.question}
                  </h3>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-500 text-blue-500">
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>

                {/* Answer */}
                {isOpen && (
                  <p className="mt-4 max-w-4xl text-sm leading-relaxed text-gray-600">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
