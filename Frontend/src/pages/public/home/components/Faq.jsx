import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
const faqs = [
  {
    id: 1,
    question: "How does Scholarship AI find scholarships?",
    answer:
      "Our AI analyzes your academic profile, study goals, interests, and preferences, then matches you with scholarships that best fit your qualifications.",
  },
  {
    id: 2,
    question: "Is Scholarship AI free to use?",
    answer:
      "Yes. You can search, explore, and save scholarship opportunities for free. Additional premium features may be introduced in the future.",
  },
  {
    id: 3,
    question: "Can I apply directly through the platform?",
    answer:
      "No. We redirect you to the official scholarship website so you can submit your application securely through the organization offering the scholarship.",
  },
  {
    id: 4,
    question: "How often is the scholarship database updated?",
    answer:
      "Our database is updated regularly to include new opportunities and remove expired scholarships, helping you discover the latest available programs.",
  },
  {
    id: 5,
    question: "Which countries and universities are supported?",
    answer:
      "Scholarship AI includes opportunities from universities and organizations across many countries, covering undergraduate, master's, and PhD programs.",
  },
  {
    id: 6,
    question: "Can I save scholarships for later?",
    answer:
      "Yes. You can bookmark scholarships, organize your favorites, and easily return to them whenever you're ready to apply.",
  },
];
function Faq() {
  const [openQuestion, setOpenQuestion] = useState(null);
  function toggleAccordion(id) {
    openQuestion === id ? setOpenQuestion(null) : setOpenQuestion(id);
  }
  return (
    <section id="faq" className="bg-slate-50 py-6">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white px-6 py-6 shadow-sm">
        <div className="mb-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base leading-7 text-gray-600">
            Find answers to the most common questions about Scholarship AI and
            how it helps you discover scholarship opportunities.
          </p>
        </div>
        <div>
            {/* Questions */}
          {faqs.map((faq) => (
            <div
              className="border-b border-gray-200 px-5 py-5 transition-colors duration-200 hover:bg-slate-50"
              onClick={() => toggleAccordion(faq.id)}
              key={faq.id} >

              <div className="flex items-center justify-between cursor-pointer">
                {/* Question */}
                <h3 className="text-base font-semibold text-gray-900 transition-all duration-500 ease-in-out">
                  {faq.question}
                </h3>
                {/* Toggle Icon */}
                {openQuestion === faq.id ? (
                  <Minus size={20} />
                ) : (
                  <Plus size={20} />
                )}
              </div>
              {/* Answer */}
              {openQuestion === faq.id && (
                <p className="mt-3 pr-8 leading-8 text-gray-600">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
