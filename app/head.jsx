export default function Head() {
  return (
    <>
      {/* Keep charset as the very first tag to satisfy the 1024 bytes constraint */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* Optional legacy header as requested; safe to include */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      {/* Keep additional critical meta short so total head remains small */}
      {/* Title is handled by Next.js metadata API; omit here to avoid duplication */}

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />

      {/* Preconnect to critical CDN */}
      <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
      
      {/* External CSS (Font Awesome) - Loaded with media="print" trick for non-blocking */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        media="print"
        onLoad="this.media='all'"
      />
      <noscript>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </noscript>
    </>
  );
}
