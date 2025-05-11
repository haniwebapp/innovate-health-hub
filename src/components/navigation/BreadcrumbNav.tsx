
import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

interface BreadcrumbNavProps {
  currentPage: string;
  items?: Array<{
    label: string;
    href: string;
  }>;
}

export default function BreadcrumbNav({ currentPage, items = [] }: BreadcrumbNavProps) {
  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={item.href} className="text-moh-green hover:text-moh-darkGreen">
                  {item.label}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
          </React.Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage className="font-medium">{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
