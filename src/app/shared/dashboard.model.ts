export interface TestType {
  id: number;
  name: string;
}

export interface Products {
  id: number;
  name: string;
}

export interface DashboardState {
  testTypeId: number;
  productId?: number;
  totalAmount: number;
  maxAmountOfTests: number;
  testData: TestResults[] | undefined;
}

export interface TestResults {
  id: number;
  name: string;
  testAmount: number;
}
