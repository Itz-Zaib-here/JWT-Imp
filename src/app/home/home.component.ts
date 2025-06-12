import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  @ViewChild('myModal') modal: ElementRef | undefined;

  // getUsers: boolean = false;
  router = inject(Router);
  Indexusers: any[] = [];
  totalUsers: number = 0;
  totalCategory: number = 0;
  totalproducts: number = 0;
  Category: any[] = [];
  products: any[] = [];
  productForm: FormGroup = new FormGroup({});

  constructor(private Service: ServicesService) {}
  ngOnInit(): void {
    this.Service.getAllUser().subscribe((data) => {
      this.Indexusers = data;
      this.totalUsers = this.Indexusers.length;
    });
    this.Service.getCategory().subscribe((data) => {
      this.Category = data;
      this.totalCategory = this.Category.length;
    });
    this.Service.getProducts().subscribe((data) => {
      this.products = data;
      this.totalproducts = this.products.length;
    });
  }
  ngAfterViewInit(): void {
    const allSideMenu = document.querySelectorAll<HTMLAnchorElement>(
      '#sidebar .side-menu.top li a'
    );

    allSideMenu.forEach((item) => {
      const li = item.parentElement as HTMLLIElement;
      item.addEventListener('click', () => {
        allSideMenu.forEach((i) => {
          (i.parentElement as HTMLLIElement).classList.remove('active');
        });
        li.classList.add('active');
      });
    });

    const menuBar = document.querySelector<HTMLElement>(
      '#content nav .bx.bx-menu'
    );
    const sidebar = document.getElementById('sidebar') as HTMLElement;

    menuBar?.addEventListener('click', () => {
      sidebar.classList.toggle('hide');
    });

    function adjustSidebar(): void {
      if (window.innerWidth <= 576) {
        sidebar.classList.add('hide');
        sidebar.classList.remove('show');
      } else {
        sidebar.classList.remove('hide');
        sidebar.classList.add('show');
      }
    }

    window.addEventListener('load', adjustSidebar);
    window.addEventListener('resize', adjustSidebar);

    const searchButton = document.querySelector<HTMLButtonElement>(
      '#content nav form .form-input button'
    );
    const searchButtonIcon = document.querySelector<HTMLElement>(
      '#content nav form .form-input button .bx'
    );
    const searchForm =
      document.querySelector<HTMLFormElement>('#content nav form');

    searchButton?.addEventListener('click', function (e: MouseEvent) {
      if (window.innerWidth < 768) {
        e.preventDefault();
        searchForm?.classList.toggle('show');
        if (searchForm?.classList.contains('show')) {
          searchButtonIcon?.classList.replace('bx-search', 'bx-x');
        } else {
          searchButtonIcon?.classList.replace('bx-x', 'bx-search');
        }
      }
    });

    const switchMode = document.getElementById(
      'switch-mode'
    ) as HTMLInputElement;
    switchMode?.addEventListener('change', () => {
      document.body.classList.toggle('dark', switchMode.checked);
    });

    document.querySelector('.notification')?.addEventListener('click', () => {
      document.querySelector('.notification-menu')?.classList.toggle('show');
      document.querySelector('.profile-menu')?.classList.remove('show');
    });

    document.querySelector('.profile')?.addEventListener('click', () => {
      document.querySelector('.profile-menu')?.classList.toggle('show');
      document.querySelector('.notification-menu')?.classList.remove('show');
    });

    window.addEventListener('click', function (e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest('.notification') && !target.closest('.profile')) {
        document.querySelector('.notification-menu')?.classList.remove('show');
        document.querySelector('.profile-menu')?.classList.remove('show');
      }
    });

    function toggleMenu(menuId: string): void {
      const menu = document.getElementById(menuId) as HTMLElement;
      const allMenus = document.querySelectorAll<HTMLElement>('.menu');

      allMenus.forEach((m) => {
        if (m !== menu) {
          m.style.display = 'none';
        }
      });

      menu.style.display =
        menu.style.display === 'none' || menu.style.display === ''
          ? 'block'
          : 'none';
    }

    document.addEventListener('DOMContentLoaded', () => {
      const allMenus = document.querySelectorAll<HTMLElement>('.menu');
      allMenus.forEach((menu) => {
        menu.style.display = 'none';
      });
    });
  }
  logout() {
    localStorage.removeItem('JWT_Token');
    this.router.navigateByUrl('/login');
  }

  // getAllUsers() {
  //   debugger;
  //   this.getUsers = true;
  // }
  // closeUsers() {
  //   this.getUsers = false;
  // }
  // closeModal() {
  //   if (this.modal) {
  //     this.modal.nativeElement.style.display = 'none';
  //     this.products = [];
  //     document.body.style.overflowX = 'auto';
  //   }
  // }
  initializeForm() {
    this.productForm = new FormGroup({
      productId: new FormControl('', Validators.required),
      productName: new FormControl('', Validators.required),
      // shortName: new FormControl('', Validators.required),
    });
  }
}
