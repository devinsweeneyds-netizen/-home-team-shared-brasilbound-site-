import { marked } from 'marked';

// Define the guide mapping with lead's preferred slugs
const GUIDES = [
  { id: 'visa', file: 'visa-entry', title: 'Visa & Entry', description: 'Rules for US citizens.' },
  { id: 'safety', file: 'safety-security', title: 'Safety & Security', description: 'Practical safety advice.' },
  { id: 'currency', file: 'money-currency', title: 'Money & Currency', description: 'Managing your Reais.' },
  { id: 'transport', file: 'getting-around', title: 'Getting Around', description: 'Transportation guide.' },
  { id: 'health', file: 'health-medical', title: 'Health & Medical', description: 'Staying healthy.' },
  { id: 'culture', file: 'cultural-norms', title: 'Cultural Norms', description: 'Etiquette and local customs.' },
  { id: 'portuguese', file: 'essential-portuguese', title: 'Essential Portuguese', description: 'Must-know phrases.' },
  { id: 'connectivity', file: 'connectivity', title: 'Connectivity', description: 'SIM cards and internet.' },
  { id: 'food', file: 'food-drink', title: 'Food & Drink', description: 'What to eat and drink.' },
  { id: 'packing', file: 'packing-checklist', title: 'Packing Checklist', description: 'What to bring.' }
];

