import locationIcon from "../../../assets/images/location.png";
import phoneIcon from "../../../assets/images/phone.png";
import emailIcon from "../../../assets/images/email.png";

function ContactInfo() {
  return (
    <section className="rounded-3xl bg-slate-900 p-8 text-white">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Let us plan your next trip</h2>

          <p className="mt-4 text-slate-300">
            Share where you want to go, when you plan to travel, and your budget
            range. Our team will suggest the best options.
          </p>
        </div>

        <div className="space-y-5 pt-2">
          <div className="flex items-center gap-4 rounded-2xl bg-slate-800 p-4">
            <img src={locationIcon} alt="Location icon" className="h-10 w-10" />

            <div>
              <h3 className="font-semibold">Address</h3>
              <span className="text-slate-300">
                467 Honeymoon Street, Maldives
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-slate-800 p-4">
            <img src={phoneIcon} alt="Phone icon" className="h-10 w-10" />

            <div>
              <h3 className="font-semibold">Phone</h3>
              <a href="tel:+1234567890"
                className="text-slate-300 transition hover:text-sky-400">
                +1 234 567 890</a>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-slate-800 p-4">
            <img src={emailIcon} alt="Email icon" className="h-10 w-10" />

            <div>
              <h3 className="font-semibold">Email</h3>
              <a href="mailto:info@skyway.com"
                className="text-slate-300 transition hover:text-sky-400">
                info@skyway.com </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactInfo;
