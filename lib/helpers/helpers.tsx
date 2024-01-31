export const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);
export const zipCodeRegex = new RegExp(/^\d{5}-\d{3}$/);

export const civilStatusType = [
  { label: "Solteiro(a)", value: "Solteiro(a)" },
  { label: "Casado(a)", value: "Casado(a)" },
  { label: "Viúvo(a)", value: "Viúvo(a)" },
  { label: "Divorciado(a)", value: "Divorciado(a)" },
] as const;

export const tshirtSizes = [
  { label: "P", value: "P" },
  { label: "M", value: "M" },
  { label: "G", value: "G" },
  { label: "GG", value: "GG" },
  { label: "XG", value: "XG" },
] as const;
