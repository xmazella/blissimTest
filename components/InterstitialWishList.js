import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { withStyles, Typography, Button, Grid, Card, IconButton, CardMedia } from '@material-ui/core'
import { useContext } from 'react'
import GlobalContext from '../state/global-context';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useEffect, useState } from "react";

const useStyles = theme => ({
    interstitial: {
        width: "350px",
        padding: theme.spacing(2)
    },
    productListContainer: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },

    productItem: {
        padding: theme.spacing(2),
        position: 'relative',
        display: "flex",

    },

    productItemImg: {
        width: "100px",
        height: "auto",
        maxHeight: "90px",
        marginRight: theme.spacing(2),
    },

    icon: {
        position: "absolute",
        right: 0,
        bottom: 0,
    }
});

const InterstitialWishList = props => {
    const { classes } = props;
    const context = useContext(GlobalContext);
    const wishList = context.wishList
    const [totalPrice, setTotalPrice] = useState(0)

    const handleRemoveProduct = product => {
        context.removeProductToWishList(product)
    }

    const handleAddToCart = (e, product) => {
        context.pushObject('open_interstitialWishList', false)
        context.addProductToCart(product, context.pushObject('open_interstitial', true))
    }

    return (
        <SwipeableDrawer
            anchor={'right'}
            open={context.open_interstitialWishList}
            onClose={() => context.pushObject('open_interstitialWishList', false)}
            onOpen={() => context.pushObject('open_interstitialWishList', false)}
        >
            <div className={classes.interstitial}>
                <Grid container alignItems="center" className={classes.productListContainer}>
                    <Grid item>
                        <IconButton onClick={() => context.pushObject('open_interstitialWishList', false)}>
                            <ArrowBackIcon color="secondary" />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5">Mes favoris</Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={2} className={classes.productListContainer}>

                    <Grid item xs={12}>
                        <Typography>
                            {context.wishList.length > 1 ? `${context.wishList.length} produits` : `${context.wishList.length} produit`}
                        </Typography>
                    </Grid>

                    {wishList.map((product, index) => (
                        <Grid item xs={12} key={index}>
                            <Card className={classes.productItem}>
                                <CardMedia
                                    component="img"
                                    alt={product.title}
                                    image={product.image}
                                    title="Contemplative Reptile"
                                    className={classes.productItemImg}
                                />
                                <div className={classes.productItemContent}>
                                    <Typography>{product.title}</Typography>
                                    <Typography>{product.price}€</Typography>
                                    <div className={classes.icon}>
                                        <IconButton onClick={e => handleAddToCart(e, product)}>
                                            <ShoppingBasketIcon color="secondary" />
                                        </IconButton>
                                        <IconButton onClick={() => handleRemoveProduct(product)} >
                                            <DeleteIcon color="secondary" />
                                        </IconButton>
                                    </div>
                                </div>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </SwipeableDrawer>
    )
}

export default withStyles(useStyles)(InterstitialWishList)