import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
})
export class AddWorkoutComponent {
  workoutForm!: FormGroup;
  workoutTypes = ['Running', 'Cycling', 'Yoga', 'Swimming'];

  constructor(private fb: FormBuilder, private localStorageService: LocalStorageService) {
    this.workoutForm = this.fb.group({
      userName: ['', Validators.required],
      workoutType: ['', Validators.required],
      workoutMinutes: ['', [Validators.required, Validators.min(1)]],
    });
  }

  addWorkout(): void {
    if (this.workoutForm.valid) {
      const newWorkout = this.workoutForm.value;

      const users = this.localStorageService.getUsers();
      let user = users.find((u) => u.name === newWorkout.userName);

      if (!user) {
        user = { id: Date.now(), name: newWorkout.userName, workouts: [] };
        this.localStorageService.addUser(user);
      }

      this.localStorageService.addWorkout(user.id, {
        type: newWorkout.workoutType,
        minutes: newWorkout.workoutMinutes,
      });

      this.workoutForm.reset();
    }
  }
}
