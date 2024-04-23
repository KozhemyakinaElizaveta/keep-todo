import { useState, useEffect, useMemo } from 'react';
import { getCurrentUser } from './Wrapper';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Table, Thead, Tbody, Tr, Th, Td, Flex, IconButton, Menu, MenuButton, MenuList, MenuItem, Input } from "@chakra-ui/react";
import { ArrowUpDownIcon, HamburgerIcon, SearchIcon } from '@chakra-ui/icons';

const columnHelper = createColumnHelper<any>(); 
const columns = [
    columnHelper.accessor("task", {
        header: "Task",
    }),
    columnHelper.accessor("completed", {
        header: "Completed",
    }),
];

export const TodosTable = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [sortBy, setSortBy] = useState<{ id: string; desc: boolean }>({ id: "", desc: false });
    const [filterCompleted, setFilterCompleted] = useState<boolean | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        const usersString = localStorage.getItem("users");
        const usersData = usersString ? JSON.parse(usersString) : [];
        setUsers(usersData);
    }, []);

    useEffect(() => {
        setData(getCurrentTodos());
    }, [users]);

    const getCurrentTodos = () => {
        const currentUser = getCurrentUser();
        const currentTodos = users.map(curuser => {
            if (curuser.username === currentUser.username) {
                return curuser.todos;
            } else {
                return [];
            }
        });

        return currentTodos.flat();
    };

    const handleSortBy = (id: string) => {
        setSortBy(prevSortBy => ({
            id,
            desc: prevSortBy.id === id ? !prevSortBy.desc : false,
        }));
    };

    const handleFilterCompleted = (value: boolean | null) => {
        setFilterCompleted(value);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const sortedData = useMemo(() => {
        if (!sortBy.id) return data;
        return [...data].sort((a, b) => {
            const aValue = a[sortBy.id];
            const bValue = b[sortBy.id];
            if (typeof aValue === "string" && typeof bValue === "string") {
                return sortBy.desc ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
            }
            return 0;
        });
    }, [data, sortBy]);

    const filteredData = useMemo(() => {
        let filtered = sortedData;
        if (filterCompleted !== null) {
            filtered = filtered.filter(item => item.completed === filterCompleted);
        }
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(item => item.task.toLowerCase().includes(query));
        }
        return filtered;
    }, [sortedData, filterCompleted, searchQuery]);

    const table = useReactTable(
        {
            data: filteredData,
            columns,
            getCoreRowModel: getCoreRowModel(),
        }
    );

    return (
        <>
            <Flex align="center" mb={4} alignItems={'center'} >
                <Input
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearch}
                    variant="outline"
                    size="sm"
                    mr={2}
                    bg={'white'}
                    width="30rem"
                    borderRadius={'10px'}
                />
                <IconButton
                    aria-label="Search"
                    icon={<SearchIcon />}
                    size="sm"
                    onClick={() => {}}
                    color={'blue.800'}
                />
            </Flex>
            <Flex direction="column" bgColor='white' padding={'1rem'} borderRadius={'20px'} maxHeight={'80vh'}>
                <Table variant="striped" bg={'white'} width={'60rem'} >
                <Thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr borderBottom="2px solid" borderColor="lightblue.200" key={headerGroup.id} >
                                {headerGroup.headers.map((header) => (
                                    <Th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : (
                                                <>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {header.id === 'task' && (
                                                            <IconButton
                                                                aria-label="Sort ascending"
                                                                icon={<ArrowUpDownIcon/>}
                                                                size="xs"
                                                                onClick={() => handleSortBy('task')}
                                                                mx={2}
                                                            />
                                                    )}
                                                    {header.id === 'completed' && (
                                                        <Menu>
                                                            <MenuButton
                                                                as={IconButton}
                                                                aria-label="Toggle filter"
                                                                icon={<HamburgerIcon/>}
                                                                size="xs"
                                                                ml={2}
                                                            />
                                                            <MenuList>
                                                                <MenuItem onClick={() => handleFilterCompleted(null)}>All</MenuItem>
                                                                <MenuItem onClick={() => handleFilterCompleted(true)}>Completed</MenuItem>
                                                                <MenuItem onClick={() => handleFilterCompleted(false)}>Uncompleted</MenuItem>
                                                            </MenuList>
                                                        </Menu>
                                                    )}
                                                </>
                                            )}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {table.getRowModel().rows.map((row) => (
                            <Tr key={row.id} _hover={{color: "blue.600"}}>
                                {row.getVisibleCells().map((cell) => (
                                    <Td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                {/* <Flex justify="center" mt={4} gap={'1rem'} alignItems={'center'}>
                    <IconButton
                        aria-label="Previous page"
                        icon={<ChevronLeftIcon />}
                        size="sm"
                        onClick={handlePrevPage}
                        disabled={pageIndex === 0}
                    />
                    <span>{`Page ${pageIndex + 1}`}</span>
                    <IconButton
                        aria-label="Next page"
                        icon={<ChevronRightIcon />}
                        size="sm"
                        onClick={handleNextPage}
                        disabled={pageIndex === Math.ceil(filteredData.length / pageSize) - 1}
                    />
                </Flex> */}
            </Flex>
        </>
    );
};

export default TodosTable;