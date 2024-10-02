import React from "react";

interface StackProps {
   children: React.ReactNode;
   flexDirection?: "row" | "column";
   align?: "center" | "start" | "end" | "stretch";
   justify?: "center" | "start" | "end" | "between" | "around";
   bgColor?: string;
}

const Stack: React.FC<StackProps> = ({
   children,
   flexDirection = "row",
   align = "stretch",
   justify = "start",
   bgColor = "transparent",
}) => {
   const style = {
      display: "flex",
      flexDirection,
      alignItems: align,
      justifyContent: justify,
      backgroundColor: bgColor,
   };

   return <div style={style}>{children}</div>;
};

export default Stack;
