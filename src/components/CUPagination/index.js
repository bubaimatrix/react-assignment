import { Pagination, Stack } from '@mui/material';
import React from 'react';

function CUPagination({ numberOfPages, currentPage, onChange}) {
    return (
        numberOfPages > 0 &&
        <Stack spacing={10} style={{ padding: '20px 0 20px 10px' }}>
            <Pagination count={numberOfPages} color="primary" page={currentPage} onChange={onChange} />
        </Stack>
    );
}

export default CUPagination;