import { Component } from '@angular/core';
import { AddWorkoutComponent } from './components/add-workout/add-workout.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [AddWorkoutComponent, WorkoutListComponent],
})
export class AppComponent {
  title = 'health-challenge-tracker';
}
