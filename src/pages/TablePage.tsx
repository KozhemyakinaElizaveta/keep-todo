import { Flex } from "@chakra-ui/react"
import TodosTable from "../widgets/TodosTable"

const TablePage = () => {
    return (
        <Flex flexDirection={'column'} alignItems={'center'} mt={'3rem'}>
            <TodosTable/>
        </Flex>
    )
}

export default TablePage