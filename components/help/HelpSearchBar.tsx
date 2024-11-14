"use client"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { IconZoomQuestion } from "@tabler/icons-react"
import { useState } from "react"

interface HelpSearchBarProps {
  cardsData: Array<{ id: string; title: string; description: string }>;
}

function HelpSearchBar({ cardsData }: HelpSearchBarProps) {
  const [filteredData, setFilteredData] = useState(cardsData);
  const [query, setQuery] = useState("");

  const highlightMatches = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <span
              key={index}
              className="bg-yellow-300 dark:bg-gray-600 text-primary dark:text-white"
            >
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const handleSearch = (query: string) => {
    setQuery(query);
    const filteredCards = cardsData.filter(card => {
      const title = card.title.toLowerCase();
      const description = card.description.toLowerCase();
      return title.includes(query.toLowerCase()) || description.includes(query.toLowerCase());
    });
    setFilteredData(filteredCards);
  };

  return (
    <div className="flex flex-col items-center gap-2 p-2">
      <div className="flex items-center gap-2 w-full">
        <Input
          placeholder="Buscar..."
          type="text"
          className="bg-accent dark:bg-primary-foreground"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Button
          variant="outline"
          className="transition-transform hover:scale-[1.03] active:scale-[0.98] duration-10 p-2 gap-1 text-muted-foreground active:text-muted-foreground bg-accent dark:bg-primary-foreground"
        >
          <IconZoomQuestion className="w-5 text-muted-foreground dark:text-muted-foreground" />
          <span className="text-muted-foreground dark:text-muted-foreground">Buscar</span>
        </Button>
      </div>
      <div className="w-full mt-4">
        {query !== "" && filteredData.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-2 p-2 rounded-md bg-accent dark:bg-primary-foreground"
          >
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground dark:text-muted-foreground">
                {highlightMatches(item.title, query)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground dark:text-muted-foreground">
                {highlightMatches(item.description, query)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HelpSearchBar;