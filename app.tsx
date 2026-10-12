import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, Clock3, MapPin, Menu, MessageCircle, X } from 'lucide-react';
import { business, isConfigured, mapsLink, orderLink } from './site-config';

const products = [
  {
    number: '01',
    name: 'Bolo de brigadeiro',
    description: 'Massa fofinha de chocolate, recheio cremoso e cobertura generosa de brigadeiro.',
    image: '/images/bolo-chocolate.jpg',
    alt: 'Fatia de bolo de chocolate com cobertura cremosa de brigadeiro',
  },
  {
    number: '02',
    name: 'Torta de limão',
    description: 'Acidez na medida, creme aveludado e merengue dourado feito à mão.',
    image: '/images/torta-limao.jpg',
    alt: 'Torta de limão com merengue dourado sobre prato artesanal',
  },
  {
    number: '03',
    name: 'Docinhos da casa',
    description: 'Brigadeiros e beijinhos enrolados um a um. O detalhe que muda a festa.',
    image: '/images/docinhos.jpg',
    alt: 'Brigadeiros e beijinhos artesanais dispostos em uma travessa',
  },
];

function Photo({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div className={`photo-fallback ${className}`} role="img" aria-label={alt}>
      <span>Arle<br /><i>feito com carinho</i></span>
    </div>;
  }
  return <img className={className} src={src} alt={alt} loading={src.includes('hero') ? 'eager' : 'lazy'} onError={() => setFailed(true)} />;
}

