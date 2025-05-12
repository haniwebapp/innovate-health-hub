
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function QuickLinksSection() {
  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Investment Hub</CardTitle>
          <CardDescription>Connect with investors and explore funding opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Access funding opportunities, connect with investors, and explore financial resources for your healthcare innovations.</p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link to="/dashboard/investment">Explore Investment Hub</Link>
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Knowledge Hub</CardTitle>
          <CardDescription>Access resources and learning materials</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Explore curated content, research papers, and educational resources to support your healthcare innovation journey.</p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link to="/dashboard/knowledge">Browse Resources</Link>
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>AI Solutions</CardTitle>
          <CardDescription>Access advanced AI tools for healthcare innovation</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Leverage AI-powered tools for innovation matching, market analysis, regulatory compliance, and more.</p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link to="/ai-solutions">Explore AI Tools</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
