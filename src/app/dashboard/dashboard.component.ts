import { Component, computed, inject, Signal } from '@angular/core';
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
  totalAmountOfTests = this.testResultsService.totalAmountOfTests;

  maxAmountOfTests = this.testResultsService.maxAmountOfTests;
  testData = this.testResultsService.testData;
  productId = this.testResultsService.productId;
  amountOfApiTests = this.testResultsService.amountOfApiTests;
  amountOfAccessibilityTests =
    this.testResultsService.amountOfAccessibilityTests;
  amountOfE2ETests = this.testResultsService.amountOfE2ETests;
  amountOfUiTests = this.testResultsService.amountOfUiTests;
}
