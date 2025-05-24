export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-primary p-4 text-sm text-center text-white">
      <p>© {year} Gama Code. All rights reserved.</p>
    </footer>
  );
};
