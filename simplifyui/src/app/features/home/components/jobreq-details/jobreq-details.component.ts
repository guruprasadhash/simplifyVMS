import { Component, OnInit } from '@angular/core';
import { Jobreq } from '../../models/jobreq.model';
import { ActivatedRoute, Router } from '@angular/router';
import { JobreqService } from '../../services/jobreq.service';

@Component({
  selector: 'app-jobreq-details',
  templateUrl: './jobreq-details.component.html',
  styleUrls: ['./jobreq-details.component.css']
})
export class JobreqDetailsComponent implements OnInit {

  viewMode = false;
  currentJobreq: Jobreq = {
    title: '',
    description: '',
    budget: 1000,
    published: 1,
  };

  message = '';
  constructor(
    private jobreqService: JobreqService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getJobreq(this.route.snapshot.params["id"]);
    }
  }

  getJobreq(id: string): void {
    this.jobreqService.get(id)
      .subscribe({
        next: (data) => {
          this.currentJobreq = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: number): void {
    const data = {
      title: this.currentJobreq.title,
      description: this.currentJobreq.description,
      budget: this.currentJobreq.budget,
      published: status
    };
    this.message = '';
    this.jobreqService.update(this.currentJobreq.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentJobreq.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateJobreq(): void {
    this.message = '';
    this.jobreqService.update(this.currentJobreq.id, this.currentJobreq)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Job Requirement was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteJobreq(): void {
    this.jobreqService.delete(this.currentJobreq.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/tutorials']);
        },
        error: (e) => console.error(e)
      });
  }
}
