"use client";

import type { Participant } from '@/lib/data';
import { useState, useTransition } from 'react';
import { ParticipantCard } from './participant-card';
import { InsightsGenerator } from './insights-generator';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { getRefreshedDataAction } from '@/app/actions';

interface LeaderboardProps {
  initialParticipants: Participant[];
}

export function Leaderboard({ initialParticipants }: LeaderboardProps) {
  const [participants, setParticipants] = useState(initialParticipants);
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(async () => {
      const newParticipants = await getRefreshedDataAction();
      setParticipants(newParticipants);
    });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
        <Button onClick={handleRefresh} disabled={isPending} variant="outline">
          <RefreshCw className={`mr-2 h-4 w-4 ${isPending ? 'animate-spin' : ''}`} />
          {isPending ? 'Updating...' : 'Refresh Scores'}
        </Button>
        <InsightsGenerator participants={participants} />
      </div>
      <div className="space-y-3 max-w-3xl mx-auto">
        {participants.map((participant, index) => (
          <ParticipantCard
            key={participant.id}
            rank={index + 1}
            participant={participant}
          />
        ))}
        {participants.length === 0 && (
            <p className="text-center text-muted-foreground">No participants yet.</p>
        )}
      </div>
    </div>
  );
}
