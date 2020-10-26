import { createContext, Component } from 'react';
const GlobalContext = createContext();
import PropTypes from 'prop-types';

export class GlobalProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open_interstitial: false,
            open_interstitialWishList: false,
            cart: [],
            wishList: [],
            pushObject: this.pushObject.bind(this),
            getCart: this.getCart.bind(this),
            addProductToCart: this.addProductToCart.bind(this),
            removeProductToCart: this.removeProductToCart.bind(this),
            getWishList: this.getWishList.bind(this),
            addProductToWishList: this.addProductToWishList.bind(this),
            removeProductToWishList: this.removeProductToWishList.bind(this),
        }
    }

    pushObject(key, value, callback) {
        this.setState({ [key]: value }, callback);
    }

    getCart() {
        const sessionStorageCart = JSON.parse(sessionStorage.getItem('cart')); // null if not exist
        if (sessionStorageCart !== null) {
            this.setState({ cart: sessionStorageCart });
        } else {
            this.setState({ cart: [] });
        }
    }

    addProductToCart(product, callback) {
        const newCart = [...this.state.cart]
        var ProductIndex = newCart.findIndex(item => item.id === product.id)
        if (ProductIndex != -1) {
            newCart[ProductIndex].quantity++
        }
        else {
            product.quantity = 1
            newCart.push(product)
        }

        this.setState({ cart: newCart }, () => {
            sessionStorage.setItem('cart', JSON.stringify(newCart));

            if (typeof callback !== 'undefined') callback();
        });
    }

    removeProductToCart(id, callback) {
        const newCart = [...this.state.cart]
        // const ProductIndex = newCart.indexOf(p => {
        //     p.id === id
        // });
        var ProductIndex = newCart.findIndex(item => item.id === id)
        newCart.splice(ProductIndex, 1)
        this.setState({ cart: newCart }, () => {
            sessionStorage.setItem('cart', JSON.stringify(newCart));

            if (typeof callback !== 'undefined') callback();
        });
    }

    getWishList() {
        const sessionStorageWishList = JSON.parse(sessionStorage.getItem('wishList')); // null if not exist

        if (sessionStorageWishList !== null) {
            this.setState({ wishList: sessionStorageWishList });
        } else {
            this.setState({ wishList: [] });
        }
    }

    addProductToWishList(product, callback) {
        const newWishList = [...this.state.wishList]
        product.favorite = true;
        newWishList.push(product)
        this.setState({ wishList: newWishList }, () => {
            sessionStorage.setItem('wishList', JSON.stringify(newWishList));
            if (typeof callback !== 'undefined') callback();
        });
    }

    removeProductToWishList(product, callback) {
        const newWishList = [...this.state.wishList]
        product.favorite = false;


        var ProductIndex = newWishList.findIndex(item => item.id === product.id)
        newWishList.splice(ProductIndex, 1)
        this.setState({ wishList: newWishList }, () => {
            sessionStorage.setItem('wishList', JSON.stringify(newWishList));
            if (typeof callback !== 'undefined') callback();
        });
    }



    componentDidMount() {
        this.getCart()
    }

    render() {
        const { children } = this.props;

        return (
            <GlobalContext.Provider value={{ ...this.state }}>
                {children}
            </GlobalContext.Provider>
        );
    }
}

GlobalProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const GlobalConsumer = GlobalContext.Consumer;
export default GlobalContext;
