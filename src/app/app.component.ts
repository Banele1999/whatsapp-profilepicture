import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EditProfilePictureComponent } from '../components/edit-profile-picture/edit-profile-picture.component';

@Component({
  selector: 'app-root',
  imports: [EditProfilePictureComponent],
  template: `
    <app-edit-profile-picture
      (profilePictureSelected)="onProfilePictureSelected($event)">
    </app-edit-profile-picture>
  `
  // templateUrl: './app.component.html',
  // styleUrl: './app.component.scss'
})
export class AppComponent {
  onProfilePictureSelected(file: File): void {
  console.log('Selected profile picture:', file);

    // Pass file to your API service.
    // Example: this.profileService.uploadPicture(file);
  }
}
