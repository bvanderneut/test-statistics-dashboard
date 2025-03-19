import { Component, inject } from '@angular/core';
import { TestResultsService } from '../test-results.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  testResultsService = inject(TestResultsService);
  totalAmount = this.testResultsService.totalAmount;

  maxAmountOfTests = this.testResultsService.maxAmountOfTests;
  testData = this.testResultsService.testData;
}
