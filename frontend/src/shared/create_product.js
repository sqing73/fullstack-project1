import React, { useState, useEffect } from 'react';
import { ProductsContainer } from '@/ui/products';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import InputAdornment from '@mui/material/InputAdornment';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';

import { NormalButton } from './widget';
export default function CreateProduct() {
    const handleSubmit = (event) => {
        event.preventDefault();

      };
    const handleImageUpload = (event) => {
        event.preventDefault();
        // TODO
      };
    return (
        <ProductsContainer>
            <div className="mod_wrap">
                <div className="forumbox">
                    <div className="forum_spacer">
                        <h2 className="forum-topics-title">Create Product</h2>
                    </div>
                    <Container component="main" maxWidth="md">
                    <div >
                        <form onSubmit={handleSubmit}>
                        <TextField
                            label="Product Name"
                            variant="outlined"
                            fullWidth
                            required
                            size="small"
                            margin="normal"
                        />
                        <TextField
                            label="Product Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            required
                            margin="normal"
                        />
                        <TextField
                            label="Category"
                            variant="outlined"
                            required
                            size="small"
                            margin="normal"
                        />
                        <TextField
                            label="Price"
                            variant="outlined"
                            required
                            size="small"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                              }}
                            sx={{margin: "20px"}}
                        />
                        <TextField
                            label="In Stock Quantity"
                            variant="outlined"
                            required
                            size="small"
                            margin="normal"
                        />
                        <TextField
                            label="Add Image Link"
                            variant="outlined"
                            required
                            size="small"
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <NormalButton
                                      variant="outlined"
                                      component="label"
                                      onClick={handleImageUpload}
                                      startIcon={<CloudUploadIcon />}
                                    >
                                      Upload Image
                                      <input type="file" hidden accept="image/*" />
                                    </NormalButton>
                                  </InputAdornment>
                                ),
                            }}
                        />
                        <NormalButton
                            type="submit"
                            variant="contained"
                            size="large"
                        >
                            Add Product
                        </NormalButton>
                        </form>
                    </div>
                    </Container>
                </div>
            </div>

        </ProductsContainer>
    );
};