import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";

export default class DependencyManager {
  // singletone imp
  private static _instance: DependencyManager;
  private serviceScope: ServiceScope;
  private constructor() {}

  public static getInstance(): DependencyManager {
    if (!DependencyManager._instance) {
      DependencyManager._instance = new DependencyManager();
    }

    return DependencyManager._instance;
  }

  public configure(rootServiceScope: ServiceScope) {
    this.serviceScope = rootServiceScope;
  }

  public inject<TService>(serviceKey: ServiceKey<TService>): TService {
    if (this.serviceScope) {
      return this.serviceScope.consume(serviceKey);
    } else {
      return null;
    }
  }
}
