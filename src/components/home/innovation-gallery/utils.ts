
// Function to get appropriate background color based on category
export const getCategoryColor = (category: string) => {
  switch(category) {
    case "Digital Health":
      return "bg-blue-100 text-blue-800";
    case "Telehealth":
      return "bg-orange-100 text-orange-800";
    case "MedTech":
      return "bg-purple-100 text-purple-800";
    case "Healthcare IT":
      return "bg-cyan-100 text-cyan-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
