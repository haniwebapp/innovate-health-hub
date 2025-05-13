
export interface Application {
  id: string;
  name: string;
  status: "draft" | "submitted" | "in-review" | "approved" | "rejected";
  submittedDate: string;
  framework: string;
  progress: number;
  testingPeriod?: string;
}
