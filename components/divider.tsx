import React from "react";

const Divider: React.FC = () => {
  return (
    <div className="relative my-2 mx-4">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground"></span>
      </div>
    </div>
  );
};

export { Divider };
