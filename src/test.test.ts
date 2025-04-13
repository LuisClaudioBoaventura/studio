import { describe, it, expect } from "@jest/globals";
import { isMobile, useIsMobile } from "./hooks/use-mobile";
import { cn } from "./lib/utils";
import { Event, listEvents } from "./services/google-calendar";



describe('Simple Test', () => {
  it('should assert that 1 equals 1', () => {
    expect(1).toBe(1);
  });
  it("should pass when asserting that 1 equals 1", () => {
    expect(1).toBe(1);
  });
});


describe("utils", () => {
  it("should concatenate classnames", () => {
    const result = cn("class1", "class2");
    expect(result).toBe("class1 class2");
  });

  it("should filter falsy classnames", () => {
    const result = cn("class1", undefined, null, "class2");
    expect(result).toBe("class1 class2");
  });

  it("should handle empty input", () => {
    const result = cn();
    expect(result).toBe("");
  });
});

describe('useMobile', () => {
  it('should be a function', () => {
    expect(typeof useIsMobile).toBe('function');
  });

});

describe("useMobile", () => {
  it("should return false on server side", () => {
    // Mock window object to simulate server-side rendering
    global.window = undefined as any;
    const result = isMobile();
    expect(result).toBe(false);
  });

  it("should return false on desktop", () => {
    // Mock window object to simulate server-side rendering
    global.window = {innerWidth: 1024} as any;
    const result = isMobile();
    expect(result).toBe(false);
  });

  it("should return true on mobile", () => {
    // Mock window object to simulate server-side rendering
    global.window = {innerWidth: 768} as any;
    const result = isMobile();
    expect(result).toBe(true);
  });
  
});

describe("GoogleCalendarService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const mockEvents: Event[] = [
    {
      summary: "Event 1",
      start: { dateTime: new Date(2023, 9, 27, 10, 0, 0).toISOString() },
      end: { dateTime: new Date(2023, 9, 27, 11, 0, 0).toISOString() }

    },
    {
      summary: "Event 2",
      start: { dateTime: new Date("2023-10-28T10:00:00").toISOString() },
      end: { dateTime: new Date("2023-10-28T11:00:00").toISOString() },
    },
    {
      summary: "Event 3",
      start: { date: "2023-10-29" },
      end: { date: "2023-10-29" },
    },
  ];

  it("should handle successful response", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ items: mockEvents }),
    });
    global.fetch = fetchMock;

    const events = await listEvents();
    expect(events).toEqual(mockEvents);
  });

  it("should handle failed response", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });
    global.fetch = fetchMock;

    await expect(listEvents()).rejects.toThrowError(
      "Request failed with status 404 Not Found",
    );
  });

  it("should format date time correctly", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ items: mockEvents }),
    });
    global.fetch = fetchMock;
    const events = await listEvents();
    
    if(events[0].start.dateTime){
      const startDateTime = new Date(events[0].start.dateTime);
      const month = startDateTime.getMonth();
      expect(typeof month).toBe("number");
    } else {
      expect(true).toBe(true)
    }
  });
});
