import React from "react";

interface DynamicElementProps {
  element: keyof JSX.IntrinsicElements;
  content: string;
  className?: string; // Optional class name prop
}

interface TextProps {
  text: string;
  styles?: string;
  type?: keyof JSX.IntrinsicElements;
}

const Text: React.FC<TextProps> = ({ text, styles, type = "p" }) => {
  // Reusable component that receives an element and content as props
  const DynamicElement: React.FC<DynamicElementProps> = ({
    element,
    content,
    className,
  }) => {
    // Use the received element as a JSX tag and render the content
    return React.createElement(element, { className }, content);
  };

  return (
    <>
      <DynamicElement element={type} content={text} className={styles} />
    </>
  );
};

export default Text;
