import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storageKey = 'userData';
  private fallbackStorage: { [key: string]: any } = {};

  private isLocalStorageAvailable(): boolean {
    try {
      return typeof localStorage !== 'undefined' && localStorage !== null;
    } catch (e) {
      return false;
    }
  }

  getUsers(): any[] {
    if (!this.isLocalStorageAvailable()) {
      console.warn('localStorage is not available. Using fallback storage.');
      return this.fallbackStorage[this.storageKey] || [];
    }

    const data = localStorage.getItem(this.storageKey);
    if (!data) {
      return this.initializeData();
    }

    try {
      const parsedData = JSON.parse(data);
      return Array.isArray(parsedData) ? parsedData : this.initializeData();
    } catch (e) {
      console.error('Error parsing localStorage data:', e);
      return this.initializeData();
    }
  }

  addUser(user: any): void {
    if (!this.isLocalStorageAvailable()) {
      console.warn('localStorage is not available. Using fallback storage.');
      if (!this.fallbackStorage[this.storageKey]) {
        this.fallbackStorage[this.storageKey] = [];
      }
      this.fallbackStorage[this.storageKey].push(user);
      return;
    }

    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  addWorkout(userId: number, workout: any): void {
    if (!this.isLocalStorageAvailable()) {
      console.warn('localStorage is not available. Using fallback storage.');
      return;
    }

    const users = this.getUsers();
    const user = users.find((u) => u.id === userId);
    if (user) {
      user.workouts.push(workout);
      localStorage.setItem(this.storageKey, JSON.stringify(users));
    }
  }

  getWorkouts(): any[] {
    const users = this.getUsers();
    const workouts: any[] = [];

    users.forEach((user) => {
      user.workouts.forEach((workout: any) => {
        workouts.push({
          userName: user.name, 
          workoutType: workout.type,
          minutes: workout.minutes,
        });
      });
    });

    return workouts;
  }

  private initializeData(): any[] {
    const initialData = [
      {
        id: 1,
        name: 'John Doe',
        workouts: [
          { type: 'Running', minutes: 30 },
          { type: 'Cycling', minutes: 45 },
        ],
      },
      {
        id: 2,
        name: 'Jane Smith',
        workouts: [
          { type: 'Swimming', minutes: 60 },
          { type: 'Running', minutes: 20 },
        ],
      },
      {
        id: 3,
        name: 'Mike Johnson',
        workouts: [
          { type: 'Yoga', minutes: 50 },
          { type: 'Cycling', minutes: 40 },
        ],
      },
    ];
    localStorage.setItem(this.storageKey, JSON.stringify(initialData));
    return initialData;
  }
}