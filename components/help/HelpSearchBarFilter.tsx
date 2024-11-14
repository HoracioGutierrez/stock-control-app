"use client"

import { useEffect, useState } from "react"
import { HelpData } from "./types"
import { fetchHelpData } from "./fetchHelpData"
import HelpSearchBar from "./HelpSearchBar"

function HelpSearchBarFilter() {
    const [filteredData, setFilteredData] = useState<HelpData[]>([])
    const [data, setData] = useState<HelpData[]>([])
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const [query, setQuery] = useState<string>("")

    const highlightMatches = (text: string, query: string) => {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, "gi")
        const parts = text.split(regex)
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
        )
    }

    const handleSearch = () => {
        const filteredCards = data.filter(item => {
            const title = item.cardTitle.toLowerCase()
            const description = item.contentDescription ? item.contentDescription.toLowerCase() : ""
            return title.includes(query.toLowerCase()) || description.includes(query.toLowerCase())
        });
        setFilteredData(filteredCards)
    }

    useEffect(() => {
        handleSearch()
    }, [query])

    useEffect(() => {
        fetchHelpData().then((res: any) => {
            setData(res.data)
            setError(res.error)
            setMessage(res.message)
        })
    }, [])

    const props = {
        filteredData,
        data,
        error,
        message,
        query,
        setQuery,
        handleSearch,
        highlightMatches
    }

    return (<HelpSearchBar {...props} />)
}

export default HelpSearchBarFilter