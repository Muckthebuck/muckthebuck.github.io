// src/components/Publications.tsx
import React, { useEffect, useState } from 'react';
import parseBibFile from '@orcid/bibtex-parse-js';
import './Publications.css';

interface PublicationEntry {
  entryType: string;
  citationKey: string;
  entryTags: {
    title?: string;
    author?: string;
    journal?: string;
    booktitle?: string;
    year?: string;
    url?: string;
  };
}

const NAME = "Mukul Chodhary"; 

const Publications: React.FC = () => {
  const [entries, setEntries] = useState<PublicationEntry[]>([]);

  useEffect(() => {
    fetch('/data/publications.bib')
      .then(res => res.text())
      .then(bibText => {
        const parsed = parseBibFile.toJSON(bibText);
        setEntries(parsed);
      });
  }, []);

  // Format authors: replace "and" with commas, bold your name
    function formatAuthors(authors?: string) {
        if (!authors) return "";

        const authorsArray = authors.split(/\s+and\s+/);

        const formattedAuthors = authorsArray.map((author, idx) => {
            // Trim whitespace
            const trimmedAuthor = author.trim();

            // Check if author is "LastName, FirstName" and convert to "FirstName LastName"
            let displayName = trimmedAuthor;
            if (trimmedAuthor.includes(",")) {
            const parts = trimmedAuthor.split(",");
            if (parts.length === 2) {
                const lastName = parts[0].trim();
                const firstName = parts[1].trim();
                displayName = `${firstName} ${lastName}`;
            }
            }

            if (displayName === NAME) {
            return (
                <strong className="highlight-name" key={idx}>
                {displayName}
                </strong>
            );
            }

            return displayName;
        });

        return formattedAuthors.reduce((prev, curr, i) => {
            if (i === 0) return [curr];
            return [...prev, ", ", curr];
        }, [] as (string | React.ReactNode)[]);
        }


  return (
    <section id="publications" className="publications-section">
      <ul className="publications-list">
        {entries.map((entry, idx) => {
          const tags = entry.entryTags;
          return (
            <li key={idx} className="publication-item">
              <h3 className="publication-title">
                {tags.url ? (
                  <a href={tags.url} target="_blank" rel="noopener noreferrer">
                    {tags.title}
                  </a>
                ) : (
                  tags.title
                )}
              </h3>
              <p className="publication-meta">
                {formatAuthors(tags.author)} • <em>{tags.journal || tags.booktitle}</em> • {tags.year}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Publications;
