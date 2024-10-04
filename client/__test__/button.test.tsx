import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "@/app/components/ui/button";

describe("Button component", () => {
   it("renders correctly with default props", () => {
      render(<Button>Default Button</Button>);
      const buttonElement = screen.getByText("Default Button");
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass("bg-primary text-primary-foreground");
   });

   it("renders correctly with variant and size props", () => {
      render(
         <Button variant="destructive" size="lg">
            Destructive Button
         </Button>
      );
      const buttonElement = screen.getByText("Destructive Button");
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass(
         "bg-destructive text-destructive-foreground h-10 rounded-md px-8"
      );
   });

   it("renders correctly with asChild prop", () => {
      render(
         <Button asChild>
            <a href="#">Link Button</a>
         </Button>
      );
      const linkElement = screen.getByText("Link Button");
      expect(linkElement).toBeInTheDocument();
      expect(linkElement.tagName).toBe("A");
   });

   it("applies additional class names", () => {
      render(<Button className="extra-class">Button with Extra Class</Button>);
      const buttonElement = screen.getByText("Button with Extra Class");
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass("extra-class");
   });
});
