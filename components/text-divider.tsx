interface TextDividerProps {
  text: string;
}

export const TextDivider: React.FC<TextDividerProps> = ({ text }) => {
  return <div className="text-base my-6 underline text-center font-bold md:text-lg md:underline-offset-8 md:my-6 ">{text}</div>;
};
