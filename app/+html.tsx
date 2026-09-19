import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="color-scheme" content="light dark" />
        <title>Brewluru — Bangalore cafe guide</title>
        <meta
          name="description"
          content="Brewluru is a curated Bengaluru specialty cafe guide with filters for neighborhood, wifi, charging, and work-friendly spots."
        />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const responsiveBackground = `
body {
  background-color: #F7F3EE;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #14100E;
  }
}
`;
