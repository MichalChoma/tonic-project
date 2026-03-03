import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoginForm } from "./LoginForm";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

const mockLogin = jest.fn();
jest.mock("@/store/authStore", () => ({
  useAuthStore: () => mockLogin,
}));

jest.mock("@/lib/auth", () => ({
  mockLogin: jest.fn(),
}));

import { mockLogin as mockLoginFn } from "@/lib/auth";

const getById = (id: string): HTMLElement => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Element #${id} not found`);
  return el;
};

const renderLoginForm = () => {
  const client = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  });
  return render(
    <QueryClientProvider client={client}>
      <LoginForm />
    </QueryClientProvider>
  );
};

describe("LoginForm", () => {
  beforeEach(() => jest.clearAllMocks());

  it("renders username and password inputs and a submit button", () => {
    renderLoginForm();

    expect(getById("username")).toBeInTheDocument();
    expect(getById("password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });

  it("shows 'Signing in...' while the request is pending", async () => {
    (mockLoginFn as jest.Mock).mockReturnValue(new Promise(() => {}));

    renderLoginForm();
    await userEvent.type(getById("username"), "user");
    await userEvent.type(getById("password"), "pass");
    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));

    expect(
      await screen.findByRole("button", { name: "Signing in..." })
    ).toBeDisabled();
  });

  it("redirects to / on successful login", async () => {
    (mockLoginFn as jest.Mock).mockResolvedValue({
      token: "tok",
      username: "user",
    });

    renderLoginForm();
    await userEvent.type(getById("username"), "user");
    await userEvent.type(getById("password"), "pass");
    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/"));
  });

  it("shows an error message on failed login", async () => {
    (mockLoginFn as jest.Mock).mockRejectedValue(
      new Error("Invalid credentials")
    );

    renderLoginForm();
    await userEvent.type(getById("username"), "wrong");
    await userEvent.type(getById("password"), "wrong");
    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));

    expect(await screen.findByText("Invalid credentials")).toBeInTheDocument();
  });
});
