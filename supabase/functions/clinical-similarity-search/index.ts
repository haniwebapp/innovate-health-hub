
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

interface RequestPayload {
  recordId: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  // Get environment variables
  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

  // Initialize Supabase client
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const { recordId } = await req.json() as RequestPayload;
    
    if (!recordId) {
      return new Response(
        JSON.stringify({ error: 'Missing recordId parameter' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Get the original record
    const { data: record, error: recordError } = await supabase
      .from('clinical_records')
      .select('*')
      .eq('id', recordId)
      .single();

    if (recordError) {
      throw new Error(`Error retrieving record: ${recordError.message}`);
    }

    if (!record) {
      throw new Error('Record not found');
    }

    // Get tags for the record
    const { data: tags, error: tagsError } = await supabase
      .from('clinical_tags')
      .select('tag')
      .eq('record_id', recordId);

    if (tagsError) {
      throw new Error(`Error retrieving tags: ${tagsError.message}`);
    }

    const tagValues = tags ? tags.map(t => t.tag) : [];

    // Find similar records based on symptoms, diagnosis, or tags
    const { data: similarRecords, error: similarError } = await supabase
      .from('clinical_records')
      .select('*')
      .neq('id', recordId) // Exclude the current record
      .limit(5);

    if (similarError) {
      throw new Error(`Error finding similar records: ${similarError.message}`);
    }

    // If we have similar records, filter them further by relevance
    let filteredRecords = similarRecords || [];

    // Get tags for all these records to improve matching
    if (filteredRecords.length > 0) {
      const recordIds = filteredRecords.map(r => r.id);
      
      const { data: allTags, error: allTagsError } = await supabase
        .from('clinical_tags')
        .select('record_id, tag')
        .in('record_id', recordIds);

      if (allTagsError) {
        throw new Error(`Error retrieving all tags: ${allTagsError.message}`);
      }

      // Group tags by record_id
      const tagsByRecordId = (allTags || []).reduce((acc, tag) => {
        if (!acc[tag.record_id]) {
          acc[tag.record_id] = [];
        }
        acc[tag.record_id].push(tag.tag);
        return acc;
      }, {});

      // Score each record by similarity
      filteredRecords = filteredRecords.map(r => {
        const recordTags = tagsByRecordId[r.id] || [];
        const commonTags = tagValues.filter(tag => recordTags.includes(tag));
        const commonSymptoms = (r.symptoms || []).filter(s => record.symptoms?.includes(s));
        const commonDiagnosis = (r.diagnosis || []).filter(d => record.diagnosis?.includes(d));
        
        const similarityScore = 
          commonTags.length * 2 + 
          commonSymptoms.length * 3 + 
          commonDiagnosis.length * 4;
          
        return {
          ...r,
          similarityScore,
          commonTags,
          commonSymptoms,
          commonDiagnosis
        };
      });

      // Sort by similarity score and take top 5
      filteredRecords.sort((a, b) => b.similarityScore - a.similarityScore);
      filteredRecords = filteredRecords.slice(0, 5);
    }

    console.log(`Found ${filteredRecords.length} similar clinical records`);
    
    return new Response(
      JSON.stringify({ similarRecords: filteredRecords }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Clinical similarity search error:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
