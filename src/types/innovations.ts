
export interface Innovation {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  tags: string[];
  rating: number;
  status: "New" | "Validated" | "Scaling" | "Established";
  createdAt: string;
  longDescription?: string;
  organization?: string;
  website?: string;
  contact?: string;
}

export const statusColors: Record<string, string> = {
  "New": "bg-blue-100 text-blue-800",
  "Validated": "bg-green-100 text-green-800",
  "Scaling": "bg-purple-100 text-purple-800",
  "Established": "bg-gray-100 text-gray-800"
};
