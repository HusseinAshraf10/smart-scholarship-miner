import React from 'react'
import { whyUs } from '../../../data/whyUs'
import Container from '../../../components/layout/Container'
function WhyUs() {
  return (
    <section>
        <Container> 
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {whyUs.map(item =>{return(
            <div className="rounded-2xl bg-white p-6 text-center shadow-md transition hover:-translate-y-2" key = {item.id}>
                <img className="mx-auto mb-4 w-16" src={item.image} alt={item.alt} />
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
            </div>
        )})}
        </div>
        </Container>
    </section>
  )
}

export default WhyUs