import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-dialog1',
  templateUrl: './profiledialog1.component.html',
  styleUrls: ['./profiledialog1.component.css']
})
export class ProfileDialog1Component implements OnInit {
  profileForm: FormGroup;
  isReadOnly = false;
  imagePreview: string | ArrayBuffer | null = null;
  selectedImageFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProfileDialog1Component>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isReadOnly = data?.readonly || false;
    this.profileForm = this.fb.group({
      firstName: [{ value: data?.firstName || '', disabled: this.isReadOnly }],
      lastName: [{ value: data?.lastName || '', disabled: this.isReadOnly }],
      nickName: [{ value: data?.nickName || '', disabled: this.isReadOnly }],
      age: [{ value: data?.age || '', disabled: this.isReadOnly }],
      birthday: [{ value: data?.birthday || '', disabled: this.isReadOnly }],
      phone: [{ value: data?.phone || '', disabled: this.isReadOnly }],
      email: [{ value: data?.email || '', disabled: this.isReadOnly }],
      image: [{ value: data?.image || '', disabled: this.isReadOnly }]
    });

    // Load the initial image if available
    if (data?.image) {
      this.imagePreview = data.image;
    }
  }

  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImageFile = fileInput.files[0];

      // Preview the selected image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedImageFile);
    }
  }

  onSave(): void {
    if (!this.isReadOnly) {
      const formData = this.profileForm.value;

      // Store the base64 image data if an image is selected
      if (this.imagePreview) {
        formData.image = this.imagePreview;
      }

      this.dialogRef.close(formData); // Return the form data with image
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
