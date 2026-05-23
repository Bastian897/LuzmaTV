// App.jsx — top-level
function App() {
  const onNav = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Header onNav={onNav} live={true} />
      <Hero
        onWatch={() => onNav('envivo')}
        onPrograms={() => onNav('programas')}
      />
      <LivePlayer />
      <Programs />
      <Episodes />
      <HostsRow />
      <Schedule />
      <Platforms />
      <Community />
      <Contacto />
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
