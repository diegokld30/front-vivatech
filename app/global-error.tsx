"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="es">
      <body>
        <main
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <div>
            <h1>Ocurrio un error inesperado</h1>
            <button onClick={() => reset()} type="button">
              Reintentar
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
