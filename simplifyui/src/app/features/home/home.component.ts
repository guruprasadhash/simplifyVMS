import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../core/_services/token-storage.service';
import { Jobreq } from './models/jobreq.model';
import { JobreqService } from './services/jobreq.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showUserBoard = false;
  username?: string;

  jobreqs: Jobreq[] = [];
  currentJobreq: Jobreq = {};
  currentIndex = -1;
  title = '';
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private tokenStorageService: TokenStorageService, private jobreqService: JobreqService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      if (user.roles.length == 1) {
        this.showUserBoard = true;
      }
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
      this.retrieveJobreqs();
    }
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    let params: any = {};
    if (searchTitle) {
      params[`title`] = searchTitle;
    }
    if (page) {
      params[`page`] = page - 1;
    }
    if (pageSize) {
      params[`size`] = pageSize;
    }
    return params;
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  /*retrieveJobreqs(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    this.jobreqService.getAll(params)
      .subscribe({
        next: (data) => {
          this.jobreqs = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }*/

  retrieveJobreqs(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    this.jobreqService.getAll(params)
    .subscribe(
      response => {
        const { jobreqs, totalItems } = response;
        this.jobreqs = jobreqs;
        this.count = totalItems;
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  setActiveJobreq(jobreq: Jobreq, index: number): void {
    this.currentJobreq = jobreq;
    this.currentIndex = index;
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveJobreqs();
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveJobreqs();
  }

  searchTitle(): void {
    this.page = 1;
    this.currentJobreq = {};
    this.currentIndex = -1;
    this.jobreqService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.jobreqs = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveJobreqs();
    this.currentJobreq = {};
    this.currentIndex = -1;
  }
}