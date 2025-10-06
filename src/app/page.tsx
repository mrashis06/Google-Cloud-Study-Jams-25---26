import { getParticipantData } from '@/lib/data';
import { Leaderboard } from '@/components/leaderboard';

export default async function Home() {
  const initialParticipants = await getParticipantData();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary tracking-tighter">
            Campus Leaderboard
          </h1>
          <p className="mt-2 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time rankings from the GDG community challenge.
          </p>
        </header>
        
        <Leaderboard initialParticipants={initialParticipants} />

      </div>
      <footer className="text-center py-6 text-sm text-muted-foreground">
        <p>Built for the Google Developer Group Campus Community.</p>
      </footer>
    </main>
  );
}
