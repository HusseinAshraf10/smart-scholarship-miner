import React from 'react'
import { Brain , Bell , Globe , Bookmark , LayoutDashboard , Search,} from "lucide-react";

 const features = [
  {
    id: 1,
    title: "AI Scholarship Search",
    description:
      "Discover scholarships tailored to your profile using AI-powered recommendations.",
    icon: Search,
  },
  {
    id: 2,
    title: "Smart Matching",
    description:
      "Find opportunities based on your education, country, and interests.",
    icon: Brain,
  },
  {
    id: 3,
    title: "Save Favorites",
    description:
      "Bookmark scholarships and access them anytime.",
    icon: Bookmark,
  },
  {
    id: 4,
    title: "Deadline Alerts",
    description:
      "Receive reminders before scholarship deadlines.",
    icon: Bell,
  },
  {
    id: 5,
    title: "Personal Dashboard",
    description:
      "Manage your saved scholarships and search history.",
    icon: LayoutDashboard,
  },
  {
    id: 6,
    title: "Global Opportunities",
    description:
      "Explore scholarships from universities around the world.",
    icon: Globe,
  },
];
function KeyFeatures() {
  return (
    <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
                <h2 className="text-4xl font-bold text-gray-900"
                >Why Choose Scholarship AI?</h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600"
                >Powerful tools to simplify your scholarship journey.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                    <div className="group flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-10"
                    key={feature.id}>
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                            <feature.icon size={30} />
                        </div>
                        <h3 className="mb-3 text-xl font-semibold text-gray-900"
                        >{feature.title}</h3>
                        <p className="leading-7 text-gray-600 text-[15px]"
                        >{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default KeyFeatures