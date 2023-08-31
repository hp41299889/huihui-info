// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";

// import Header from "./header";
// import { pages } from "./option";

// describe("unit test: component-layout-header", () => {
//   it("render LOGO", () => {
//     render(<Header />);
//     expect(screen.getByText("LOGO")).toBeInTheDocument();
//   });

//   it("render tab buttons", () => {
//     render(<Header />);
//     pages.forEach((page) => {
//       const linkButton = screen.getByText(page.label);
//       userEvent.click(linkButton);
//       const link = linkButton.closest("a");
//       expect(link).toHaveAttribute("href", page.href);
//     });
//   });
// });
