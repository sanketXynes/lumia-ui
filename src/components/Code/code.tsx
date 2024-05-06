"use client";
import { forwardRef, useEffect, useState } from "react";
import { CodeProps } from "./code.types";
import { cx } from "@utils/cx";
import "./code-highlighting.css";
import {
  formatCodeJS,
  formatHTML,
  formatCSS,
  formatRust,
  formatSQL,
  formatPHP,
  formatPython,
  formatCode
} from "./codeSyntax";
import styled from "styled-components";
import { typography } from "@shared/styles";

const CodeComponent: React.ForwardRefRenderFunction<
  HTMLDivElement,
  CodeProps
> = ({ code, editable = false, ...props }, ref) => {
  const [formattedCode, setFormattedCode] = useState<JSX.Element | string | null>(null);

  useEffect(() => {
    switch (props.language) {
      case "html":
        setFormattedCode(formatHTML(code));
        break;
      case "css":
        setFormattedCode(formatCSS(code));
        break;
      case "rust":
        setFormattedCode(formatRust(code));
        break;
      case "sql":
        setFormattedCode(formatSQL(code));
        break;
      case "php":
        setFormattedCode(formatPHP(code));
        break;
      case "python":
        setFormattedCode(formatPython(code));
        break;
      case "JS":
        setFormattedCode(formatCodeJS(code));
        break;
      default:
        setFormattedCode(formatCode(code));
        break;
    }
  }, [code, props.language]);

  const StyledCode = styled.code`
    font-family: ${typography.type.code};
    font-size: ${typography.size.code};
  `

  const handleKeyDown = (event: React.KeyboardEvent<HTMLHeadingElement>) => {
    // Prevent line breaks on Enter key
    if (event.key === "Enter") {
      event.preventDefault();
    }
    const value = (event.target as HTMLHeadingElement).textContent;
    console.log("Value:", value);
  };
  return (
    <div
      ref={ref}
      contentEditable={editable}
      onKeyDown={handleKeyDown}
      className={cx(props.className)}
      {...props}
    >
      <pre>
        <StyledCode className={cx(`language-${props.language}`)}>
          <pre>
         {formattedCode}
         </pre>
        </StyledCode>
      </pre>
      
    </div>
  );
};

export const Code = forwardRef(CodeComponent);
