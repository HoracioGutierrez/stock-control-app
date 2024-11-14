export interface HelpData {
    cardId: string;
    cardIcon: string;
    cardTitle: string;
    cardDescription: string;
    cardCreatedAt: Date;
    headerId?: string;
    headerIcon?: string;
    headerTitle?: string;
    headerDescription?: string;
    helpCardId?: string;
    accordionId?: string;
    accordionTitle?: string;
    accordionDescription?: string;
    contentId?: string;
    contentIcon?: string;
    contentDescription?: string;
    contentSubDescription?: string;
}

export interface HelpSearchBarProps {
    filteredData: HelpData[];
    data: HelpData[];
    error: string | null;
    message: string | null;
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: () => void;
    highlightMatches: (text: string, query: string) => string | JSX.Element;
  }