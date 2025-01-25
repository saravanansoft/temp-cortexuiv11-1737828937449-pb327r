export interface Environment {
  apiBaseUrl: string;
  apiVersion: string;
}

const environments: Record<string, Environment> = {
  development: {
    apiBaseUrl: "https://cortexcatalystapi-dev.azurewebsites.net",
    apiVersion: "v1",
  },
  uat: {
    apiBaseUrl: "https://cortexcatalystapi-uat.azurewebsites.net",
    apiVersion: "v1",
  },
  production: {
    apiBaseUrl: "https://cortexcatalystapi.azurewebsites.net",
    apiVersion: "v1",
  },
};

const currentEnv = import.meta.env.VITE_APP_ENV || "development";

export const environment: Environment = environments[currentEnv];