export const initRouter = (appElement: HTMLElement) => {
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    render(path);
    window.scrollTo(0, 0);
  };

  const fetchContent = async (filename: string) => {
    try {
      const response = await fetch(`/content/${filename}.md`);
      if (!response.ok) throw new Error('Content not found');
      const markdown = await response.text();
      return marked(markdown);
    } catch (err) {
      return `<p>Error loading content: ${err}</p>`;
    }
  };

  const renderHome = () => `
    <section class="hero" style="background-image: url('/assets/brasilbound-hero-beach.png')">
      <div class="hero-content">
        <h1>Navigate Brazil with Confidence</h1>
        <p>The comprehensive digital guide for American travelers.</p>
        <div class="cta-buttons">
          <a href="/guides" class="btn btn-primary" data-link>View All Guides</a>
          <a href="/guides/visa" class="btn btn-secondary" data-link>Visa Info</a>
        </div>
      </div>
    </section>

    <div class="container">
      <section class="affiliate-disclosure">
        Disclosure: This site contains affiliate links. We may receive a commission for purchases made through these links at no extra cost to you.
      </section>

      <section class="signup-section">
        <div class="signup-image">
          <img src="/assets/survival-kit-thumb.png" alt="Brazil Survival Kit">
        </div>
        <div class="signup-content">
          <h2>Get the Free Brazil Survival Kit</h2>
          <p>Don't leave without our comprehensive checklist! Includes essential Portuguese phrases, packing tips, and emergency contacts.</p>
          <!-- Placeholder Action for Mailchimp/ConvertKit -->
          <form class="signup-form" id="home-signup" action="https://example.us10.list-manage.com/subscribe/post?u=XXX&amp;id=YYY" method="POST">
            <input type="hidden" name="SOURCE" value="homepage">
            <input type="email" name="EMAIL" placeholder="Enter your email" required aria-label="Email address">
            <button type="submit" class="btn btn-primary">Send My Kit</button>
          </form>
          <div id="signup-message" class="signup-success" style="display: none;">
            Success! Your survival kit is on its way to your inbox. 
            <br><small><a href="/content/brazil-survival-kit.html" target="_blank">Click here to download directly</a></small>
          </div>
        </div>
      </section>

      <section class="features">
        <div class="feature-card">
          <img src="/assets/brasilbound-illustration-compass.png" alt="Compass" style="width: 64px; margin-bottom: 1rem;">
          <h3>Essential Info</h3>
          <p>Visas, safety, and money tips tailored for US citizens.</p>
          <a href="/guides/visa" class="btn-link" data-link>Learn More &rarr;</a>
        </div>
        <div class="feature-card">
          <img src="/assets/brasilbound-illustration-brazil.png" alt="Brazil" style="width: 64px; margin-bottom: 1rem;">
          <h3>Local Culture</h3>
          <p>Master basic Portuguese and understand local customs.</p>
          <a href="/guides/culture" class="btn-link" data-link>Learn More &rarr;</a>
        </div>
        <div class="feature-card">
          <h3>Transportation</h3>
          <p>How to navigate Brazilian cities and regions safely.</p>
          <a href="/guides/transport" class="btn-link" data-link>Learn More &rarr;</a>
        </div>
      </section>

      <section style="text-align: center; padding: var(--spacing-3xl) 0;">
        <h2>Ready for your adventure?</h2>
        <p>Explore our detailed guides below.</p>
        <a href="/guides" class="btn btn-primary" data-link>Explore All Guides</a>
      </section>
    </div>
  `;

  const renderGuidesIndex = () => `
    <div class="container" style="padding-top: var(--spacing-2xl)">
      <h1>Travel Guides</h1>
      <p>Expert advice for every part of your journey.</p>
      <div class="features">
        ${GUIDES.map(guide => `
          <div class="feature-card">
            <h3>${guide.title}</h3>
            <p>${guide.description}</p>
            <a href="/guides/${guide.id}" class="btn btn-secondary" data-link>Read Guide</a>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  const renderGuidePage = async (id: string) => {
    const guide = GUIDES.find(g => g.id === id);
    if (!guide) return `<h1>Guide Not Found</h1>`;

    const htmlContent = await fetchContent(guide.file);

    return `
      <div class="container" style="padding: var(--spacing-xl) 0">
        <nav class="breadcrumbs" style="margin-bottom: var(--spacing-lg); font-size: 0.875rem;">
          <a href="/" data-link>Home</a> &nbsp;/&nbsp; 
          <a href="/guides" data-link>Guides</a> &nbsp;/&nbsp; 
          <span style="color: var(--stone)">${guide.title}</span>
        </nav>
        <div class="guide-content-wrapper" style="max-width: 800px; margin: 0 auto;">
          <div class="markdown-body">
            ${htmlContent}
          </div>
          
          <section class="signup-section" style="margin-top: 4rem; border: 1px solid var(--cloud);">
            <div class="signup-content">
              <h3>Enjoying this guide?</h3>
              <p>Get the complete **Brazil Survival Kit** (PDF/Printable) for free. Essential checklists, phrases, and safety contacts in one place.</p>
              <form class="signup-form" action="https://example.us10.list-manage.com/subscribe/post?u=XXX&amp;id=YYY" method="POST">
                <input type="hidden" name="SOURCE" value="guide_${id}">
                <input type="email" name="EMAIL" placeholder="Your email address" required>
                <button type="submit" class="btn btn-primary">Download Kit</button>
              </form>
            </div>
          </section>

          <div class="affiliate-banner" style="background: var(--sandstone-beige); padding: 2rem; margin-top: 3rem; border-radius: 12px; text-align: center;">
            <h4>Travel Insurance is Essential</h4>
            <p>Protect your trip to Brazil with our recommended travel insurance partner.</p>
            <a href="#" class="btn btn-primary">Get a Quote</a>
          </div>
        </div>
      </div>
    `;
  };

  const render = async (path: string) => {
    appElement.innerHTML = `
      <nav>
        <div class="container nav-container">
          <a href="/" class="brand" data-link>
            <img src="/assets/brasilbound-logo-icon.png" alt="Icon">
            BrasilBound
          </a>
          <button class="mobile-menu-toggle">Menu</button>
          <div class="links">
            <a href="/" data-link>Home</a>
            <a href="/guides" data-link>Guides</a>
            <a href="/about" data-link>About</a>
            <a href="/contact" data-link>Contact</a>
          </div>
        </div>
      </nav>
      <main id="main-content">
        <div class="loading">Loading...</div>
      </main>
      <div id="popin-cta" class="popin-cta">
        <button class="popin-close">&times;</button>
        <div class="popin-content">
          <h4>Don't forget your Survival Kit!</h4>
          <p>Download our free Brazil Travel Checklist & Survival Kit.</p>
          <form id="popin-form" class="signup-form" style="margin-top: 0;" action="https://example.us10.list-manage.com/subscribe/post?u=XXX&amp;id=YYY" method="POST">
            <input type="hidden" name="SOURCE" value="popin">
            <input type="email" name="EMAIL" placeholder="Your email" required>
            <button type="submit" class="btn btn-primary btn-sm">Get Kit</button>
          </form>
          <div id="popin-success" style="display: none; color: var(--amazon-green); font-size: 0.875rem; font-weight: 600;">
            Sent! Check your email.
          </div>
        </div>
      </div>
      <footer>
        <div class="container">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 2rem;">
            <div>
              <img src="/assets/brasilbound-logo-full.png" alt="BrasilBound" style="height: 60px; margin-bottom: 1rem; filter: brightness(0) invert(1);">
              <p style="color: var(--cloud); max-width: 300px;">The definitive travel guide for American citizens exploring Brazil.</p>
            </div>
            <div>
              <h4 style="color: var(--white)">Quick Links</h4>
              <div class="footer-links">
                <a href="/" data-link>Home</a>
                <a href="/guides" data-link>Guides</a>
                <a href="/about" data-link>About</a>
                <a href="/contact" data-link>Contact</a>
              </div>
            </div>
          </div>
          <hr style="border: 0; border-top: 1px solid var(--stone); margin: 2rem 0;">
          <p>&copy; ${new Date().getFullYear()} BrasilBound. All rights reserved.</p>
        </div>
      </footer>
    `;

    const main = appElement.querySelector('#main-content')!;
    let content = '';

    if (path === '/' || path === '') {
      content = renderHome();
      document.title = 'BrasilBound | Navigate Brazil with Confidence';
    } else if (path === '/guides') {
      content = renderGuidesIndex();
      document.title = 'Travel Guides | BrasilBound';
    } else if (path.startsWith('/guides/')) {
      const id = path.split('/')[2];
      content = await renderGuidePage(id);
      const guide = GUIDES.find(g => g.id === id);
      document.title = `${guide?.title || 'Guide'} | BrasilBound`;
    } else if (path === '/about') {
      content = `<div class="container" style="padding: var(--spacing-3xl) 0"><h1>About BrasilBound</h1><p>BrasilBound is dedicated to helping American travelers navigate the beautiful country of Brazil with confidence and ease. Our guides are researched by experts and tailored specifically for US citizens.</p></div>`;
      document.title = 'About Us | BrasilBound';
    } else if (path === '/contact') {
      content = `<div class="container" style="padding: var(--spacing-3xl) 0"><h1>Contact Us</h1><p>Have questions about traveling to Brazil? We're here to help.</p><p>Email: hello@brasilbound.com</p></div>`;
      document.title = 'Contact | BrasilBound';
    } else {
      content = `<div class="container"><h1>404 - Page Not Found</h1><a href="/" data-link>Go back home</a></div>`;
      document.title = '404 - Not Found | BrasilBound';
    }

    main.innerHTML = content;

    // Handle Home Signup
    const homeForm = main.querySelector('#home-signup') as HTMLFormElement;
    if (homeForm) {
      homeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        homeForm.style.display = 'none';
        (main.querySelector('#signup-message') as HTMLElement).style.display = 'block';
      });
    }

    // Handle Pop-in
    const popin = appElement.querySelector('#popin-cta') as HTMLElement;
    const popinClose = popin.querySelector('.popin-close') as HTMLElement;
    const popinForm = popin.querySelector('#popin-form') as HTMLFormElement;

    popinClose.addEventListener('click', () => {
      popin.classList.remove('active');
    });

    popinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      popinForm.style.display = 'none';
      (popin.querySelector('#popin-success') as HTMLElement).style.display = 'block';
      setTimeout(() => popin.classList.remove('active'), 3000);
    });

    // Show pop-in on guide pages after 5 seconds
    if (path.startsWith('/guides/')) {
      setTimeout(() => {
        if (!popin.classList.contains('closed')) {
          popin.classList.add('active');
        }
      }, 5000);
    } else {
      popin.classList.remove('active');
    }

    // Re-attach event listeners
    appElement.querySelectorAll('[data-link]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
        if (href) navigate(href);
      });
    });

    const toggle = appElement.querySelector('.mobile-menu-toggle');
    const links = appElement.querySelector('.links');
    if (toggle && links) {
      toggle.addEventListener('click', () => {
        links.classList.toggle('active');
      });
    }
  };

  window.onpopstate = () => render(window.location.pathname);
  render(window.location.pathname);
};
