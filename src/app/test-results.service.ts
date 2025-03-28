import { computed, Injectable, signal } from '@angular/core';
import {
  DashboardState,
  PlaywrightTestResults,
  Products,
} from './shared/dashboard.model';

const initialState: DashboardState = {
  testTypeId: 0,
  productId: undefined,
  totalAmountOfTests: 0,
  maxAmountOfTests: 0,
  testData: [],
};

@Injectable({
  providedIn: 'root',
})
export class TestResultsService {
  /**
   * Default hardcoded data
   */
  private playwrightResults: PlaywrightTestResults[] = [
    {
      id: 1,
      name: 'Car',
      amountOfApiTests: 8,
      amountOfAccessibilityTests: 5,
      amountOfE2ETests: 25,
      amountOfUiTests: 20,
      totalAmountOfTests: 58,
    },
    {
      id: 2,
      name: 'Health',
      amountOfApiTests: 5,
      amountOfAccessibilityTests: 10,
      amountOfE2ETests: 10,
      amountOfUiTests: 20,
      totalAmountOfTests: 45,
    },
    {
      id: 3,
      name: 'Sparen',
      amountOfApiTests: 6,
      amountOfAccessibilityTests: 10,
      amountOfE2ETests: 14,
      amountOfUiTests: 30,
      totalAmountOfTests: 60,
    },
    {
      id: 4,
      name: 'Top level',
      amountOfApiTests: 0,
      amountOfAccessibilityTests: 4,
      amountOfE2ETests: 4,
      amountOfUiTests: 4,
      totalAmountOfTests: 12,
    },
    {
      id: 5,
      name: 'Storybook',
      amountOfApiTests: 0,
      amountOfAccessibilityTests: 40,
      amountOfE2ETests: 0,
      amountOfUiTests: 40,
      totalAmountOfTests: 80,
    },
    {
      id: 6,
      name: 'Liability',
      amountOfApiTests: 1,
      amountOfAccessibilityTests: 6,
      amountOfE2ETests: 3,
      amountOfUiTests: 10,
      totalAmountOfTests: 20,
    },
  ];

  private jestResults: PlaywrightTestResults[] = [
    {
      id: 1,
      name: 'Car',
      totalAmountOfTests: 10,
    },
    {
      id: 2,
      name: 'Health',
      totalAmountOfTests: 20,
    },
    {
      id: 3,
      name: 'My Independer',
      totalAmountOfTests: 30,
    },
  ];

  private xUnitResults: PlaywrightTestResults[] = [
    {
      id: 1,
      name: 'Sparen',
      totalAmountOfTests: 0,
    },
    {
      id: 2,
      name: 'Beleggen',
      totalAmountOfTests: 0,
    },
  ];

  state = signal(initialState);
  testTypeId = computed(() => this.state().testTypeId);
  productId = computed(() => this.state().productId);
  totalAmountOfTests = computed(() => this.state().totalAmountOfTests);
  maxAmountOfTests = computed(() => this.state().maxAmountOfTests);
  testData = computed(() => this.state().testData);
  amountOfApiTests = computed(() => {
    const testData = this.state().testData;
    let total = 0;

    if (testData && testData.length > 0) {
      testData.forEach((element) => {
        total += element.amountOfApiTests ?? 0;
      });
    } else if (testData && testData.length === 1) {
      total = testData[0].amountOfApiTests ?? 0;
    }

    return total;
  });
  amountOfAccessibilityTests = computed(() => {
    const testData = this.state().testData;
    let total = 0;

    if (testData && testData.length > 0) {
      testData.forEach((element) => {
        total += element.amountOfAccessibilityTests ?? 0;
      });
    } else if (testData && testData.length === 1) {
      total = testData[0].amountOfAccessibilityTests ?? 0;
    }

    return total;
  });
  amountOfE2ETests = computed(() => {
    const testData = this.state().testData;
    let total = 0;

    if (testData && testData.length > 0) {
      testData.forEach((element) => {
        total += element.amountOfE2ETests ?? 0;
      });
    } else if (testData && testData.length === 1) {
      total = testData[0].amountOfE2ETests ?? 0;
    }

    return total;
  });
  amountOfUiTests = computed(() => {
    const testData = this.state().testData;
    let total = 0;

    if (testData && testData.length > 0) {
      testData.forEach((element) => {
        total += element.amountOfUiTests ?? 0;
      });
    } else if (testData && testData.length === 1) {
      total = testData[0].amountOfUiTests ?? 0;
    }

    return total;
  });

