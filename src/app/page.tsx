'use client';
import { Menu, Search, Users, Award } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getParticipants, type Participant } from '@/lib/participants';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef, useMemo } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { useTheme } from 'next-themes';

function RankingBadge({ rank }: { rank: number }) {
  return <span className="font-medium">{rank}</span>;
}

function MobileNav() {
  const { setTheme } = useTheme();
  return (
    <div className="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme('light')}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('dark')}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('system')}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default function Home() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [filteredParticipants, setFilteredParticipants] = useState<
    Participant[]
  >([]);
  const [eligibleCount, setEligibleCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Participant[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getParticipants();
      setParticipants(data);
      setFilteredParticipants(data);
      const eligible = data.filter(p => p.allCompleted).length;
      setEligibleCount(eligible);
    }
    fetchData();
  }, []);

  const rankedScores = useMemo(() => {
    if (participants.length === 0) return { gold: -1, silver: -1, bronze: -1 };

    const scores = participants.map(
      p => p.skillBadges + (p.arcadeGames ?? 0)
    );
    const uniqueScores = [...new Set(scores)].sort((a, b) => b - a);
    
    return {
      gold: uniqueScores[0] ?? -1,
      silver: uniqueScores[1] ?? -1,
      bronze: uniqueScores[2] ?? -1,
    };
  }, [participants]);


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value) {
      const filtered = participants.filter(p =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
      setFilteredParticipants(filtered);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setFilteredParticipants(participants);
    }
  };

  const handleSuggestionClick = (participant: Participant) => {
    setSearchTerm(participant.name);
    setFilteredParticipants([participant]);
    setShowSuggestions(false);
  };

  const getRank = (participantId: string) => {
    const sortedParticipants = [...participants].sort((a, b) => {
      const scoreA = a.skillBadges + (a.arcadeGames ?? 0);
      const scoreB = b.skillBadges + (b.arcadeGames ?? 0);
      if (scoreB !== scoreA) {
        return scoreB - scoreA;
      }
      return 0; // Keep original order if scores are same, can be enhanced
    });
    return sortedParticipants.findIndex(p => p.id === participantId) + 1;
  };
  
  const getRowClassName = (participant: Participant) => {
    const score = participant.skillBadges + (participant.arcadeGames ?? 0);
    if (score >= rankedScores.gold && rankedScores.gold !== -1) return 'bg-rank-gold';
    if (score >= rankedScores.silver && rankedScores.silver !== -1) return 'bg-rank-silver';
    if (score >= rankedScores.bronze && rankedScores.bronze !== -1) return 'bg-rank-bronze';
    return '';
  };


  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-muted/40 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 md:w-1/3">
            {/* Empty div for spacing */}
          </div>
          <div className="flex items-center justify-center gap-2 md:w-1/3">
            <Image
              src="/assets/google-cloud.png"
              alt="Google Cloud Logo"
              width={24}
              height={24}
            />
            <h1 className="text-md sm:text-xl font-semibold text-center">
              Google Cloud Study Jams 25 - 26
            </h1>
          </div>
          <div className="flex items-center justify-end gap-2 md:w-1/3">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <MobileNav />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="p-4 mb-8 shadow-lg bg-card/80 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-2">
              <Image
                src="/assets/logo.png"
                alt="Google Developer Groups Logo"
                width={60}
                height={60}
              />
              <div>
                <h2 className="text-lg font-bold text-foreground">Google Developer Groups</h2>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                  <span className="text-primary font-semibold text-sm">On campus</span>
                  <span className="text-muted-foreground text-sm">
                    MCKV Institute of Engineering
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                href="https://www.mckvie.edu.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/assets/MCKVIE.png"
                  alt="MCKV Logo"
                  width={140}
                  height={140}
                />
              </Link>
            </div>
          </div>
        </Card>

        <Card className="mb-8 shadow-lg bg-card/80 backdrop-blur-sm">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="flex items-center gap-4 p-6">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/50">
                <Award className="h-8 w-8 text-green-500 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Eligible for Swags
                </p>
                <p className="text-3xl font-bold">{eligibleCount}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/50">
                <Users className="h-8 w-8 text-blue-500 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Participants
                </p>
                <p className="text-3xl font-bold">{participants.length}</p>
              </div>
            </div>
          </div>
        </Card>

        <div
          className="relative w-full max-w-lg mx-auto mb-8"
          ref={searchContainerRef}
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search Your Name Here"
            className="pl-10 w-full bg-card shadow-md rounded-full h-12"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setShowSuggestions(searchTerm.length > 0)}
          />
          {showSuggestions && suggestions.length > 0 && (
            <Card className="absolute z-10 w-full mt-1 bg-card shadow-lg rounded-md overflow-hidden">
              <ul className="max-h-60 overflow-y-auto">
                {suggestions.map(suggestion => (
                  <li
                    key={suggestion.id}
                    className="px-4 py-2 cursor-pointer hover:bg-muted"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{suggestion.name}</span>
                      <RankingBadge rank={getRank(suggestion.id)} />
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        <Card className="overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary hover:bg-primary/90">
                  <TableHead className="text-primary-foreground">#</TableHead>
                  <TableHead className="text-primary-foreground">Name</TableHead>
                  <TableHead className="text-primary-foreground">
                    Redemption Status
                  </TableHead>
                  <TableHead className="text-primary-foreground">
                    All Completed
                  </TableHead>
                  <TableHead className="text-primary-foreground">
                    No. of Skill Badges Completed
                  </TableHead>
                  <TableHead className="text-primary-foreground">
                    No. of Arcade Games Completed
                  </TableHead>
                  <TableHead className="text-primary-foreground">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredParticipants.map((participant) => (
                  <TableRow key={participant.id} className={getRowClassName(participant)}>
                    <TableCell>
                      <RankingBadge rank={getRank(participant.id)} />
                    </TableCell>
                    <TableCell>{participant.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          participant.accessCodeRedemption === 'Redeemed'
                            ? 'success'
                            : 'destructive'
                        }
                      >
                        {participant.accessCodeRedemption}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {participant.allCompleted ? 'Yes' : 'No !'}
                    </TableCell>
                    <TableCell>{participant.skillBadges}</TableCell>
                    <TableCell>{participant.arcadeGames ?? '-'}</TableCell>
                    <TableCell>
                      <Link href={`/participant/${participant.id}`}>
                        <Button size="sm">View Details</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </main>
    </div>
  );
}
