import { AppBar, Badge, Icon, IconButton, Toolbar } from '@material-ui/core'
import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useHistory } from 'react-router';

interface IHeaderProps {
    count: number;
}

export default function Header({
    count = 0
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
                <IconButton
                    onClick={() => history.push("/cart")}
                >
                    <Badge
                        badgeContent={count}
                        color="secondary"
                    > 
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
