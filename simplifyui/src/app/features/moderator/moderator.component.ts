import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/_services/user.service';
@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.css']
})
export class ModeratorComponent implements OnInit {

  content?: string;
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.userService.getModerator().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }

}
