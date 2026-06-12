import './InfoScreen.css'

function InfoScreen() {
  return (
    <div className="info-container">
      {/* Decorative background shapes */}
      <div className="bg-decoration">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
      </div>

      <header className="info-header">
        <div className="logo-brand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.82 0 3.53-.5 5-1.35" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
            <path d="M8.5 12.5l3 3 7-8" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
          <span>TaggySustain</span>
        </div>
        <h1>Sobre a Solução</h1>
        <p className="subtitle">Entenda como transformamos mobilidade em impacto positivo.</p>
      </header>

      <main className="info-content">
        {/* O que e */}
        <section className="card main-card" id="about-section">
          <div className="card-accent"></div>
          <h2>O quê é a Taggy?</h2>
          <p>
            A Taggy e uma solução tecnológica de pagamento eletrônico que utiliza um adesivo (TAG) colado no para-brisa do veículo. Ela permite a abertura de cancelas de forma automática através de radiofrequência, eliminando a necessidade de manusear dinheiro ou cartões no momento da passagem.
          </p>
        </section>

        {/* Vantagens */}
        <section className="advantages-section" id="advantages-section">
          <h2>Vantagens de usar Edenred / Taggy</h2>
          <div className="advantages-grid">
            <div className="advantage-card">
              <div className="icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <h3>Agilidade e Economia</h3>
              <p>Passagem automática em 100% das rodovias pedagiadas e em milhares de estacionamentos em todo o Brasil, sem filas e com pagamento centralizado.</p>
            </div>

            <div className="advantage-card">
              <div className="icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"/>
                  <line x1="12" y1="20" x2="12" y2="4"/>
                  <line x1="6" y1="20" x2="6" y2="14"/>
                  <line x1="2" y1="20" x2="22" y2="20"/>
                </svg>
              </div>
              <h3>Gestão Simplificada</h3>
              <p>Controle total dos gastos de pedagio integrados a plataforma Edenred, facilitando a conciliação financeira e o relatório de frotas.</p>
            </div>

            <div className="advantage-card">
              <div className="icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                  <path d="M2 12h20"/>
                </svg>
              </div>
              <h3>Sustentabilidade Ativa</h3>
              <p>Acesso exclusivo ao programa Taggy Sustain para gerenciar e compensar a pegada de carbono das suas viagens.</p>
            </div>
          </div>
        </section>

        {/* Calculadora e Fontes */}
        <div className="bottom-grid">
          <section className="card calculator-card" id="calculator-section">
            <div className="card-accent"></div>
            <h2>Calculadora TaggySustain</h2>
            <p>
              É uma ferramenta inteligente que utiliza os dados dos trajetos percorridos (distância e localização dos pedágios) para estimar o volume de CO2 emitido pelo veículo.
            </p>
            <div className="objective-box">
              <div className="objective-label">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
                <strong>Objetivo</strong>
              </div>
              <p>Transformar dados de viagem em indicadores de impacto ambiental, permitindo que empresas e motoristas visualizem sua pegada ecológica e participem de projetos de preservação e reflorestamento para neutralizar essas emissões.</p>
            </div>
          </section>

          <section className="card sources-card" id="sources-section">
            <h2>Fontes do Cálculo</h2>
            <div className="status-container">
              <div className="spinner"></div>
              <span className="status-badge">Processo em andamento</span>
            </div>
          </section>
        </div>
      </main>

      <footer className="info-footer">
        <p>Edenred Taggy &mdash; Mobilidade inteligente e sustentável</p>
      </footer>
    </div>
  )
}

export default InfoScreen
