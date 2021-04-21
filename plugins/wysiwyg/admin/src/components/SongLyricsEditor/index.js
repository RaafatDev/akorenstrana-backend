import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  textarea {
    background-color: white;
    /* white-space: nowrap; */
    overflow: scroll;
    /* width: 540px; */
    /* min-height: 300px; */
    margin-bottom: 8px;
    padding: 1rem;
    /* font-family: "Consolas,Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace,sans-serif" !important; */
    font-family: "monospace";
    white-space: pre;
  }
`;

const Editor = ({ onChange, name, value }) => {
  const rowsColumns = {
    rows: 20,
    cols: 71,
  };

  return (
    <Wrapper>
      <textarea
        value={value ? value : ""}
        rows={rowsColumns.rows}
        cols={rowsColumns.cols}
        spellcheck="false"
        style={{
          // fontFamily:
          //   "Consolas,Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace,sans-serif",
          fontFamily: "monospace",
          whiteSpace: "pre",
          fontSize: "1.7rem",
        }}
        onChange={(event) => {
          const data = event.target.value;

          onChange({ target: { name, value: data } });
        }}
      />
    </Wrapper>
  );
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default Editor;
