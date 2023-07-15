import { Box, Typography, Pagination } from "@mui/material";
import { MetaData } from "../models/Pagination";

interface Props {
    metaData: MetaData;
    onPageChange: (page: number) => void;
}

export default function AppPagination({ metaData, onPageChange }: Props) {
    const { totalCount, pageSize, currentPage, totalPages } = metaData;
    return (
        <Box display='flex' justifyContent="space-between" alignItems='center'>
            <Typography>
                Displaying {(currentPage-1)*totalPages+1}-
                {currentPage * pageSize > totalCount
                    ? totalCount
                    : currentPage * pageSize } of {totalCount} items
            </Typography>
            <Pagination
                color="secondary"
                size="large"
                count={totalPages}
                page={currentPage}
                onChange={(e, page) => onPageChange(page)}
            />
        </Box>
    )
}