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

  jobreqs?: Jobreq[];
  currentJobreq: Jobreq = {};
  currentIndex = -1;
  title = '';

  constructor(private tokenStorageService: TokenStorageService, private jobreqService: JobreqService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      console.log(this.roles);
      if(user.roles.length == 1){
        this.showUserBoard = true;
      }
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
      this.retrieveJobreqs();
    }
  }
  
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  retrieveJobreqs(): void {
    this.jobreqService.getAll()
      .subscribe({
        next: (data) => {
          this.jobreqs = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  setActiveJobreq(jobreq: Jobreq, index: number): void {
    this.currentJobreq = jobreq;
    this.currentIndex = index;
  }

  searchTitle(): void {
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