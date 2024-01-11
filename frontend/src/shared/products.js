import React, { useState, useEffect } from 'react';
import { redirect } from 'next/navigation'
import { NormalButton } from "./widget";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { ProductsContainer } from '@/ui/products';
import { isLogin, bindURL } from './utils';
import { DEBUG, LOGIN } from "./config.js"

const Products = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('latest');

    const initProduct = (json) => {
        setProducts(json);
    };

    const refreshTopic = (event, selectedCategory) => {
        const path = selectedCategory ? `/api/product/${selectedCategory}` : '/api/product';
        setCategory(selectedCategory);

        fetch(bindURL + path, {
            credentials: 'include',
        })
            .then((response) => response.json())
            .then(initProduct)
            .catch((ex) => {
                console.log('Refresh product failed', ex);
            });
    };

    useEffect(() => {
        if (DEBUG) {
            const example_product = {
                "_id": "114514",
                "name": "Apple iPhone 14, 128G",
                "description": "a powerful...",
                "category": "electronics",
                "price": 400.00,
                "stock": 10,
                "image": "https://www.att.com/scmsassets/global/devices/phones/apple/apple-iphone-14-pro/carousel/deeppurple/deeppurple1.png"
            }
            initProduct(Array.from({ length: 10 }, () => example_product));
        } else {
            fetch(bindURL + '/api/product', {
                credentials: 'include',
            })
                .then((response) => response.json())
                .then(initProduct)
                .catch((ex) => {
                    console.log('Init product failed', ex);
                });
        }
    }, []);

    const productList = products.map((product, index) => (
        <ProductEntry product={product} key={`product${index}`} id={index} />
    ));

    const handleChange = (event) => {
        refreshTopic(event, event.target.value); // keep the format of the legacy code
    };

    return (
        <ProductsContainer>
            <div className="mod_wrap">
                <div className="forumbox">
                    <div className="forum_spacer">
                        <h2 className="forum-topics-title">Products</h2>
                        {isLogin() ? (
                            <div>
                                <NormalButton variant="outlined" href="/product/create">
                                    New
                                </NormalButton>
                            </div>
                        ) : (
                            <div></div>
                        )}
                        <div className="thread-order">
                            <InputLabel id="product-order-label">Order</InputLabel>
                            <Select
                                labelId="product-order-label"
                                id="product-order"
                                value={category}
                                label="Order"
                                onChange={handleChange}
                            >
                                <MenuItem value={'latest'}>Latest</MenuItem>
                                <MenuItem value={'low'}>Low to High</MenuItem>
                                <MenuItem value={'high'}>High to Low</MenuItem>
                            </Select>
                        </div>
                    </div>
                    
                    <div className="product-card-list">
                        {productList}
                    </div>
                </div>
            </div>
        </ProductsContainer>
    );
};

const ProductEntry = ({ product }) => {
    const handleClick = () => {
        redirect('/product/'+product._id);
    };
    return (
        <Card sx={{ maxWidth: 180, marginRight: "15px", marginBottom: "15px" }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.name}
                    onClick={handleClick}
                />
                <CardContent>
                    <div className="product-name">{product.name}</div>
                    <div className="product-price">${product.price}</div>
                    <div className="product-op">
                        {isLogin() ? (
                            <div></div>
                            ) : (
                            <div></div>
                        )}
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default Products;