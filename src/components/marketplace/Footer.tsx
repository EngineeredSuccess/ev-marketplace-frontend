// components/marketplace/Footer.tsx
import React from ‘react’;
import {
Car,
Mail,
Phone,
MapPin,
Facebook,
Twitter,
Linkedin,
Instagram,
Youtube,
Shield,
Heart,
ExternalLink,
ArrowRight,
Zap,
Battery,
TrendingUp
} from ‘lucide-react’;

interface FooterProps {
onNavigate?: (page: string) => void;
className?: string;
}

const Footer: React.FC<FooterProps> = ({
onNavigate,
className = ‘’
}) => {
const currentYear = new Date().getFullYear();

const footerSections = {
marketplace: {
title: ‘Marketplace’,
links: [
{ label: ‘Przeglądaj pojazdy’, href: ‘/browse’, icon: Car },
{ label: ‘Sprzedaj pojazd’, href: ‘/sell’, icon: TrendingUp },
{ label: ‘Jak to działa’, href: ‘/how-it-works’, icon: Zap },
{ label: ‘Cennik’, href: ‘/pricing’, icon: Battery }
]
},
resources: {
title: ‘Zasoby’,
links: [
{ label: ‘Blog EV’, href: ‘/blog’, icon: ExternalLink },
{ label: ‘Przewodnik kupna’, href: ‘/guide’, icon: ExternalLink },
{ label: ‘Kalkulator kosztów’, href: ‘/calculator’, icon: ExternalLink },
{ label: ‘Mapa ładowarek’, href: ‘/charging-map’, icon: ExternalLink }
]
},
support: {
title: ‘Pomoc’,
links: [
{ label: ‘Centrum pomocy’, href: ‘/help’, icon: ExternalLink },
{ label: ‘Kontakt’, href: ‘/contact’, icon: Mail },
{ label: ‘FAQ’, href: ‘/faq’, icon: ExternalLink },
{ label: ‘Bezpieczeństwo’, href: ‘/safety’, icon: Shield }
]
},
legal: {
title: ‘Informacje prawne’,
links: [
{ label: ‘Regulamin’, href: ‘/terms’, icon: ExternalLink },
{ label: ‘Polityka prywatności’, href: ‘/privacy’, icon: ExternalLink },
{ label: ‘Polityka cookies’, href: ‘/cookies’, icon: ExternalLink },
{ label: ‘RODO’, href: ‘/gdpr’, icon: ExternalLink }
]
}
};

const socialLinks = [
{
platform: ‘Facebook’,
href: ‘https://facebook.com/ivimarket’,
icon: Facebook,
color: ‘#1877f2’
},
{
platform: ‘Twitter’,
href: ‘https://twitter.com/ivimarket’,
icon: Twitter,
color: ‘#1da1f2’
},
{
platform: ‘LinkedIn’,
href: ‘https://linkedin.com/company/ivimarket’,
icon: Linkedin,
color: ‘#0077b5’
},
{
platform: ‘Instagram’,
href: ‘https://instagram.com/ivimarket’,
icon: Instagram,
color: ‘#e4405f’
},
{
platform: ‘YouTube’,
href: ‘https://youtube.com/@ivimarket’,
icon: Youtube,
color: ‘#ff0000’
}
];

const contactInfo = {
email: ‘kontakt@ivimarket.pl’,
phone: ‘+48 123 456 789’,
address: ‘ul. Elektryczna 1, 00-001 Warszawa, Polska’
};

const handleLinkClick = (href: string, e: React.MouseEvent) => {
e.preventDefault();
if (onNavigate && href.startsWith(’/’)) {
onNavigate(href.substring(1));
} else if (href.startsWith(‘http’)) {
window.open(href, ‘_blank’, ‘noopener noreferrer’);
}
};

return (
<footer className={className} style={{
background: ‘linear-gradient(135deg, #1f2937 0%, #111827 100%)’,
color: ‘white’,
marginTop: ‘auto’
}}>
{/* Newsletter Section */}
<div style={{
background: ‘linear-gradient(135deg, #10b981 0%, #059669 100%)’,
padding: ‘40px 0’
}}>
<div style={{ maxWidth: ‘1200px’, margin: ‘0 auto’, padding: ‘0 20px’ }}>
<div style={{
display: ‘grid’,
gridTemplateColumns: ‘1fr auto’,
gap: ‘32px’,
alignItems: ‘center’,
‘@media (max-width: 768px)’: {
gridTemplateColumns: ‘1fr’,
textAlign: ‘center’
}
}}>
<div>
<h3 style={{
fontSize: ‘24px’,
fontWeight: ‘800’,
marginBottom: ‘8px’,
color: ‘white’
}}>
Bądź na bieżąco z rynkiem EV
</h3>
<p style={{
fontSize: ‘16px’,
color: ‘rgba(255, 255, 255, 0.9)’,
margin: ‘0’
}}>
Otrzymuj najnowsze oferty, porady i aktualności ze świata pojazdów elektrycznych
</p>
</div>
<div style={{ display: ‘flex’, gap: ‘12px’, minWidth: ‘300px’ }}>
<input
type=“email”
placeholder=“Twój adres email”
style={{
flex: 1,
padding: ‘12px 16px’,
border: ‘none’,
borderRadius: ‘8px’,
fontSize: ‘14px’,
outline: ‘none’
}}
/>
<button
style={{
background: ‘rgba(255, 255, 255, 0.9)’,
color: ‘#10b981’,
border: ‘none’,
padding: ‘12px 20px’,
borderRadius: ‘8px’,
fontSize: ‘14px’,
fontWeight: ‘600’,
cursor: ‘pointer’,
transition: ‘all 0.3s ease’,
display: ‘flex’,
alignItems: ‘center’,
gap: ‘8px’
}}
onMouseEnter={(e) => {
e.currentTarget.style.background = ‘white’;
e.currentTarget.style.transform = ‘translateY(-1px)’;
}}
onMouseLeave={(e) => {
e.currentTarget.style.background = ‘rgba(255, 255, 255, 0.9)’;
e.currentTarget.style.transform = ‘translateY(0)’;
}}
>
Zapisz się
<ArrowRight style={{ height: ‘14px’, width: ‘14px’ }} />
</button>
</div>
</div>
</div>
</div>

```
  {/* Main Footer Content */}
  <div style={{ padding: '60px 0 40px 0' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', 
        gap: '40px',
        marginBottom: '60px',
        '@media (max-width: 1024px)': {
          gridTemplateColumns: '1fr 1fr 1fr'
        },
        '@media (max-width: 768px)': {
          gridTemplateColumns: '1fr 1fr'
        },
        '@media (max-width: 480px)': {
          gridTemplateColumns: '1fr'
        }
      }}>
        {/* Brand Section */}
        <div style={{ gridColumn: '1 / 2' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: '12px',
              padding: '8px',
              marginRight: '12px'
            }}>
              <Car style={{ height: '24px', width: '24px', color: 'white' }} />
            </div>
            <div>
              <span style={{ 
                fontSize: '20px', 
                fontWeight: 'bold', 
                color: 'white'
              }}>
                iVi Market
              </span>
              <div style={{
                fontSize: '10px',
                color: '#9ca3af',
                fontWeight: '500',
                letterSpacing: '0.5px'
              }}>
                ELECTRIC VEHICLES
              </div>
            </div>
          </div>
          <p style={{ 
            color: '#9ca3af', 
            lineHeight: '1.6', 
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            Największy marketplace pojazdów elektrycznych w Polsce. 
            Znajdź idealny EV lub sprzedaj swój pojazd bezpiecznie i szybko.
          </p>
          
          {/* Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a 
              href={`mailto:${contactInfo.email}`}
              style={{
                color: '#9ca3af',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#10b981';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#9ca3af';
              }}
            >
              <Mail style={{ height: '14px', width: '14px' }} />
              {contactInfo.email}
            </a>
            <a 
              href={`tel:${contactInfo.phone}`}
              style={{
                color: '#9ca3af',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#10b981';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#9ca3af';
              }}
            >
              <Phone style={{ height: '14px', width: '14px' }} />
              {contactInfo.phone}
            </a>
            <div style={{
              color: '#9ca3af',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              fontSize: '14px'
            }}>
              <MapPin style={{ height: '14px', width: '14px', marginTop: '2px', flexShrink: 0 }} />
              {contactInfo.address}
            </div>
          </div>
        </div>

        {/* Footer Links Sections */}
        {Object.entries(footerSections).map(([key, section]) => (
          <div key={key}>
            <h4 style={{ 
              color: 'white', 
              fontSize: '16px', 
              fontWeight: '600', 
              marginBottom: '16px'
            }}>
              {section.title}
            </h4>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              {section.links.map((link, index) => {
                const Icon = link.icon;
                return (
                  <li key={index}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(link.href, e)}
                      style={{
                        color: '#9ca3af',
                        textDecoration: 'none',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.3s ease',
                        padding: '4px 0'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#10b981';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#9ca3af';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <Icon style={{ height: '12px', width: '12px' }} />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Social Media & Bottom Bar */}
      <div style={{
        borderTop: '1px solid #374151',
        paddingTop: '32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <p style={{ 
            color: '#9ca3af', 
            fontSize: '14px', 
            margin: '0'
          }}>
            © {currentYear} iVi Market. Wszystkie prawa zastrzeżone.
          </p>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px',
            color: '#9ca3af',
            fontSize: '12px'
          }}>
            Stworzone z <Heart style={{ height: '12px', width: '12px', color: '#ef4444' }} /> w Polsce
          </div>
        </div>

        {/* Social Media Icons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.platform}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.platform}
                style={{
                  background: '#374151',
                  padding: '8px',
                  borderRadius: '8px',
                  color: '#9ca3af',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = social.color;
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#374151';
                  e.currentTarget.style.color = '#9ca3af';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Icon style={{ height: '16px', width: '16px' }} />
              </a>
            );
          })}
        </div>
      </div>

      {/* Trust Badges */}
      <div style={{
        marginTop: '32px',
        padding: '24px',
        background: 'rgba(16, 185, 129, 0.1)',
        borderRadius: '12px',
        border: '1px solid rgba(16, 185, 129, 0.2)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '32px',
          flexWrap: 'wrap'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            color: '#10b981',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            <Shield style={{ height: '16px', width: '16px' }} />
            Bezpieczne transakcje
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            color: '#10b981',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            <Car style={{ height: '16px', width: '16px' }} />
            Zweryfikowani sprzedawcy
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            color: '#10b981',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            <Battery style={{ height: '16px', width: '16px' }} />
            Specjaliści EV
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
```

);
};

export default Footer;