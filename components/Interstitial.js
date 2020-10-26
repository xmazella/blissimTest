import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { withStyles, Typography, Button, Grid, Card, IconButton, CardMedia, Badge } from '@material-ui/core'
import { useContext } from 'react'
import GlobalContext from '../state/global-context';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
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

    deleteIcon: {
        position: "absolute",
        right: 0,
        bottom: 0,
    }
});

const Interstitial = props => {
    const { classes } = props;
    const context = useContext(GlobalContext);
    const cart = context.cart
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        getTotalPrice()
    })

    const handleRemoveProduct = id => {
        context.removeProductToCart(id)
    }

    const getTotalPrice = () => {
        let totalPrice = 0;
        cart.map(p => {
            totalPrice += p.price * p.quantity
        })
        return setTotalPrice(totalPrice)
    }

    return (
        <SwipeableDrawer
            anchor={'right'}
            open={context.open_interstitial}
            onClose={() => context.pushObject('open_interstitial', false)}
            onOpen={() => context.pushObject('open_interstitial', false)}
        >
            <div className={classes.interstitial}>
                <Grid container alignItems="center" className={classes.productListContainer}>
                    <Grid item>
                        <IconButton onClick={() => context.pushObject('open_interstitial', false)}>
                            <ArrowBackIcon color="secondary" />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5">Mon panier</Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={2} className={classes.productListContainer}>

                    <Grid item xs={12}>
                        <Typography>
                            {context.cart.length > 1 ? `${context.cart.length} produits` : `${context.cart.length} produit`}
                        </Typography>
                    </Grid>

                    {cart.map((product, index) => (
                        <Grid item xs={12} key={index}>
                            <Badge badgeContent={product.quantity} color="secondary">
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
                                        <Typography>
                                            {
                                                new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(product.price * product.quantity)
                                            }
                                        </Typography>
                                        <IconButton onClick={() => handleRemoveProduct(product.id)} className={classes.deleteIcon}>
                                            <DeleteIcon color="secondary" />
                                        </IconButton>
                                    </div>
                                </Card>
                            </Badge>
                        </Grid>
                    ))}
                </Grid>

                <Typography gutterBottom>Prix total :     {
                    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalPrice)
                }</Typography>
                <Button color="primary" variant="contained">Commander</Button>
            </div>
        </SwipeableDrawer>
    )
}

export default withStyles(useStyles)(Interstitial)