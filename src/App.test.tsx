import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

// Mock the Layout component
jest.mock("./components/Layout", () => {
  return (props: { children: React.ReactNode }) => <div data-testid="layout">{props.children}</div>;
});

// Mock the AppRoutes component
jest.mock("./routes/AppRoutes", () => {
  return () => <div data-testid="app-routes">App Routes Content</div>;
});

// Mock the Firebase service
jest.mock("./services/firebase", () => ({
  app: { name: "MockFirebaseApp" },
  analytics: jest.fn(),
}));

describe("App Component", () => {
  it("renders without crashing and includes Layout and AppRoutes", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    const { getByTestId } = render(<App />);

    // Verify Layout is rendered
    expect(getByTestId("layout")).toBeInTheDocument();

    // Verify AppRoutes is rendered
    expect(getByTestId("app-routes")).toBeInTheDocument();

    // Check console.log for Firebase initialization
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith("Firebase App Initialized:", { name: "MockFirebaseApp" });

    logSpy.mockRestore();
  });
});
