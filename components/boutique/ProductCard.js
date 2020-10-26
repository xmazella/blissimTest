import {
    Card,
    CardContent,
    CardActions,
    CardMedia,
    Typography,
    Button,
    withStyles,
    IconButton
} from '@material-ui/core'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useContext } from "react";
import GlobalContext from "../../state/global-context";

const useStyles = theme => ({
    root: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    content: {
        width: "100%",
    },
    thumbnailContainer: {
        padding: theme.spacing(2),
        textAlign: "cetner",
    },
    thumbnail: {
        maxHeight: '170px',
        width: "auto",
        margin: "auto",
    },
    name: {
        fontSize: '1rem',
    },
    footerBox: {
        width: "100%",
    },
    price: {
        marginLeft: 'auto',
        fontSize: "18px"
    }
});

const ProductCard = (props) => {
    const { classes, product } = props
    const context = useContext(GlobalContext);

    const handleAddToCart = (e, product) => {
        context.addProductToCart(product, context.pushObject('open_interstitial', true))
    }

    const handleaddProductToWishList = (e, product) => {
        if (product.favorite === false)
            context.addProductToWishList(product, context.pushObject('open_interstitialWishList', true))
        else
            context.removeProductToWishList(product)
    }

    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <div className={classes.thumbnailContainer}>
                    <CardMedia
                        component="img"
                        alt={product.title}
                        image={product.image}
                        className={classes.thumbnail}
                        title="Contemplative Reptile"
                    />
                </div>
                <Typography gutterBottom component="h2" className={classes.name}>
                    {product.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {product.desc}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.footerBox} >
                <IconButton onClick={e => handleAddToCart(e, product)}>
                    <ShoppingBasketIcon color="secondary" />
                </IconButton>
                <IconButton onClick={e => handleaddProductToWishList(e, product)} >{
                    (() => {
                        if (product.favorite === true)
                            return <FavoriteIcon color="secondary" />
                        else
                            return <FavoriteBorderIcon color="secondary" />
                    }
                    )()
                }



                </IconButton>
                <Typography className={classes.price} variant="body2" color="textSecondary" component="p">
                    {
                        new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(product.price)
                    }
                </Typography>
            </CardActions>
        </Card >
    )
}

export default withStyles(useStyles)(ProductCard)