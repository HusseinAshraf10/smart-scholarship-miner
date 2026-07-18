import React from "react";
import { Rocket } from "lucide-react";

function CTA() {
  return (
    <section className="bg-slate-50 p-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between rounded-3xl bg-blue-50 px-12 py-8">

          {/* Left */}
          <div className="flex items-center gap-6">

            {/* Icon */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
              <Rocket
                size={38}
                className="rocket-float text-blue-600"
                strokeWidth={2.2}
              />
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Ready to Find Your Perfect Scholarship?
              </h2>

              <p className="mt-2 max-w-xl leading-7 text-gray-600">
                Join thousands of students who have found their dream
                opportunities with Scholarship AI Assistant.
              </p>
            </div>
          </div>

          {/* Button */}
          <button className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition-colors duration-300 hover:bg-blue-700">
            Start Your Journey →
          </button>

        </div>
      </div>
    </section>
  );
}

export default CTA;