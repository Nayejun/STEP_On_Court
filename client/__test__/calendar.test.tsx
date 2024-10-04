import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CustomCalendar } from "@/app/components/ui/calendar";

describe("CustomCalendar", () => {
   test("renders without crashing", () => {
      const { getByText } = render(<CustomCalendar />);
      expect(getByText(/테스트/i)).toBeInTheDocument();
   });

   test("displays the selected date", () => {
      const { getByText } = render(<CustomCalendar />);
      const today = new Date().toDateString();
      expect(getByText(`테스트 ${today}`)).toBeInTheDocument();
   });

   test("opens prompt and adds event on day click", () => {
      const promptSpy = jest
         .spyOn(window, "prompt")
         .mockImplementation(() => "New Event");
      const { getByText, getAllByRole } = render(<CustomCalendar />);

      const dayTiles = getAllByRole("button");
      fireEvent.click(dayTiles[0]);

      expect(promptSpy).toHaveBeenCalled();
      expect(getByText("New Event")).toBeInTheDocument();

      promptSpy.mockRestore();
   });

   test("does not add event if prompt is cancelled", () => {
      const promptSpy = jest
         .spyOn(window, "prompt")
         .mockImplementation(() => null);
      const { getAllByRole, queryByText } = render(<CustomCalendar />);

      const dayTiles = getAllByRole("button");
      fireEvent.click(dayTiles[0]);

      expect(promptSpy).toHaveBeenCalled();
      expect(queryByText("New Event")).not.toBeInTheDocument();

      promptSpy.mockRestore();
   });
});
