import styled from 'styled-components'
const ProductsContainer = styled.div`
    .mod_wrap {
        margin: 0px 10px 8px 10px;
    }
    .forumbox {
        width: 100%;
        border-spacing: 1px;
        border: 1px solid #cacaca;
        box-shadow: 0 0 5px -3px #000;
        border-radius: 2.5px;
        margin: 4px auto;
        max-width: 1000px;
        background-color: white;
    }
    .forum_spacer {
        display: flex;
        align-items: center;
        margin: 30px 40px;
        justify-content: space-between;
    }
    .forum-topics-title {
        color: #262626;
        font-size: 24px;
        margin: 30px 0 0;
        padding: 0 40px 5px;
        font-weight: bold;
    }
    .btn_content {
        margin: 0 5px;
    }
    .thread-order {
        display: flex;
    }
    .product-card-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .product-name {
        color: #808080;
    }
    .product-price {
        font-size: 22px;
        font-weight: bold;
    }
`

export {
    ProductsContainer,
}