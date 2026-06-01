export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, #080808, #000)',
      borderTop: '1px solid rgba(255,215,0,0.08)',
      padding: '50px 40px 24px',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap',
      }}>
        <div style={{ maxWidth: 380 }}>
          <img src="/images/logo_horizontal.png" alt="Monarch Casino"
            style={{ height: 48, maxWidth: 220, objectFit: 'contain', marginBottom: 16 }} />
          <p style={{ color: '#666', fontSize: 13, lineHeight: 1.7 }}>
            This is a UI demo showcase. All games are for interface demonstration only.
            No real gambling or real-money transactions are possible.
            Must be 21+ to view this content.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 60 }}>
          {[
            { title: 'COMPANY', links: ['About', 'Careers', 'Press', 'Blog'] },
            { title: 'SUPPORT', links: ['FAQ', 'Live Chat', 'Contact', 'Feedback'] },
            { title: 'LEGAL', links: ['Terms of Service', 'Privacy Policy', 'Responsible Gaming', 'AML Policy'] },
          ].map((group) => (
            <div key={group.title} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ color: 'var(--gold)', fontSize: 12, fontWeight: 700, letterSpacing: 2, marginBottom: 4 }}>
                {group.title}
              </div>
              {group.links.map((link) => (
                <a key={link} href="#" style={{ color: '#666', fontSize: 13, transition: 'var(--transition)' }}>
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div style={{
        maxWidth: 1200, margin: '30px auto 0', paddingTop: 20,
        borderTop: '1px solid rgba(255,215,0,0.06)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 12,
      }}>
        <div style={{ color: '#444', fontSize: 12 }}>
          © 2026 MONARCH CASINO. UI Demo Only. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 18 }}>
          {['💬', '🐦', '📷', '🎵', '💜'].map((s, i) => (
            <span key={i} style={{ opacity: 0.4, cursor: 'pointer', transition: 'var(--transition)' }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
