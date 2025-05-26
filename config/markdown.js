import markdownIt from "markdown-it";

// Configure Markdown
let options = {
  html: true,
  typographer: true,
  quotes: '””’’',
};

const mdIt = markdownIt(options);

export default mdIt;
