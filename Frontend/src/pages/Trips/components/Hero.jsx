import React from "react";
import { stats } from "../../../data/stats.js";

function Hero() {
    console.log(stats);
  return (
    <section className="py-20">
      <p className="mb-3 text-sky-500 font-semibold">Curated packages for every travel style</p>
      <h1 className="text-5xl font-bold">Featured Trips</h1>
      <p className="mt-4 max-w-2xl text-slate-600">
        Compare routes, trip length, and pricing, then book directly from each
        package card
      </p>
      <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {stats.map(item =>{
            return(
                <div className="rounded-2xl bg-white p-6 text-center shadow-md" key={item.id}>
                <strong className="block text-3xl font-bold text-sky-600">{item.value}</strong>
                <span className="mt-2 block text-slate-600">{item.label}</span>
                </div>
            )
        })}
      </div>
    </section>
  );
}

export default Hero;
