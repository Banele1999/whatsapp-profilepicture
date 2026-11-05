import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';

interface ProfilePhoto {
  id: number;
  file: File;
  preview: string;
}

@Component({
  selector: 'app-edit-profile-picture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-profile-picture.component.html',
  styleUrls: ['./edit-profile-picture.component.scss']
})
export class EditProfilePictureComponent implements OnDestroy {

  @Output() profilePictureSelected = new EventEmitter<File>();

  photos: ProfilePhoto[] = [];
  selectedPhotoId: number | null = null;

  private photoId = 0;

  get selectedPhoto(): ProfilePhoto | undefined {
    return this.photos.find(
      photo => photo.id === this.selectedPhotoId
    );
  }

  get selectedIndex(): number {
    return this.photos.findIndex(
      photo => photo.id === this.selectedPhotoId
    );
  }

  // Upload multiple images
  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files) return;

    Array.from(input.files).forEach(file => {

      if (!file.type.startsWith('image/')) return;

      const photo: ProfilePhoto = {
        id: this.photoId++,
        file,
        preview: URL.createObjectURL(file)
      };

      this.photos.push(photo);

      if (this.selectedPhotoId === null) {
        this.selectedPhotoId = photo.id;
      }
    });

    input.value = '';
  }

  // Select a photo from carousel
  selectPhoto(photo: ProfilePhoto): void {
    this.selectedPhotoId = photo.id;
  }

  // Previous photo
  previousPhoto(): void {
    if (this.photos.length < 2) return;

    const index =
      (this.selectedIndex - 1 + this.photos.length)
      % this.photos.length;

    this.selectedPhotoId = this.photos[index].id;
  }

  // Next photo
  nextPhoto(): void {
    if (this.photos.length < 2) return;

    const index =
      (this.selectedIndex + 1) % this.photos.length;

    this.selectedPhotoId = this.photos[index].id;
  }

  // Remove selected photo
  removePhoto(): void {
    const photo = this.selectedPhoto;

    if (!photo) return;

    const index = this.selectedIndex;

    URL.revokeObjectURL(photo.preview);

    this.photos = this.photos.filter(
      item => item.id !== photo.id
    );

    if (this.photos.length === 0) {
      this.selectedPhotoId = null;
      return;
    }

    this.selectedPhotoId =
      this.photos[Math.min(index, this.photos.length - 1)].id;
  }

  // Confirm selected profile picture
  done(): void {
    if (!this.selectedPhoto) return;

    this.profilePictureSelected.emit(
      this.selectedPhoto.file
    );
  }

  goBack(): void {
    history.back();
  }

  ngOnDestroy(): void {
    this.photos.forEach(photo =>
      URL.revokeObjectURL(photo.preview)
    );
  }
}