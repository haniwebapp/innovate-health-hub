
export interface WebsitePage {
  id: string;
  slug: string;
  title: string;
  content: PageContent;
  metaDescription?: string;
  lastUpdatedBy?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WebsitePageFormData {
  id?: string;
  slug: string;
  title: string;
  content: PageContent;
  metaDescription?: string;
  published?: boolean;
}

export interface PageContent {
  sections: PageSection[];
}

export interface PageSection {
  type: 'hero' | 'content' | 'cards' | 'cta' | 'image-text';
  title?: string;
  content?: string;
  bgColor?: string;
  items?: any[];
  imageUrl?: string;
  alignment?: 'left' | 'right' | 'center';
  [key: string]: any;
}
