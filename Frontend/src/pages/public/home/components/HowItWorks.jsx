import React from "react";
import { UserRound, Sparkles, SearchCheck, ArrowRight } from "lucide-react";

const howItWorks = [
  {
    id: 1,
    title: "Tell Us About You",
    description:
      "Share your academic background, interests, goals, and study preferences.",
    icon: UserRound,
  },
  {
    id: 2,
    title: "AI Finds the Best Matches",
    description:
      "Our AI analyzes thousands of scholarships and ranks the best opportunities for you.",
    icon: Sparkles,
  },
  {
    id: 3,
    title: "Review & Apply",
    description:
      "Browse personalized recommendations and apply through the official scholarship websites.",
    icon: SearchCheck,
  },
];
function HowItWorks() {
  return (
    <section className="bg-slate-50">
        <div  className="mx-auto max-w-7xl px-6 py-24"> 
        <div className="mb-20 text-center">
            <h2 className="text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Finding your perfect scholarship is simple with our AI-powered process
            </p>
        </div>
        <div className="relative mt-20">
        {/* Timeline Line */}
        <div className="absolute top-5 left-[10.6%] right-[10.6%] h-1 rounded-full bg-blue-100"></div>{" "}
        {/* Steps */}
        <div className="relative flex justify-between">
          {howItWorks.map((item) => (
            <div className="flex w-72 flex-col items-center text-center"
              key={item.id}>
              {/* Number */}
              <div className="relative z-20 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                {item.id}
              </div>
              {/* Vertical Line */}
              <div className="h-10 w-1 bg-blue-100"></div>
              {/* Icon */}
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600 shadow-sm">
                <item.icon size={36} />
              </div>
              {/* Title */}
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                {item.title}</h3>
              {/* Description */}
              <p className="leading-7 text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}

export default HowItWorks;
