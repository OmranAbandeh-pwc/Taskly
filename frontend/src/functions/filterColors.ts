export const getImportanceColor = (importance: string) => {
  let color = "";
  switch (importance) {
    case "highest":
      return (color = "#FF0000");
    case "high":
      return (color = "#FFA500");
    case "medum":
      return (color = "#008000");
    case "low":
      return (color = "#0000FF");
  }
};
