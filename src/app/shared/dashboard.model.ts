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
  totalAmountOfTests: number;
  maxAmountOfTests: number;
  testData: PlaywrightTestResults[] | undefined;
}

export interface PlaywrightTestResults {
  id: number;
  name: string;
  totalAmountOfTests: number;
  amountOfApiTests?: number;
  amountOfAccessibilityTests?: number;
  amountOfE2ETests?: number;
  amountOfUiTests?: number;
}
