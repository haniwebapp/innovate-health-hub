
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

    // Parse the request body
    let body;
    try {
      body = await req.json();
    } catch (error) {
      console.error("Error parsing request body:", error);
      return new Response(
        JSON.stringify({ error: "Invalid request body" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const { content, slug } = body;

    if (!content) {
      return new Response(
        JSON.stringify({ error: "Missing required field: content" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Log validation attempt
    console.log(`Validating page with slug: ${slug}`);
    console.log(`Content has ${content.sections?.length || 0} sections`);

    // Validate page content structure
    const validationResults = validatePageContent(content);
    
    // Check for broken links
    const brokenLinks = checkForBrokenLinks(content);
    
    // SEO analysis
    const seoSuggestions = analyzeSEO(content, slug);

    const result = {
      isValid: validationResults.isValid,
      errors: validationResults.errors,
      warnings: [...validationResults.warnings, ...brokenLinks],
      seoSuggestions
    };

    console.log("Validation results:", {
      isValid: result.isValid,
      errorCount: result.errors.length,
      warningCount: result.warnings.length,
      seoSuggestionsCount: result.seoSuggestions.length
    });

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Validation error:", error);
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

  if (content.sections.length === 0) {
    errors.push("Page must have at least one section");
    return { isValid: false, errors, warnings };
  }

  // Check each section
  content.sections.forEach((section, index) => {
    // Check if section has a type
    if (!section.type) {
      errors.push(`Section ${index + 1} must have a 'type' property`);
    }

    // Check for valid section types
    const validTypes = ['hero', 'content', 'cards', 'cta', 'image-text', 'divider'];
    if (!validTypes.includes(section.type)) {
      warnings.push(`Section ${index + 1} has an uncommon type: '${section.type}'`);
    }

    // Check for empty content in text-based sections
    if ((section.type === 'content' || section.type === 'hero' || section.type === 'image-text') 
        && (section.content === "" || section.content === undefined)) {
      warnings.push(`Section ${index + 1} (${section.type}) should have content`);
    }

    // Title is recommended for most section types except special ones
    if (!section.title && section.type !== 'cta' && section.type !== 'divider') {
      warnings.push(`Section ${index + 1} (${section.type}) should have a title`);
    }
    
    // Check for required properties based on section type
    if (section.type === 'image-text' && !section.imageUrl) {
      warnings.push(`Image+Text section ${index + 1} is missing an image URL`);
    }
    
    if (section.type === 'cta' && !section.buttonText) {
      warnings.push(`CTA section ${index + 1} should have button text`);
    }
    
    if (section.type === 'cards' && (!section.items || !Array.isArray(section.items) || section.items.length === 0)) {
      warnings.push(`Cards section ${index + 1} should have at least one card item`);
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
  const checkText = JSON.stringify(content);
  
  if (checkText.includes("http://localhost")) {
    warnings.push("Content contains localhost URLs which won't work in production");
  }
  
  if (checkText.includes(".html") || checkText.includes(".htm")) {
    warnings.push("Content contains direct HTML file references which may not be compatible with your routing");
  }
  
  const suspiciousUrls = [
    "example.com", 
    "placeholder", 
    "yourwebsite", 
    "your-site",
    "your_image",
    "image.jpg",
    "image.png"
  ];
  
  for (const term of suspiciousUrls) {
    if (checkText.includes(term)) {
      warnings.push(`Content contains '${term}' which appears to be a placeholder URL`);
      break; // Only show this warning once
    }
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
  if (slug) {
    const contentText = JSON.stringify(content).toLowerCase();
    const slugKeywords = slug.replace(/-/g, ' ').toLowerCase();
    
    if (!contentText.includes(slugKeywords)) {
      suggestions.push("The page URL slug keywords don't appear in the page content");
    }
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
  
  // Check for image alt text
  const hasImages = content.sections.some(section => 
    section.type === 'image-text' || 
    section.imageUrl || 
    section.backgroundImage);
  
  const hasAltText = content.sections.some(section => section.altText);
  
  if (hasImages && !hasAltText) {
    suggestions.push("Images should have alt text for better accessibility and SEO");
  }
  
  return suggestions;
}
