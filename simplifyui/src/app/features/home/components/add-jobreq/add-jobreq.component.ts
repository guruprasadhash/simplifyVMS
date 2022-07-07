import { Component, OnInit } from '@angular/core';
import { Jobreq } from '../../models/jobreq.model';
import { JobreqService } from '../../services/jobreq.service';
@Component({
  selector: 'app-add-jobreq',
  templateUrl: './add-jobreq.component.html',
  styleUrls: ['./add-jobreq.component.css']
})
export class AddJobreqComponent implements OnInit {
  jobreq: Jobreq = {
    title: '',
    description: '',
    budget: 1000,
    published: 1,
  };
  submitted = false;

  constructor(private jobreqService: JobreqService) { }

  ngOnInit(): void {
  }

  saveJobreq(): void {
    const data = {
      title: this.jobreq.title,
      description: this.jobreq.description,
      budget: this.jobreq.budget,
      published: this.jobreq.published
    };
    this.jobreqService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          window.location.href = "/features/home";
        },
        error: (e) => console.error(e)
      });
  }

  newJobreq(): void {
    this.submitted = false;
    this.jobreq = {
      title: '',
      description: '',
      budget: 1000,
      published: 1,
    };
  }
}
