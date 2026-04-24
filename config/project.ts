import { devices } from "@playwright/test";

export interface ProjectConfig {
  name: string;
  use: any;
}

// Multiple Browser Support
export function createProjects(browserNames: string[]): ProjectConfig[] {
  return browserNames.map((browserName) => {
    const projectName = browserName || "chromium";
    const deviceName = getDeviceName(browserName);

    return {
      name: projectName,
      use: {
        ...devices[deviceName as keyof typeof devices],
      },
    } as ProjectConfig;
  });
}

//Single Browser Support
export function createProject(browserName: string): Array<{
  name: string;
  use: any;
}> {
  const projectName = browserName || "chromium";
  const deviceName = getDeviceName(browserName);

  return [
    {
      name: projectName,
      use: {
        ...devices[deviceName as keyof typeof devices],
        // Add other use properties
        //headless: process.env.HEADLESS === 'true',
        //viewport: { width: 1280, height: 720 }
      },
    },
  ];
}

function getDeviceName(browserName: string): string {
  const defaults: Record<string, string> = {
    chromium: "Desktop Chrome",
    firefox: "Desktop Firefox",
    webkit: "Desktop Safari",
    pixel5: "Pixel 5",
    iPhone12: "iPhone 12",
    edge : "Desktop Edge",
  };
  return defaults[browserName] || "Desktop Chrome";
}
