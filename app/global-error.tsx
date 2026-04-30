'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Patrick Hand', cursive, sans-serif",
          backgroundColor: '#fdfbf7',
          color: '#2d2d2d',
        }}
      >
        <div
          style={{
            maxWidth: '480px',
            width: '100%',
            padding: '32px',
            border: '3px solid #2d2d2d',
            borderRadius: '45px 255px 35px 255px / 255px 35px 225px 45px',
            boxShadow: '4px 4px 0 0 #2d2d2d',
            backgroundColor: '#fff',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              border: '2px dashed #2d2d2d',
              backgroundColor: '#fff9c4',
              fontSize: '12px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              borderRadius: '62% 38% 53% 47% / 38% 59% 41% 62%',
            }}
          >
            Critical Error
          </span>

          <h1 style={{ marginTop: '20px', fontSize: '28px', fontWeight: 800 }}>
            Something went very wrong
          </h1>
          <p style={{ marginTop: '8px', fontSize: '18px' }}>
            The application encountered a critical error. Please try refreshing the page.
          </p>

          {error.digest && (
            <p style={{ marginTop: '12px', fontSize: '14px', color: '#2d2d2d99' }}>
              Error ID: {error.digest}
            </p>
          )}

          <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={reset}
              style={{
                height: '48px',
                padding: '0 20px',
                border: '3px solid #2d2d2d',
                borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                boxShadow: '4px 4px 0 0 #2d2d2d',
                backgroundColor: '#fff',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Try Again
            </button>
            <a
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: '48px',
                padding: '0 20px',
                border: '3px solid #2d2d2d',
                borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                boxShadow: '4px 4px 0 0 #2d2d2d',
                backgroundColor: '#e5e0d8',
                fontSize: '18px',
                fontWeight: 'bold',
                textDecoration: 'none',
                color: '#2d2d2d',
                fontFamily: 'inherit',
              }}
            >
              Go Home
            </a>
          </div>

          <p style={{ marginTop: '16px', fontSize: '14px', fontWeight: 600 }}>
            Keep seeing this?{' '}
            <a href="/feedback" style={{ color: '#ff4d4d', textDecoration: 'underline' }}>
              Report the issue
            </a>
          </p>
        </div>
      </body>
    </html>
  );
}
