import React from 'react'

function ContactForm () {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-3xl font-bold">Send Message</h2>
            <p className="mt-2 text-slate-600">Fields marked with * are required.</p>
            <form className="mt-8 space-y-5">
              <div>
              <label htmlFor="full-name" className="mb-2 block font-medium">Full Name *</label>
              <input className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
              id="full-name" name="fullName" type="text"   autoComplete="name" required/>
              </div>
              <div>
              <label htmlFor="email" className="mb-2 block font-medium">Email *</label>
              <input className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
              id="email" name="email" type="email" autoComplete="email" required/>
              </div>
              <div> 
              <label htmlFor="topic" className="mb-2 block font-medium">Topic *</label>
              <select className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
              id="topic" name="topic"  defaultValue="" required>
                <option value="" disabled>Select a topic</option>
                <option value="trip-booking">Trip Booking</option>
                <option value="offer-request">Offer Request</option>
                <option value="custom-plan">Custom Plan</option>
                <option value="general-question">General Question</option>
              </select>
              </div>
              <div> 
              <label htmlFor="message" className="mb-2 block font-medium">Message *</label>
              <textarea   className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
              id="message" name="message" minLength="10" rows={6} required></textarea>
              </div>
              <button  className="w-full rounded-xl bg-sky-500 py-3 font-semibold text-white transition hover:bg-sky-600"
              type="submit">Send Message</button>
            </form>
    </section>
  )}
export default ContactForm