  // Default hardcoded test types
  getTestTypes() {
    return [
      { id: 1, name: 'Playwright' },
      { id: 2, name: 'Jest' },
      { id: 3, name: 'Xunit' },
    ];
  }

  // this is beeing triggert when the test type is changed
  updateTestTypeId(testTypeId: number) {
    this.state.update((newState) => ({ ...newState, testTypeId }));

    if (Number(testTypeId) !== 0) {
      this.state().testData = this.getData(testTypeId);
    } else {
      // Reset the data because nothing has been selected for test type
      this.state = signal(initialState);
      this.totalAmountOfTests = computed(() => this.state().totalAmountOfTests);
      this.getProducts(0);
    }
  }

  // this is beeing triggert when the project is changed
  updateProductId(productId: number) {
    this.state.update((newState) => ({ ...newState, productId }));

    if (Number(productId) !== 0) {
      this.state().testData = this.getData(this.state().testTypeId, productId);
    } else {
      // Reset the data because nothing has been selected for product
      this.state().testData = this.getData(this.state().testTypeId);
    }
  }

  /**
   * We return only the id and name of the projects
   * To populate the pulldownbox in the header
   *
   * @returns Products[]
   */
  getTestProjects(data: PlaywrightTestResults[]) {
    const projects: Products[] = [];

    data.forEach((project) => {
      projects.push({ id: project.id, name: project.name });
    });

    return projects;
  }

  /**
   * Filter the data based on the project id
   *
   * @param data full test results data
   * @param projectId optional project id
   * @returns filterd test result data
   */
  getResultsData(
    data: PlaywrightTestResults[],
    projectId?: number
  ): PlaywrightTestResults[] {
    const resultData = [];
    if (projectId) {
      const tempData = data.find(
        (project) => Number(project.id) === Number(projectId)
      );

      if (tempData) {
        this.state().totalAmountOfTests = tempData.totalAmountOfTests;
        resultData.push(tempData);
      }

      var { total, maxValue } = this.calculateAmounts(resultData);
      this.state().totalAmountOfTests = total;
      this.state().maxAmountOfTests = maxValue;

      return resultData;
    }

    var { total, maxValue } = this.calculateAmounts(data);
    this.state().totalAmountOfTests = total;
    this.state().maxAmountOfTests = maxValue;

    return data;
  }

  // Calculate the total amount of tests and the max amount of tests
  private calculateAmounts(data: PlaywrightTestResults[]) {
    let total = 0;
    var maxValue = -1;

    data.forEach((element) => {
      total += element.totalAmountOfTests;

      if ((element.totalAmountOfTests ?? 0) > maxValue) {
        maxValue = element.totalAmountOfTests ?? 0;
      }
    });

    return { total, maxValue };
  }

  // Get the products based on the test type
  getProducts(testTypeId: number) {
    switch (Number(testTypeId)) {
      case 1:
        return this.getTestProjects(this.playwrightResults);
      case 2:
        return this.getTestProjects(this.jestResults);
      case 3:
        return this.getTestProjects(this.xUnitResults);
      default:
        return [];
    }
  }

  /**
   * get the data based on the test type id
   *
   * @param testTypeId test type id
   * @param projectId project id
   * @returns filterd test result data
   */
  getData(testTypeId: number, projectId?: number): PlaywrightTestResults[] {
    switch (Number(testTypeId)) {
      case 1:
        return this.getResultsData(this.playwrightResults, projectId);
      case 2:
        return this.getResultsData(this.jestResults, projectId);
      case 3:
        return this.getResultsData(this.xUnitResults, projectId);
      default:
        return this.getResultsData(this.playwrightResults, projectId);
    }
  }
}
