const CurrencyFormatter = ({ amount }) => {
  // Just format the number directly
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0, // Ensures no decimals
  }).format(Number(amount)); // Use Number to convert string to number

  return <span>{formattedAmount}</span>;
};

export default CurrencyFormatter;
