
export interface ActivityData {
  id: string;
  type: string;
  title: string;
  action: string;
  timestamp: Date;
  meta: Record<string, any>;
  pinned?: boolean;
}

export interface ActivityMeta {
  views?: number;
  status?: string;
  format?: string;
  progress?: string;
  count?: number;
}
