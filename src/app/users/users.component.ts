import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ServicesService } from '../services.service';
import { CommonModule, NgIf } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../../modal/class';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  @ViewChild('myModal') modal: ElementRef | undefined;

  Indexusers: any[] = [];
  Category: any[] = [];
  Users: User = new User();
  UserForm: FormGroup = new FormGroup({});

  constructor(private Service: ServicesService, private http: HttpClient) {}
  ngOnInit(): void {
    this.initializeForm();
    this.getAllUser();
    this.getCategory();
  }
  getAllUser() {
    this.Service.getAllUser().subscribe((data) => {
      this.Indexusers = data;
    });
  }
  getCategory() {
    this.Service.getCategory().subscribe((data) => {
      this.Category = data;
    });
  }
  deleteUser(id: string) {
    const confirmation = confirm(
      `Are you sure you want to delete user with ID ${id}?`
    );
    if (confirmation) {
      this.Service.deleteUser(id).subscribe({
        next: (res) => {
          console.log('Delete response:', res);
          alert(res);
          this.getAllUser();
        },
        error: (err) => {
          console.error('Delete failed', err);
          alert('Failed to delete user');
        },
      });
    }
  }
  openModal() {
    if (this.modal) {
      this.modal.nativeElement.style.display = 'block';
    }
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
  closeModal() {
    if (this.modal) {
      this.modal.nativeElement.style.display = 'none';
      this.UserForm.reset();
      document.body.style.overflow = 'auto';
    }
  }
  UpdateUser() {}
  AddUser() {
    this.Service.saveUser(this.UserForm.value).subscribe({
      next: (res: any) => {
        console.log('User Added Success:', res); // res = "User Test14 created successfully"
        alert(res); // Optional
        this.UserForm.reset();
        this.closeModal();
        this.getAllUser();
      },
      error: (err) => {
        console.error('Error adding user:', err);
        alert('Something went wrong while adding user.');
      },
    });
  }

  initializeForm() {
    this.UserForm = new FormGroup({
      userName: new FormControl(this.Users.userName, Validators.required),
      Password: new FormControl(this.Users.password, Validators.required),
      Email: new FormControl(this.Users.email, Validators.required),
    });
  }
}
