export const Currencies = [
  { value: "USD", label: "$ Dolar", locale: "en-US" },
  { value: "EUR", label: "€ Euro", locale: "de-DE" },
  { value: "GBP", label: "£ Libra", locale: "en-GB" },
  { value: "JPY", label: "¥ Yen", locale: "ja-JP" },
    { value: "ARS", label: "$ Peso Argentino", locale: "ar-AR" },
]

export type Currency = (typeof Currencies)[0];