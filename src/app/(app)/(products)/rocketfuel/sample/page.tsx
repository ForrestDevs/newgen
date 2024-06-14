import BackButton from "@/components/back-button";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { sampleWorkouts } from "@/config/rocketfuel";

export default function SampleWorkout() {
  return (
    <ContentLayout title="Sample Workouts">
      <BackButton />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <h1 className="text-3xl font-bold mb-8">Sample Workouts</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          These sample workouts outline the structure and exercises across
          different categories to enhance your speed, providing a clear roadmap
          for each training session.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleWorkouts.map((workout, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{workout.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-4">{workout.description}</p>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Exercise</TableHead>
                        <TableHead>Sets</TableHead>
                        <TableHead>Reps</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {workout.table.map((exercise, index) => (
                        <TableRow key={index}>
                          <TableCell>{exercise.title}</TableCell>
                          <TableCell>{exercise.sets}</TableCell>
                          <TableCell>{exercise.reps}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col justify-start rounded-md border-2 border-yellow-500 bg-yellow-100 p-4">
          <h3 className="text-xl font-semibold text-yellow-600">
            Disclaimer ⚠️
          </h3>

          <p className="text-lg text-gray-500 dark:text-black/60 my-4">
            For workout 3, swap out the sprints for different loaded
            acceleration (hills, sleds, or band).
          </p>
          <p className="text-lg text-gray-500 dark:text-black/60 my-4">
            For workout 2, you are almost using all the exercises in the power
            exercise log.
          </p>
        </div>
      </div>
    </ContentLayout>
  );
}
