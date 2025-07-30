import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent_id?: string;
  color?: string;
  icon?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export interface CategoryMapping {
  id: string;
  category_id: string;
  entity_type: string;
  entity_id: string;
  is_primary: boolean;
  created_at: string;
  created_by?: string;
}

export function useCategories(activeOnly = true) {
  return useQuery({
    queryKey: ['categories', activeOnly],
    queryFn: async () => {
      // Use any for now until tables are created and types are regenerated
      let query = (supabase as any).from('categories').select('*').order('sort_order', { ascending: true });
      
      if (activeOnly) {
        query = query.eq('is_active', true);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as Category[];
    },
    enabled: false // Disabled until tables are created
  });
}

export function useCategoryMappings(entityType?: string, entityId?: string) {
  return useQuery({
    queryKey: ['category-mappings', entityType, entityId],
    queryFn: async () => {
      let query = (supabase as any)
        .from('category_mappings')
        .select(`
          *,
          category:categories(*)
        `);
      
      if (entityType) {
        query = query.eq('entity_type', entityType);
      }
      
      if (entityId) {
        query = query.eq('entity_id', entityId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
    enabled: false // Disabled until tables are created
  });
}

export function useCategoryMutations() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createCategory = useMutation({
    mutationFn: async (data: Omit<Category, 'id' | 'created_at' | 'updated_at'>) => {
      const { data: result, error } = await (supabase as any)
        .from('categories')
        .insert([{
          ...data,
          parent_id: data.parent_id || null,
        }])
        .select()
        .single();
      
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({ title: 'Category created successfully' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error creating category',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  const updateCategory = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Category> }) => {
      const { data: result, error } = await (supabase as any)
        .from('categories')
        .update({
          ...data,
          parent_id: data.parent_id || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({ title: 'Category updated successfully' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error updating category',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  const deleteCategory = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any)
        .from('categories')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({ title: 'Category deleted successfully' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error deleting category',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  const addCategoryMapping = useMutation({
    mutationFn: async (data: Omit<CategoryMapping, 'id' | 'created_at'>) => {
      const { data: result, error } = await (supabase as any)
        .from('category_mappings')
        .insert([data])
        .select()
        .single();
      
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category-mappings'] });
      toast({ title: 'Category mapping added successfully' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error adding category mapping',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  const removeCategoryMapping = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any)
        .from('category_mappings')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category-mappings'] });
      toast({ title: 'Category mapping removed successfully' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error removing category mapping',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  return {
    createCategory,
    updateCategory,
    deleteCategory,
    addCategoryMapping,
    removeCategoryMapping
  };
}