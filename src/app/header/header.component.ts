import { Component, inject, OnInit, Signal } from '@angular/core';
import { TestResultsService } from '../test-results.service';
import { Products, TestType } from '../shared/dashboard.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  testTypes: TestType[] = [];
  testResultsService = inject(TestResultsService);
  testTypeId: Signal<number> = this.testResultsService.testTypeId;
  products: Products[] = this.testResultsService.getProducts(this.testTypeId());

  ngOnInit(): void {
    this.testTypes = this.testResultsService.getTestTypes();
  }

  onTestTypeChange(testTypeEvent: any): void {
    this.testResultsService.updateTestTypeId(testTypeEvent.target.value);
    this.products = this.testResultsService.getProducts(this.testTypeId());
  }

  onProductChange(productEvent: any): void {
    this.testResultsService.updateProductId(productEvent.target.value);
    this.products = this.testResultsService.getProducts(this.testTypeId());
  }
}
