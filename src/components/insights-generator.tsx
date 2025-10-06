"use client";

import type { Participant } from '@/lib/data';
import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { generateInsightsAction } from '@/app/actions';
import { Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InsightsGeneratorProps {
  participants: Participant[];
}

export function InsightsGenerator({ participants }: InsightsGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [insights, setInsights] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGenerate = () => {
    setIsOpen(true);
    setInsights('');
    startTransition(async () => {
      const result = await generateInsightsAction(participants);
      if (result.success) {
        setInsights(result.insights);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error,
        });
        setIsOpen(false);
      }
    });
  };

  return (
    <>
      <Button onClick={handleGenerate}>
        <Sparkles className="mr-2 h-4 w-4" />
        Generate Insights
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-headline">
              <Sparkles className="text-primary" />
              Actionable Insights
            </DialogTitle>
            <DialogDescription>
              AI-powered analysis of the current leaderboard standings.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 min-h-[200px] flex items-center justify-center">
            {isPending ? (
              <div className="flex flex-col items-center gap-4 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p>Analyzing data and generating insights...</p>
              </div>
            ) : (
              <div className="text-sm text-foreground max-w-full">
                 <p className="whitespace-pre-wrap">{insights}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
