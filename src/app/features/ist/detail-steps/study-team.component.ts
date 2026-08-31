import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TeamMember {
  fullName: string;
  occupation: string;
  emailId: string;
}

@Component({
  selector: 'app-study-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './study-team.component.html',
  styleUrl: './study-team.component.css'
})
export class StudyTeamComponent implements OnInit {
  public teamMembers: TeamMember[] = [
    {
      fullName: 'Dr. Amelia Smith',
      occupation: 'Principal Investigator',
      emailId: 'dr.smith@hospital.org'
    }
  ];

  ngOnInit(): void {}

  addMember(): void {
    this.teamMembers.push({
      fullName: 'Dr. Sarah Mitchell',
      occupation: 'Co-Investigator',
      emailId: 's.mitchell@research.org'
    });
  }

  removeMember(index: number): void {
    this.teamMembers.splice(index, 1);
  }
}
