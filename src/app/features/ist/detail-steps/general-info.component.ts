import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-general-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './general-info.component.html',
  styleUrl: './general-info.component.css'
})
export class GeneralInfoComponent implements OnInit {
  public appId = 'DEMO-2026-008';
  public applicationTitle = 'Systematic Review of Oncology Outcomes';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.route.parent) {
      this.route.parent.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) this.appId = id;
      });
    }
  }
}
