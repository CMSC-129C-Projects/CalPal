/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/svelte";
import Card from "./Card.svelte";
import { formattedDate } from "../routes/_date-format";

describe("Card", () => {
  it("displays the title and date", async () => {
    const cardTitleString = "Test unarchived card";
    const dueDateString = "2021-05-28T00:00:00.000Z";
    const dueDate = new Date(dueDateString);

    const { getByText } = render(Card, {
      card: {
        _id: "60af87d2e22789c33805dadf",
        card_name: cardTitleString,
        original_title: "",
        original_calendar: "",
        original_date: "",
        date_created: "2021-05-27T11:51:46.274Z",
        due_date_time: dueDateString,
        remind_date_time: "",
        description: "",
        color: "#ffffff",
      },
      isArchived: false,
    });

    expect(getByText(cardTitleString)).toBeInTheDocument();
    expect(getByText(formattedDate(dueDate))).toBeInTheDocument();
  });

  it("displays the original date if there is no due date", async () => {
    const originalDateString = "2021-05-27T11:51:46.274Z";
    const originalDate = new Date(originalDateString);

    const { getByText } = render(Card, {
      card: {
        _id: "60af87d2e22789c33805dadf",
        card_name: "Test card",
        original_title: "",
        original_calendar: "",
        original_date: originalDateString,
        date_created: "2021-05-27T11:51:46.274Z",
        due_date_time: "",
        remind_date_time: "",
        description: "",
        color: "#ffffff",
      },
      isArchived: false,
    });

    expect(getByText(formattedDate(originalDate))).toBeInTheDocument();
  });

  it("is gray if it is archived", () => {
    const { container, getByTestId } = render(Card, {
      card: {
        _id: "60af87d2e22789c33805dadf",
        card_name: "Test card",
        original_title: "",
        original_calendar: "",
        original_date: "",
        date_created: "2021-05-27T11:51:46.274Z",
        due_date_time: "",
        remind_date_time: "",
        description: "",
        color: "#ffffff",
      },
      isArchived: true,
    });

    const card = container.firstChild.firstChild;
    expect(card).toHaveClass("card-parent");
    expect(card).toBeVisible();

    const cardStyle = window.getComputedStyle(card);
    expect(cardStyle.getPropertyValue("--card-color")).toEqual("#AAAAAA");
  });
});
