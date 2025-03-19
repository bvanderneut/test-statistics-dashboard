import { computed, Injectable, signal } from '@angular/core';
import {
  DashboardState,
  TestResults,
  Products,
} from './shared/dashboard.model';

const initialState: DashboardState = {
  testTypeId: 0,
  productId: undefined,
  totalAmount: 0,
  maxAmountOfTests: 0,
  testData: [],
};

@Injectable({
  providedIn: 'root',
})
export class TestResultsService {
  state = signal(initialState);
  testTypeId = computed(() => this.state().testTypeId);
  productId = computed(() => this.state().productId);
  totalAmount = computed(() => this.state().totalAmount);
  maxAmountOfTests = computed(() => this.state().maxAmountOfTests);
  testData = computed(() => this.state().testData);

  // this is beeing triggert when the test type is changed
  updateTestTypeId(testTypeId: number) {
    this.state.update((newState) => ({ ...newState, testTypeId }));

    if (Number(testTypeId) !== 0) {
      this.state().testData = this.getData(testTypeId);
    } else {
      // Reset the data because nothing has been selected for test type
      this.state = signal(initialState);
      this.totalAmount = computed(() => this.state().totalAmount);
      this.getProducts(testTypeId);
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
   * Default hardcoded data
   */
  private playwrightResults: TestResults[] = [
    {
      id: 1,
      name: 'Car',
      testAmount: 10,
    },
    {
      id: 2,
      name: 'Health',
      testAmount: 9,
    },
    {
      id: 3,
      name: 'Sparen',
      testAmount: 8,
    },
    {
      id: 4,
      name: 'Top level',
      testAmount: 7,
    },
    {
      id: 5,
      name: 'Storybook',
      testAmount: 6,
    },
    {
      id: 6,
      name: 'Liability',
      testAmount: 5,
    },
  ];

  private jestResults: TestResults[] = [
    {
      id: 1,
      name: 'Car',
      testAmount: 100,
    },
    {
      id: 2,
      name: 'Health',
      testAmount: 50,
    },
    {
      id: 3,
      name: 'My Independer',
      testAmount: 30,
    },
  ];

  private xUnitResults: TestResults[] = [
    {
      id: 1,
      name: 'Sparen',
      testAmount: 248,
    },
    {
      id: 2,
      name: 'Beleggen',
      testAmount: 128,
    },
  ];

  // Default hardcoded test types
  getTestTypes() {
    return [
      { id: 1, name: 'Playwright' },
      { id: 2, name: 'Jest' },
      { id: 3, name: 'Xunit' },
    ];
  }

  /**
   * We return only the id and name of the projects
   * To populate the pulldownbox in the header
   *
   * @returns Products[]
   */
  getTestProjects(data: TestResults[]) {
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
  getResultsData(data: TestResults[], projectId?: number): TestResults[] {
    const resultData = [];
    if (projectId) {
      const tempData = data.find(
        (project) => Number(project.id) === Number(projectId)
      );

      if (tempData) {
        this.state().totalAmount = tempData.testAmount;
        resultData.push(tempData);
      }

      return resultData;
    }

    var { total, maxValue } = this.calculateAmounts(data);

    this.state().totalAmount = total;
    this.state().maxAmountOfTests = maxValue;

    return data;
  }

  // Calculate the total amount of tests and the max amount of tests
  private calculateAmounts(data: TestResults[]) {
    let total = 0;
    var maxValue = -1;

    data.forEach((element) => {
      total += element.testAmount;
      if (element.testAmount > maxValue) {
        maxValue = element.testAmount;
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
  getData(testTypeId: number, projectId?: number): TestResults[] {
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
