
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.22.0";
import { corsHeaders } from "../_shared/cors.ts";

interface PageContent {
  sections: PageSection[];
}

interface PageSection {
  type: string;
  title?: string;
  content?: string;
  [key: string]: any;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { content, slug } = await req.json();

    if (!content) {
      return new Response(
        JSON.stringify({ error: "Missing required field: content" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Validate page content structure
    const validationResults = validatePageContent(content);
    
    // Check for broken links - simplified check for demonstration
    const brokenLinks = checkForBrokenLinks(content);
    
    // Simple SEO analysis
    const seoSuggestions = analyzeSEO(content, slug);

    const result = {
      isValid: validationResults.isValid,
      errors: validationResults.errors,
      warnings: [...validationResults.warnings, ...brokenLinks],
      seoSuggestions
    };

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});

function validatePageContent(content: PageContent): { 
  isValid: boolean; 
  errors: string[]; 
  warnings: string[]; 
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if content has sections array
  if (!content.sections || !Array.isArray(content.sections)) {
    errors.push("Content must have a 'sections' array");
    return { isValid: false, errors, warnings };
  }

  // Check each section
  content.sections.forEach((section, index) => {
    // Check if section has a type
    if (!section.type) {
      errors.push(`Section ${index + 1} must have a 'type' property`);
    }

    // Check for valid section types
    const validTypes = ['hero', 'content', 'cards', 'cta', 'image-text'];
    if (!validTypes.includes(section.type)) {
      warnings.push(`Section ${index + 1} has an uncommon type: '${section.type}'`);
    }

    // Check for empty content
    if (section.content === "") {
      warnings.push(`Section ${index + 1} has empty content`);
    }

    // Title is recommended for most section types except special ones
    if (!section.title && section.type !== 'cta' && section.type !== 'divider') {
      warnings.push(`Section ${index + 1} (${section.type}) should have a title`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

function checkForBrokenLinks(content: PageContent): string[] {
  const warnings: string[] = [];
  
  // Simple check for links that may be problematic
  // In a real implementation, you would make HTTP requests to verify links
  const checkText = JSON.stringify(content);
  
  if (checkText.includes("http://localhost")) {
    warnings.push("Content contains localhost URLs which won't work in production");
  }
  
  if (checkText.includes(".html") || checkText.includes(".htm")) {
    warnings.push("Content contains direct HTML file references which may not be compatible with your routing");
  }
  
  return warnings;
}

function analyzeSEO(content: PageContent, slug: string): string[] {
  const suggestions: string[] = [];
  
  // Check for minimal content length
  let totalContentLength = 0;
  content.sections.forEach(section => {
    if (section.content && typeof section.content === 'string') {
      totalContentLength += section.content.length;
    }
  });
  
  if (totalContentLength < 300) {
    suggestions.push("Page content is too short for good SEO (less than 300 characters)");
  }
  
  // Check if slug matches content
  const contentText = JSON.stringify(content).toLowerCase();
  if (slug && !contentText.includes(slug.replace(/-/g, ' ').toLowerCase())) {
    suggestions.push("Slug keywords don't appear in the page content");
  }
  
  // Check for heading structure
  let hasHeadings = false;
  content.sections.forEach(section => {
    if (section.title) {
      hasHeadings = true;
    }
  });
  
  if (!hasHeadings) {
    suggestions.push("Page doesn't have any headings which are important for SEO");
  }
  
  return suggestions;
}
