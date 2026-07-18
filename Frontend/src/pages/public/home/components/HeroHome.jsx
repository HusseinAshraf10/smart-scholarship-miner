import React from 'react'
import image from "../../../../assets/images/hero.png"
import "./home.css";
import { GraduationCap, Brain,Globe } from "lucide-react";
const stats = [
  {
    number: "10,000+",
    title: "Scholarships Found",
    icon: <GraduationCap />,
  },
  {
    number: "95%",
    title: "Accuracy Rate",
    icon: <Brain />,
  },
  {
    number: "50+",
    title: "Countries Covered",
    icon: <Globe />,
  },
];

function HeroHome() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex  items-center justify-between gap-12"> 
            <div> 
            <p className="mb-6 inline-block rounded-full bg-blue-100
              px-4 py-2 text-sm font-medium text-blue-600"
            >Ai Powered Scholarship Discovery</p>

            <h1 className="text-5xl font-bold leading-tight text-gray-900"
            >Find Your Perfect <br />
            <span className="text-blue-600"
            >Scholarship Match</span></h1>

            <p className="mt-6 max-w-lg text-lg leading-7 text-gray-600"
            >AI-powered search and analysis to help you discover scholership opportunities that match your profile and goals.</p>
            <div className="mt-8 flex gap-4">

                <button className=" cursor-pointer rounded-lg bg-blue-600 px-6 py-3 font-medium
                 text-white transition-all duration-200 hover:bg-blue-700">
                    Start Searching</button>

                <button className=" cursor-pointer rounded-lg border border-gray-300 px-6 py-3 font-medium
                 text-gray-700 transition-all duration-200 hover:border-blue-600 hover:text-blue-600">
                    Learn More</button>
            </div>
            </div>
        <div className="max-w-lg"> 
            <img src={image} alt="" className="hero-image w-full"/>
        </div>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-6">
        {stats.map((item) => (
            <div key={item.title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm ">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <div className="text-blue-600">
                    {item.icon}
                </div>
                </div>
                <h3 className="mt-4 text-3xl font-bold text-blue-600"
                >{item.number}</h3>
                <p className="mt-2 text-gray-600">{item.title}</p>
            
            </div>
        ))}
        </div>
    </section>
  )
}

export default HeroHome