function Brand({ footer = false }: { footer?: boolean }) {
  return <a href="#inicio" className={`brand${footer ? ' footer-brand-link' : ''}`} aria-label="Arle Confeitaria — início">
    <span className="brand-mark" aria-hidden="true">a</span>
    <span><span className="brand-name">arle</span><span className="brand-sub">confeitaria</span></span>
  </a>;
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    document.title = 'Arle Confeitaria | Um carinho em forma de doce';
    document.documentElement.lang = 'pt-BR';
    const description = 'Bolos, tortas e doces feitos com carinho na Arle Confeitaria. Encomende pelo WhatsApp e venha nos visitar.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
    let theme = document.querySelector('meta[name="theme-color"]');
    if (!theme) {
      theme = document.createElement('meta');
      theme.setAttribute('name', 'theme-color');
      document.head.appendChild(theme);
    }
    theme.setAttribute('content', '#f5f0e5');
    const nodes = document.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const nav = [
    { href: '#cardapio', text: 'Cardápio' },
    { href: '#nossa-casa', text: 'Nossa casa' },
    { href: '#visite', text: 'Onde estamos' },
  ];

  return <main className="arle-site" id="inicio">
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav id="primary-navigation" className={`nav-links${menuOpen ? ' open' : ''}`} aria-label="Navegação principal">
          {nav.map((item) => <a href={item.href} key={item.href} onClick={closeMenu} data-testid={`link-nav-${item.text.toLowerCase().replaceAll(' ', '-')}`}>{item.text}</a>)}
          <a className="nav-order" href={orderLink()} target="_blank" rel="noreferrer" onClick={closeMenu} data-testid="link-nav-encomendar">Encomendar <ArrowRight size={15} /></a>
        </nav>
      </div>
    </header>

    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy reveal">
        <div className="eyebrow hero-kicker">Uma confeitaria de bairro</div>
        <h1 id="hero-title">Um carinho<br />em forma de <em>doce.</em></h1>
        <p className="hero-description">Bolos feitos com tempo, doces para dividir — e aquele motivo a mais para deixar o dia mais gostoso.</p>
        <div className="hero-actions">
          <a className="button-primary" href="#cardapio" data-testid="link-ver-cardapio">Conheça o cardápio <ArrowDown size={15} /></a>
          <a className="text-link" href={orderLink()} target="_blank" rel="noreferrer" data-testid="link-pedir-whatsapp">Faça sua encomenda</a>
        </div>
        <div className="hero-note"><span aria-hidden="true">a</span><span>Pequenos momentos também merecem bolo.</span></div>
      </div>
      <div className="hero-image-wrap reveal reveal-delay-1">
        <Photo src="/images/hero-torta.jpg" alt="Bolo artesanal de morango com camadas de creme fresco" className="hero-image" />
        <span className="image-caption">feito hoje, para o seu hoje</span>
        <span className="side-seal" aria-label="Feito à mão, todos os dias">feito à mão<br />todos os dias</span>
      </div>
    </section>

    <div className="ticker" aria-label="Feito com carinho, fresquinho todos os dias, para compartilhar">
      <div className="ticker-track" aria-hidden="true">
        {Array.from({ length: 4 }, (_, i) => <span key={i}>feito com carinho <b className="ticker-dot">✳</b> fresquinho todos os dias <b className="ticker-dot">✳</b> para compartilhar <b className="ticker-dot">✳</b> um doce de cada vez <b className="ticker-dot">✳</b></span>)}
      </div>
    </div>

    <section className="section menu-section" id="cardapio" aria-labelledby="menu-title">
      <div className="section-inner">
        <div className="section-heading reveal">
          <div><div className="eyebrow" style={{ color: 'var(--wine)' }}>Da nossa cozinha</div><h2 id="menu-title" className="serif">Um pedaço<br />de felicidade.</h2></div>
          <p>Receitas queridas, ingredientes de verdade e o cuidado que dá para sentir em cada garfada.</p>
        </div>
        <div className="products-grid">
          {products.map((product, i) => <article className={`product-card reveal${i ? ` reveal-delay-${i}` : ''}`} key={product.number} data-testid={`card-product-${product.number}`}>
            <div className="product-photo-wrap"><Photo src={product.image} alt={product.alt} className="product-photo" /><span className="product-index">{product.number}</span></div>
            <div className="product-info">
              <div><h3>{product.name}</h3><p>{product.description}</p></div>
              <a className="product-order" href={orderLink(product.name)} target="_blank" rel="noreferrer" aria-label={`Encomendar ${product.name} pelo WhatsApp`} data-testid={`link-encomendar-${product.number}`}>Encomendar</a>
            </div>
          </article>)}
        </div>
        <div className="menu-foot reveal"><span><strong>Tem um sabor em mente?</strong> Vamos preparar para você.</span><a className="text-link" href={orderLink()} target="_blank" rel="noreferrer" data-testid="link-cardapio-whatsapp">Converse com a gente <ArrowRight size={14} /></a></div>
      </div>
    </section>

    <section className="section story-section" id="nossa-casa" aria-labelledby="story-title">
      <div className="section-inner story-layout">
        <div className="story-art reveal">
          <Photo src="/images/docinhos.jpg" alt="Docinhos feitos à mão na cozinha da Arle" className="story-photo" />
          <span className="story-stamp">simples assim,<br />feito com afeto</span>
        </div>
        <div className="story-copy reveal reveal-delay-1">
          <div className="eyebrow">Uma pausa no dia</div>
          <h2 id="story-title">A vida acontece<br />entre uma fatia<br />e outra.</h2>
          <p>A Arle nasceu para fazer parte da vida como ela é: o café passado sem pressa, a visita que chegou, a comemoração de terça-feira. Tudo sai da nossa cozinha em pequenos lotes, com ingredientes de verdade e um tantinho a mais de cuidado.</p>
          <p>Porque doce bom não precisa de grande ocasião. Às vezes, ele é a ocasião.</p>
          <div className="story-signature">Com carinho, Arle</div>
        </div>
      </div>
    </section>

    <section className="section visit-section" id="visite" aria-labelledby="visit-title">
      <div className="section-inner visit-layout">
        <div className="visit-copy reveal">
          <div className="eyebrow">Vai ser bom receber você</div>
          <h2 id="visit-title">Tem sempre um doce esperando.</h2>
          <p>Passa para um café, escolhe seu favorito ou já combina uma encomenda com a gente.</p>
          <dl className="visit-details">
            <div className="visit-detail"><dt><MapPin size={14} /> Endereço</dt><dd>{business.address}</dd></div>
            <div className="visit-detail"><dt><Clock3 size={14} /> Horários</dt><dd>{business.hours}</dd></div>
            <div className="visit-detail"><dt><MessageCircle size={14} /> Encomendas</dt><dd>{isConfigured(business.whatsappNumber) ? `WhatsApp: +${business.whatsappNumber}` : 'WhatsApp: [INSERIR NÚMERO COM DDI + DDD]. Chame a gente; será um prazer ajudar.'}</dd></div>
          </dl>
          <a className="button-primary" href={orderLink()} target="_blank" rel="noreferrer" data-testid="link-encomenda-visita">Fale com a Arle <ArrowRight size={15} /></a>
        </div>
        <div className="map-panel reveal reveal-delay-1" role="group" aria-label="Localização da Arle Confeitaria">
          <div className="map-card">
            <span className="map-pin" aria-hidden="true">a</span>
            <h3>Arle Confeitaria</h3>
            <p>{isConfigured(business.address) ? business.address : 'Endereço da confeitaria — informação a atualizar'}</p>
            <a href={mapsLink()} target="_blank" rel="noreferrer" data-testid="link-como-chegar">Como chegar no mapa <ArrowRight size={13} /></a>
          </div>
        </div>
      </div>
    </section>

    <section className="cta-band" aria-labelledby="cta-title">
      <div className="eyebrow">Uma vontade boa dessas</div>
      <h2 id="cta-title" className="serif">Não precisa guardar<br />para depois.</h2>
      <p>Escolha seu doce. A gente cuida do resto.</p>
      <a className="button-primary" href={orderLink()} target="_blank" rel="noreferrer" data-testid="link-cta-whatsapp">Encomende pelo WhatsApp <ArrowRight size={15} /></a>
    </section>

    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand"><Brand footer /></div>
        <div className="footer-meta">
          <div>Um carinho em forma de doce.</div>
          <div>{isConfigured(business.instagramUrl) ? <a href={business.instagramUrl} target="_blank" rel="noreferrer" data-testid="link-instagram">Acompanhe a Arle no Instagram</a> : 'Instagram: [INSERIR LINK DO PERFIL]'}</div>
          <div>© {new Date().getFullYear()} Arle Confeitaria</div>
        </div>
      </div>
    </footer>
    <a className="button-primary mobile-order" href={orderLink()} target="_blank" rel="noreferrer" data-testid="link-mobile-whatsapp">Encomendar pelo WhatsApp <ArrowRight size={16} /></a>
  </main>;
}

function App() {
  return <Home />;
}

export default App;
