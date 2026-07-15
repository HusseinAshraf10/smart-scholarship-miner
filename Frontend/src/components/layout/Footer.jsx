import Container from './Container.jsx';

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <Container>
        <div className="flex items-center justify-center py-6">
          <p>
            © 2026{" "}
            <span className="font-bold text-cyan-400">SkyWay Travel</span>. All
            rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
