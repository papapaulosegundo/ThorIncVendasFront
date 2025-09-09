import React from "react";
import "../../styles/index.css";

type Logo = {
  src: string;
  alt: string;
  href?: string;
};

type Props = {
  emphasis?: React.ReactNode;
  rest?: React.ReactNode;
  logos: Logo[];
  speed?: number;
  logoHeight?: number;
  grayscale?: boolean;
  titleOverride?: React.ReactNode;
  className?: string;
};

export default function CustomerLoop({
  emphasis = "+100 empresas",
  rest = "estão prosperando no Thor",
  logos,
  speed = 28,
  logoHeight = 44,
  grayscale = true,
  titleOverride,
  className,
}: Props) {
    
  const loop = React.useMemo(() => [...logos, ...logos], [logos]);

  return (
    <section className={`cm-section ${className ?? ""}`}>
      <div className="container">
        <header className="cm-header" aria-live="polite">
          {titleOverride ?? (
            <h2 className="cm-title">
              <span className="cm-highlight">{emphasis}</span>{" "}
              <span className="cm-title-rest">{rest}</span>
            </h2>
          )}
        </header>

        <div
          className={`cm-viewport ${grayscale ? "is-grayscale" : ""}`}
          aria-label="Marcas e clientes"
        >
          <ul
            className="cm-track"
            style={{ ["--cm-duration" as any]: `${speed}s` }}
            role="list"
          >
            {loop.map((logo, i) => {
              const content = (
                <img
                  src={logo.src}
                  alt={logo.alt}
                  style={{ maxHeight: `${logoHeight}px` }}
                  loading="lazy"
                />
              );
              return (
                <li key={`${logo.alt}-${i}`} className="cm-item" role="listitem">
                  {logo.href ? (
                    <a
                      href={logo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={logo.alt}
                      className="cm-link"
                    >
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
