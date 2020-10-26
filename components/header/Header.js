import { withStyles, AppBar, Toolbar, Typography, IconButton, Container, Badge } from '@material-ui/core'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Link from 'next/link'
import Interstitial from '../Interstitial'
import InterstitialWishList from '../InterstitialWishList'
import { useContext, useState, useEffect } from "react";
import GlobalContext from "../../state/global-context";

const useStyles = theme => ({
    toolbar: {
        padding: 0,
        display: "flex",
        justifyContent: "space-between",
    },
    cartIcon: {
        color: theme.palette.light,
    },
    wishListIcon: {
        color: theme.palette.light,
    }
});

const Header = props => {
    const { classes } = props
    const context = useContext(GlobalContext);

    const toggleDrawer = (open, interstitial) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        context.pushObject(interstitial, true);
    };

    return (
        <>
            <header className={classes.root}>
                <AppBar position="static" elevation={0}>
                    <Container maxWidth="lg">
                        <Toolbar className={classes.toolbar}>
                            <Link href="/" passHref>
                                <a>
                                    <Typography variant="h4" className={classes.title}>
                                        SuperShop
                                </Typography>
                                </a>
                            </Link>
                            <div>
                                <IconButton onClick={toggleDrawer(!context.open_interstitial, 'open_interstitialWishList')}>
                                    <Badge badgeContent={context.wishList.length} color="secondary">
                                        <FavoriteIcon className={classes.wishListIcon} />
                                    </Badge>
                                </IconButton>
                                <IconButton onClick={toggleDrawer(!context.open_interstitial, 'open_interstitial')}>
                                    <Badge badgeContent={context.cart.length} color="secondary">
                                        <ShoppingBasketIcon className={classes.cartIcon} />
                                    </Badge>
                                </IconButton>
                            </div>
                        </Toolbar>
                    </Container>
                </AppBar>
            </header>
            <Interstitial />
            <InterstitialWishList />
        </>
    )
}

export default withStyles(useStyles)(Header)