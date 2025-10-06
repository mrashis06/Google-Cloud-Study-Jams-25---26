'use client';
import { Search, Trophy } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getParticipants, type Participant } from '@/lib/participants';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';

function RankingBadge({ rank }: { rank: number }) {
  if (rank > 3) {
    return <span className="font-medium">{rank}</span>;
  }

  const colors = {
    1: 'text-yellow-500',
    2: 'text-gray-400',
    3: 'text-yellow-700',
  };

  return (
    <div className="flex items-center gap-2">
      <Trophy className={`w-5 h-5 ${colors[rank as keyof typeof colors]}`} />
      <span className="font-bold">{rank}</span>
    </div>
  );
}

export default function Home() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [filteredParticipants, setFilteredParticipants] = useState<Participant[]>([]);
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
      const eligible = data.filter(p => p.skillBadges >= 10).length;
      setEligibleCount(eligible);
    }
    fetchData();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-muted/40 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex-1"></div>
          <div className="flex-1 flex items-center justify-center text-center">
            <Image src="/assets/google-cloud.png" alt="Google Cloud Logo" width={24} height={24} className="mr-2" />
            <h1 className="text-md sm:text-xl font-semibold truncate">
              Google Cloud Study Jams 25 - 26
            </h1>
          </div>
          <div className="flex-1 flex justify-end">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Image src="/assets/logo.png" alt="GDG On Campus Logo" width={40} height={40} />
          <div className="ml-4">
            <h2 className="text-xl font-bold">
              Google Developer Group On Campus
            </h2>
            <p className="text-muted-foreground">MCKV Institute of Engineering</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-green-400 border-2 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-green-600">
                No of Eligible Participants for swags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-600">{eligibleCount}</div>
            </CardContent>
          </Card>
          <Card className="border-blue-400 border-2 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-blue-600">
                Total No of Participants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600">
                {participants.length}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="relative w-full max-w-lg mx-auto mb-8" ref={searchContainerRef}>
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
                    {suggestion.name}
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
                  <TableHead className="text-primary-foreground">Redemption Status</TableHead>
                  <TableHead className="text-primary-foreground">All Completed</TableHead>
                  <TableHead className="text-primary-foreground">
                    No of Skill Badges Completed
                  </TableHead>
                  <TableHead className="text-primary-foreground">
                    # of Arcade Games Completed
                  </TableHead>
                  <TableHead className="text-primary-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredParticipants.map((participant, index) => (
                  <TableRow key={participant.id}>
                    <TableCell>
                      <RankingBadge rank={index + 1} />
                    </TableCell>
                    <TableCell>{participant.name}</TableCell>
                    <TableCell>
                      <Badge variant={participant.accessCodeRedemption === 'Redeemed' ? "success" : "destructive"}>
                        {participant.accessCodeRedemption}
                      </Badge>
                    </TableCell>
                    <TableCell>{participant.allCompleted ? 'Yes' : 'No !'}</TableCell>
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
