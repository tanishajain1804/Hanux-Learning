import React from "react";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  clean?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  clean = false,
  className = "",
  ...props
}) => {
  const containerStyle = clean 
    ? "mx-auto w-full px-4 sm:px-6 lg:px-8" 
    : "mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8";
    
  return (
    <div className={`${containerStyle} ${className}`} {...props}>
      {children}
    </div>
  );
};
export default Container;
