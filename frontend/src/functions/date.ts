export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate); // Parse the date string
  const year = date.getFullYear(); // Extract the year
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Extract the month and add leading zero
  const day = String(date.getDate()).padStart(2, "0"); // Extract the day and add leading zero

  return `${year}-${month}-${day}`; // Return the formatted date
};


export const formatDateTypeTwo = (date: Date, lang: string): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString(lang, { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };
