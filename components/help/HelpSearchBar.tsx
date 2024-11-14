import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { IconZoomQuestion } from "@tabler/icons-react"
import { HelpSearchBarProps } from "./types"

function HelpSearchBar({ filteredData, data, error, message, query, setQuery, handleSearch, highlightMatches }: HelpSearchBarProps) {

  return (
    <>
      {error && query !== "" && <p>{error}</p>}
      {message && query !== "" && <p>{message}</p>}
      <div className="flex flex-col items-center gap-2 p-2">
        <div className="flex items-center gap-2 w-full">
          <Input
            placeholder="Buscar..."
            type="text"
            className="bg-accent dark:bg-primary-foreground"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            onClick={handleSearch}

            variant="outline"
            className="transition-transform hover:scale-[1.03] active:scale-[0.98] duration-10 p-2 gap-1 text-muted-foreground active:text-muted-foreground bg-accent dark:bg-primary-foreground"
          >
            <IconZoomQuestion className="w-5 text-muted-foreground dark:text-muted-foreground" />
            <span className="text-muted-foreground dark:text-muted-foreground">Buscar</span>
          </Button>
        </div>
        <div className="w-full mt-4">
          {query !== "" && data.length > 0 && filteredData.map((item) => (
            <div
              key={item.cardId}
              className="flex flex-col gap-2 p-2 rounded-md bg-accent dark:bg-primary-foreground"
            >
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground dark:text-muted-foreground">
                  {highlightMatches(item.cardTitle, query)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground dark:text-muted-foreground">
                  {highlightMatches(item.contentDescription ?? "", query)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HelpSearchBar;