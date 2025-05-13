
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAI } from '@/context/AIContext';
import { Loader2, ImagePlus, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageGeneratorProps {
  title?: string;
  description?: string;
}

export function ImageGenerator({
  title = "AI Image Generator",
  description = "Generate images using AI"
}: ImageGeneratorProps) {
  const { generateImage, isProcessing } = useAI();
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<'natural' | 'vivid'>('natural');
  const [size, setSize] = useState<'1024x1024' | '1792x1024' | '1024x1792'>('1024x1024');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleGenerate = async () => {
    if (!prompt.trim() || isProcessing) return;
    
    setError(null);
    setGeneratedImage(null);
    
    try {
      // Call the image generation function
      const imageUrl = await generateImage(prompt);
      
      if (imageUrl) {
        setGeneratedImage(imageUrl);
        toast({
          title: 'Image Generated',
          description: 'Your image has been generated successfully',
          variant: 'success',
        });
      } else {
        throw new Error('Failed to generate image');
      }
    } catch (err: any) {
      console.error('Error generating image:', err);
      setError(err.message || 'An error occurred while generating the image');
      toast({
        title: 'Image Generation Failed',
        description: err.message || 'Failed to generate image',
        variant: 'destructive',
      });
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImagePlus className="h-5 w-5 text-primary" /> {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="prompt" className="text-sm font-medium">Image Prompt</label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
            className="resize-none h-24"
            disabled={isProcessing}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="style" className="text-sm font-medium">Style</label>
            <Select
              value={style}
              onValueChange={(value) => setStyle(value as 'natural' | 'vivid')}
              disabled={isProcessing}
            >
              <SelectTrigger id="style">
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="natural">Natural</SelectItem>
                <SelectItem value="vivid">Vivid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="size" className="text-sm font-medium">Size</label>
            <Select
              value={size}
              onValueChange={(value) => setSize(value as '1024x1024' | '1792x1024' | '1024x1792')}
              disabled={isProcessing}
            >
              <SelectTrigger id="size">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1024x1024">Square (1024x1024)</SelectItem>
                <SelectItem value="1792x1024">Landscape (1792x1024)</SelectItem>
                <SelectItem value="1024x1792">Portrait (1024x1792)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-start gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        
        {generatedImage && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Generated Image</p>
            <img 
              src={generatedImage} 
              alt="Generated image" 
              className="rounded-md w-full object-cover border"
            />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleGenerate}
          disabled={isProcessing || !prompt.trim()}
          className="w-full"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <ImagePlus className="mr-2 h-4 w-4" />
              Generate Image
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
