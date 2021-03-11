import React from 'react'
import { IBill } from '../../utils/types'
import Header from '../header/Header'
import Receipt from './Receipt'

interface IReceiptPageProps {
    bill: IBill | undefined
}

export default function ReceiptPage({
    bill = undefined
}: IReceiptPageProps) {
    return (
        <>
            <Header
                count={0}
                hasBill={bill ? true : false}
                bill={bill}
            />
            <Receipt
                bill={bill}
            />
        </>
    )
}
