
import { toast } from "sonner";

// Sample user data
const mockUsers = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    status: "active",
    lastSignIn: "2023-04-12",
    userType: "Innovator",
    organization: "Health Tech Solutions",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    status: "active",
    lastSignIn: "2023-04-10",
    userType: "Investor",
    organization: "Medical Ventures Capital",
    avatar: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: "3",
    firstName: "Mohammad",
    lastName: "Al-Farsi",
    email: "mohammad@moh.gov.sa",
    status: "active",
    lastSignIn: "2023-04-15",
    userType: "Administrator",
    organization: "Ministry of Health",
    avatar: "https://i.pravatar.cc/150?img=3"
  }
];

export class MockUserService {
  /**
   * Generates mock user data
   */
  static async generateMockUsers(): Promise<number> {
    // In a real app, this would save to a database
    return mockUsers.length;
  }
}
