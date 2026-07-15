import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";
import Hero from "./components/Hero";
import Container from "../../components/layout/Container.jsx";
import CTASection from "../../components/shared/CTASection.jsx";
function Contact() {
  return (
    <section className="py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2"></div>
        <Hero />
        <ContactInfo />
        <ContactForm />
        <CTASection
          h3={"Need quick inspiration before booking?"}
          p={
            "Browse our latest trips and offers, then come back here with one click."
          }
          btn={"View Trips"}
          btn={"View Offers"}
        />
      </Container>
    </section>
  );
}

export default Contact;
