"use client"

import { useEffect, useState } from "react"
import { User } from "lucide-react"
import { Button } from "./ui/button"
import { CustomerType } from "@/schema"
import { Input } from "@/components/ui/input"
import { CustomerTableProps } from "@/lib/types"
import EditVariantButton from "./EditVariantButton"
import EditProductButton from "./EditProductButton"
import DeleteProductButton from "./DeleteProductButton"
import { productsColumns } from "@/lib/columnDefinitions"
import { customersColumns } from "@/lib/columnDefinitions"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ColumnFiltersState, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"

function CustomersTable({ data }: CustomerTableProps) {

    const [sorting, setSorting] = useState<SortingState>([])
    const [customers, setCustomers] = useState<CustomerType[]>(data)
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [pageSize, setPageSize] = useState<number>(7)
    const [pageIndex, setPageIndex] = useState<number>(0)

    const table = useReactTable({
        columns: customersColumns,
        data: customers,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        initialState: {
            pagination: {
                pageSize: 7,
            }
        },
        state: {
            sorting,
            columnFilters,
            pagination: {
                pageIndex,
                pageSize
            }
        }
    })

    useEffect(() => {
        setCustomers(data)
    }, [data])

    const handlePageChange = (pageIndex: string) => {
        setPageSize(Number(pageIndex))
    }

    return (<div className="flex flex-col grow">
        <div className="flex items-center py-4 justify-between">
            <Input
                placeholder="Filtrar por nombre"
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                onChange={(event) => {
                    return table.getColumn("name")?.setFilterValue(event.target.value)
                }}
                className="max-w-sm"
            />
            <Select onValueChange={handlePageChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Cant. de Clientes" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="7">7</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="grow">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    <span key={header.id}>{header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}</span>
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => {
                                    if (cell.column.id === "active") {
                                        return (
                                            <TableCell key={cell.id}>
                                                {row.original.active ? "Sin Deuda" : "Con Deuda"}
                                            </TableCell>
                                        )
                                    }
                              /*       if (cell.column.id === "actions") {
                                        return (
                                            <TableCell key={cell.id} className="flex items-center gap-2">
                                                <DeleteProductButton active={row.original.active} barcode={row.original.barcode} />
                                                <EditProductButton barcode={row.original.barcode} />
                                                {!row.original.isVariant && <EditVariantButton barcode={row.original.barcode} />}
                                            </TableCell>
                                        )
                                    } */
                                    return (
                                        <TableCell key={cell.id} className="" onDoubleClick={() => { console.log(cell) }}>
                                            <div className="grid grid-cols-[max-content_1fr] gap-2 place-content-center">
                                                {cell.column.id === "name" && <User className="h-6 w-6" />}
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                {cell.column.id === "lastName"}
                                            </div>
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={productsColumns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table >
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
            <Button
                variant="outline"
                size="sm"
                onClick={() => {
                    setPageIndex(pageIndex - 1)
                    table.setPageIndex(pageIndex)
                }}
                disabled={!table.getCanPreviousPage()}
            >
                Previous
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() => {
                    setPageIndex(pageIndex + 1)
                    table.setPageIndex(pageIndex)
                }}
                disabled={!table.getCanNextPage()}
            >
                Next
            </Button>
        </div>
    </div>)
}

export default CustomersTable;