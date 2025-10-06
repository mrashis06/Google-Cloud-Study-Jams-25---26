import type { Participant } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Crown, Medal, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ParticipantCardProps {
  rank: number;
  participant: Participant;
}

const RankIcon = ({ rank }: { rank: number }) => {
  if (rank === 1) {
    return <Trophy className="h-6 w-6 text-yellow-500" />;
  }
  if (rank === 2) {
    return <Medal className="h-6 w-6 text-slate-400" />;
  }
  if (rank === 3) {
    return <Crown className="h-6 w-6 text-amber-700" />;
  }
  return <span className="text-lg font-semibold w-6 text-center text-muted-foreground">{rank}</span>;
};

export function ParticipantCard({ rank, participant }: ParticipantCardProps) {
  const isTopPerformer = rank <= 3;

  return (
    <Card
      className={cn(
        'p-4 flex items-center justify-between transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg',
        isTopPerformer && 'border-2',
        rank === 1 && 'bg-yellow-500/10 border-yellow-500/50',
        rank === 2 && 'bg-slate-500/10 border-slate-500/50',
        rank === 3 && 'bg-amber-700/10 border-amber-700/50'
      )}
    >
      <div className="flex items-center gap-4">
        <div className="w-10 flex items-center justify-center">
            <RankIcon rank={rank} />
        </div>
        <p className="font-medium text-lg font-headline">{participant.name}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-xl font-bold text-primary tabular-nums">
          {participant.score}
        </p>
        <span className="text-sm text-muted-foreground">pts</span>
      </div>
    </Card>
  );
}
