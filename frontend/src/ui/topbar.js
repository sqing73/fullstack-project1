import styled from 'styled-components'
import css from 'styled-jsx/css'
//#region topBarStyle
const TopBarContainer = styled.div`
    #mainmenu {
        overflow: hidden;
        background-color: rgb(34, 34, 34);
    }
    .nav {
        max-width: 1000px;
        margin: 0 auto;
        display: flex;
    }
    .left {
        display: flex;
    }
    .right {
        height: 53px;
        margin-left: auto;
    }
    .ul {
        background-color: rgb(34, 34, 34);
    }
    .li {
        float: left;
        font-size: 1.085em;
    }
    .link {
        display: block;
        color: white;
        text-align: center;
        padding: 0px 16px;
        text-decoration: none;
        line-height: 53px;
    } 
    .link:hover:not(.active) {
        background-color: rgb(40, 40, 40);
    }
    .link.active {
        background-color: #591804;
        color: #fff;
    }
    .link.active:hover {
        background-color: #b87563;
        color: #fff;
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
    }
`
//#endregion
//#region PanelContainer
const PanelContainer = styled.div`
    .lr-panel-wrapper {
        left: -235px;
        margin-top: 53px;
    }
    .um-panel-wrapper {
        margin-top: 53px;
    }
    .lr-panel {
        position: fixed;
        z-index: 999;
        margin-top: 5px;
    }
    .lr-panel-content {
        width: 300px;
        margin-top: 5px;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        font-size: 12px;
        background-color: #333;
        padding: 20px 20px 0;
    }
    .um-panel-content {
        width: 150px;
        margin-top: 5px;
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        font-size: 14px;
        background-color: #222;
        padding: 20px 5px;
    }
    .um-panel-menu {
        padding: 5px 25px;
        color: #fff;
    }
    .um-panel-menu:hover {
        background: #111;
        cursor: pointer;
    }
    .box-controller {
        color: #fff;
        font-size: 15px;
        font-style: normal;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-around;
    }
    .controller:hover {
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
    }
    .selected {
        color: #fc2;
    }
`
//#endregion
//#region PanelBoxContainer
const PanelBoxContainer = styled.div`
    .panel-box {
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }
    input {
        border-radius: 4px;
        border: none;
        background-color: #222;
        padding: 10px 5px;
        margin-bottom: 5px;
        color: #999;
    }
    .panel-box-buttom {
        display: flex;
        justify-content: flex-end;
    }
`
//#endregion

export {
    TopBarContainer,
    PanelContainer,
    PanelBoxContainer,
}