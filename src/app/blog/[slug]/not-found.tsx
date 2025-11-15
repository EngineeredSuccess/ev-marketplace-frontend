export default function NotFound() {
return (
<div style={{
minHeight: ‘100vh’,
background: ‘linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)’,
display: ‘flex’,
alignItems: ‘center’,
justifyContent: ‘center’,
padding: ‘20px’
}}>
<div style={{
background: ‘white’,
borderRadius: ‘20px’,
padding: ‘60px 40px’,
textAlign: ‘center’,
maxWidth: ‘500px’,
boxShadow: ‘0 8px 32px rgba(0, 0, 0, 0.1)’
}}>
<h1 style={{ fontSize: ‘48px’, marginBottom: ‘16px’ }}>404</h1>
<h2 style={{ fontSize: ‘24px’, color: ‘#1f2937’, marginBottom: ‘16px’ }}>
Post nie znaleziony
</h2>
<p style={{ color: ‘#6b7280’, marginBottom: ‘32px’ }}>
Przepraszamy, ale ten artykuł nie istnieje lub został usunięty.
</p>
<a
href=”/blog”
style={{
display: ‘inline-block’,
padding: ‘12px 24px’,
background: ‘#10b981’,
color: ‘white’,
borderRadius: ‘8px’,
textDecoration: ‘none’,
fontWeight: ‘600’
}}
>
← Powrót do bloga
</a>
</div>
</div>
);
}
