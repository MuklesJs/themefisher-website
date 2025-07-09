import SyntaxHighlighter from "react-syntax-highlighter";

const Code = ({ lang, children }) => {
  return <SyntaxHighlighter language={lang}>{`${children}`}</SyntaxHighlighter>;
};

export default Code;
