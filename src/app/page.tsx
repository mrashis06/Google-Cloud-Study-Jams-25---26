import { Search } from 'lucide-react';
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

function GdgLogo() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.2449 3.06122L10.2041 8.89796V20.5714L20.2449 26.4082L30.2857 20.5714V8.89796L20.2449 3.06122Z"
        fill="#4285F4"
      />
      <path
        d="M20.2449 3.06122L10.2041 8.89796L4.16327 12.449L14.2041 6.61224L20.2449 3.06122Z"
        fill="#0F9D58"
      />
      <path
        d="M20.2449 3.06122L30.2857 8.89796L36.3265 12.449L26.2857 6.61224L20.2449 3.06122Z"
        fill="#F4B400"
      />
      <path
        d="M4.16327 12.449V28.102L10.2041 20.5714V8.89796L4.16327 12.449Z"
        fill="#DB4437"
      />
      <path
        d="M36.3265 12.449V28.102L30.2857 20.5714V8.89796L36.3265 12.449Z"
        fill="#DB4437"
      />
    </svg>
  );
}

export default async function Home() {
  const participants = await getParticipants();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-800 text-white p-3 flex items-center justify-center">
        <svg
          className="w-6 h-6 mr-2"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z"
            fill="#F4B400"
          />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
        <h1 className="text-lg font-semibold">
          Google Cloud Study Jams 25 - 26
        </h1>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <GdgLogo />
          <div className="ml-4">
            <h2 className="text-xl font-bold text-gray-700">
              Google Developer Group On Campus
            </h2>
            <p className="text-gray-500">MCKV Institute of Engineering</p>
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
              <div className="text-4xl font-bold text-green-600">0</div>
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

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search Your Name Here"
            className="pl-10 w-full max-w-lg mx-auto bg-white shadow-md rounded-full h-12"
          />
        </div>

        <Card className="overflow-hidden shadow-lg">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary hover:bg-primary/90">
                <TableHead className="text-white">#</TableHead>
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">Redemption Status</TableHead>
                <TableHead className="text-white">All Completed</TableHead>
                <TableHead className="text-white">
                  Number of Skill Badges Completed
                </TableHead>
                <TableHead className="text-white">
                  Number of Arcade Games Completed
                </TableHead>
                <TableHead className="text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participants.map((participant, index) => (
                <TableRow key={participant.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{participant.name}</TableCell>
                  <TableCell>
                    <Badge variant={participant.redemptionStatus ? "secondary" : "destructive"}>
                      {participant.redemptionStatus ? 'Done' : 'Pending'}
                    </Badge>
                  </TableCell>
                  <TableCell>{participant.allCompleted ? 'Yes' : 'No !'}</TableCell>
                  <TableCell>{participant.skillBadges}</TableCell>
                  <TableCell>{participant.arcadeGames || '-'}</TableCell>
                  <TableCell>
                    <Button size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  );
}
