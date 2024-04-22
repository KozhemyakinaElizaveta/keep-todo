import { useState, useEffect } from 'react';
import { getCurrentUser } from './Wrapper';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Table, Thead, Tbody, Tr, Th, Td, Flex } from "@chakra-ui/react";

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

    const [data, setData] = useState(getCurrentTodos());
    
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    

    return (
        <Flex bgColor='white' padding={'1rem'} borderRadius={'20px'} maxHeight={'80vh'}>
            <Table variant="striped" bg={'white'} width={'60rem'} >
                <Thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr borderBottom="2px solid" borderColor="lightblue.200" key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <Th key={header.id}>
                            {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
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
        </Flex>
    );
};

export default TodosTable;
