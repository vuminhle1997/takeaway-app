import { AppBar, Badge, Icon, IconButton, Toolbar } from '@material-ui/core'
import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useHistory } from 'react-router';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { IBill } from '../../utils/types';

interface IHeaderProps {
    count: number;
    hasBill: boolean
    bill: IBill | undefined
}

export default function Header({
    count = 0,
    hasBill = false,
    bill
}: IHeaderProps) {
    const history = useHistory();
    return (
        <AppBar
            position="static"
        >
            <Toolbar>
                <IconButton onClick={() => history.push("/")}>
                    <HomeIcon />
                </IconButton>
                {
                    !hasBill && <IconButton onClick={() => history.push("/cart")}>
                        <Badge
                            badgeContent={count}
                            color="secondary"
                        > 
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                }
                {
                    hasBill && <IconButton onClick={() => history.push("/receipt", { bill: bill })}>
                        <ReceiptIcon />
                    </IconButton>
                }
            </Toolbar>
        </AppBar>
    )
}
