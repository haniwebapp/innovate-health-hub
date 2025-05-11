
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function TestingGuidance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Testing Guidance</CardTitle>
        <CardDescription>Best practices for sandbox testing</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none">
          <h3>Testing Guidelines</h3>
          <p>
            Your innovation has been approved for a controlled testing environment. 
            Here are some guidelines to ensure your testing period is productive and safe:
          </p>
          
          <ol>
            <li>
              <strong>Safety First:</strong> Monitor for any adverse events and report them immediately
              to the regulatory team.
            </li>
            <li>
              <strong>Collect Comprehensive Data:</strong> Ensure you're collecting data points as outlined
              in your approved testing protocol.
            </li>
            <li>
              <strong>Regular Reporting:</strong> Submit progress reports at the prescribed milestones.
            </li>
            <li>
              <strong>Stay Within Scope:</strong> Only test functionalities that were approved in your application.
            </li>
            <li>
              <strong>Document Everything:</strong> Maintain detailed records of all testing activities and observations.
            </li>
          </ol>
          
          <h3>Support Resources</h3>
          <p>
            If you encounter any issues during your testing period, please contact the regulatory support team:
          </p>
          <ul>
            <li>Email: regulatory-support@moh.gov.sa</li>
            <li>Phone: +966 11 555 0000</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
