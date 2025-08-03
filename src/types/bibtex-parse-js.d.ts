declare module '@orcid/bibtex-parse-js' {
  interface BibEntry {
    citationKey: string;
    entryType: string;
    entryTags: {
      title?: string;
      author?: string;
      journal?: string;
      booktitle?: string;
      year?: string;
      url?: string;
    };
  }

  function toJSON(bibtex: string): BibEntry[];
  export default {
    toJSON,
  };
}
