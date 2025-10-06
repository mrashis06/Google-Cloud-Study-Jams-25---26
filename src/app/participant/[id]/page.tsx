'use client';
import { getParticipantById, type Participant } from '@/lib/participants';
import { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme-toggle';

function MedalIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block ml-2"
    >
      <path
        d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z"
        fill="#FFD700"
      />
      <path
        d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 10.7614 9.23858 13 12 13Z"
        fill="#FFA500"
      />
      <path
        d="M12 10.5C13.3807 10.5 14.5 9.38071 14.5 8C14.5 6.61929 13.3807 5.5 12 5.5C10.6193 5.5 9.5 6.61929 9.5 8C9.5 9.38071 10.6193 10.5 12 10.5Z"
        fill="#FFD700"
      />
      <path
        d="M10 8L11.5 9.5L14.5 6.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 13.5L5 23"
        stroke="#4285F4"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15 13.5L19 23"
        stroke="#DB4437"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ParticipantProfile({
  params,
}: {
  params: { id: string };
}) {
  const [participant, setParticipant] = useState<Participant | null>(null);
  const { id } = params;

  useEffect(() => {
    async function fetchData() {
      if (id) {
        const data = await getParticipantById(id as string);
        setParticipant(data || null);
      }
    }
    fetchData();
  }, [id]);

  if (!participant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-muted/40 p-3 flex items-center justify-between">
         <div className="flex items-center">
            <Image src="/assets/google-cloud.png" alt="Google Cloud Logo" width={24} height={24} className="mr-2" />
          <h1 className="text-lg font-semibold">
            Google Cloud Study Jams 25 - 26
          </h1>
        </div>
        <ThemeToggle />
      </header>

      <div className="bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/assets/logo.png" alt="GDG On Campus Logo" width={40} height={40} className="mr-2"/>
            <div>
              <h2 className="text-lg font-bold">
                Google Developer Group On Campus
              </h2>
              <p className="text-muted-foreground text-sm">MCKV Institute of Engineering</p>
            </div>
          </div>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Leaderboard
            </Button>
          </Link>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-8 shadow-lg rounded-xl">
          <h1 className="text-3xl font-bold mb-6">
            {participant.name}
            {participant.skillBadges >= 10 && <MedalIcon />}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-8">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{participant.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Profile URL</p>
              <a href={participant.profileUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
                View Profile &rarr;
              </a>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Profile URL Status</p>
              <Badge variant={participant.profileUrlStatus === 'All Good' ? 'secondary' : 'destructive'}>{participant.profileUrlStatus}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Access Code Redemption</p>
              <Badge variant={participant.accessCodeRedemption === 'Redeemed' ? 'secondary' : 'destructive'}>{participant.accessCodeRedemption}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">All Completed</p>
              <div className="flex items-center">
                <Badge variant={participant.allCompleted ? 'secondary' : 'destructive'}>
                  {participant.allCompleted ? 'Yes' : 'No'}
                </Badge>
                {participant.allCompleted && <CheckCircle2 className="h-5 w-5 text-green-500 ml-2" />}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 p-6 rounded-lg">
              <CardContent className="p-0">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {participant.skillBadges}
                </div>
                <p className="text-sm font-medium text-blue-500 dark:text-blue-300">
                  Skill Badges Completed
                </p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 p-6 rounded-lg">
              <CardContent className="p-0">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                  {participant.arcadeGames ?? 0}
                </div>
                <p className="text-sm font-medium text-green-500 dark:text-green-300">
                  Arcade Games Completed
                </p>
              </CardContent>
            </Card>
          </div>

          {participant.completedSkillBadges.length > 0 && (
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                    <MedalIcon /> 
                    <span className="ml-2">Completed Skill Badges ({participant.completedSkillBadges.length})</span>
                </h2>
                <div className="relative pl-4">
                    <div className="absolute left-0 top-0 h-full border-l-2 border-primary"></div>
                    <ol className="list-inside">
                        {participant.completedSkillBadges.map((badge, index) => (
                            <li key={index} className="relative pl-8 py-2 rounded-md hover:bg-muted/50">
                                <span className="absolute left-0 top-2.5 text-primary font-bold">{index + 1}.</span>
                                {badge}
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
