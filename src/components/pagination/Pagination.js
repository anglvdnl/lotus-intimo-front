import React, { useState } from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import styles from '../shop/Shop.module.scss'

function PaginationView({ itemsPerPage, totalItems, pagination }) {
    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        setPage(value);
        pagination(value)
    }

    return (
        <div className={styles.Pagination}>
            <Stack>
                <Pagination
                    count={Math.ceil(totalItems / itemsPerPage)}
                    variant="outlined"
                    shape="rounded"
                    onChange={handleChange}
                />
            </Stack>
        </div>

    )
}

export default PaginationView