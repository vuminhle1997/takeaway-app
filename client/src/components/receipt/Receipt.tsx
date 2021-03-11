import { Container, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { IBill } from '../../utils/types'

interface IReceiptProps {
    bill: IBill | undefined
}

export default function Receipt({
    bill
}: IReceiptProps) {
    return (
        <>
            {
                bill && <Container>
                <Paper>
                    <Typography>
                        Total: {bill?.total}
                    </Typography>
                </Paper>
            </Container>
            }
        </>
    )
}
