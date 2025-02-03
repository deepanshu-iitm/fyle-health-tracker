import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LocalStorageService } from '../../services/local-storage.service';

interface Workout {
  userName: string;
  workoutType: string;
  minutes: number;
}

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
})
export class WorkoutListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['userName', 'workoutType', 'minutes'];
  dataSource = new MatTableDataSource<Workout>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.loadWorkouts();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadWorkouts(): void {
    const workouts = this.localStorageService.getWorkouts();
    this.dataSource.data = workouts as Workout[];
  }
}
