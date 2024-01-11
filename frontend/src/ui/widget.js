import styled from 'styled-components'
//#region normalButton
const NormalButtonContainer = styled.div`
    .kb {
        border: none;
        display: inline-block;
        background-color: #29b;
        /*background-image: url("/static/img/buttonblue@2x.png");*/
        background-size: cover;
        background-position: 50% 50%;
        transition: background-position .12s;
        color: #fff;
        font-size: 12px;
        font-weight: 600;
        overflow: hidden;
        cursor: pointer;
        text-transform: none;
        white-space: nowrap;

        border-radius: 4px;
        padding: 0 10px;

        vertical-align: middle;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0px;
    }
    .kb:hover {
        background-position: calc(50% - 20px) 50%;
        text-decoration: none;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
    }
    .normal {
        height: 36px;
        width: 120px;
    }
    .small {
        height: 24px;
        width: 80px;
    }
    .margin-10 {
        margin: 10px 10px;
    }
}
`
//#endregion
//#region topBGStyle
const TopBGContainer = styled.div`
    .head_bg {
        height: 190px;
        margin: 0 auto 5px;
        max-width: 1000px;
        overflow: hidden;
        display: flex;
        align-items: flex-end;
        background: rgba(0, 0, 0, 0) url("/static/img/bbs_head2.jpg") repeat scroll left bottom;
    }
    .head_bg::before {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-image: linear-gradient(180deg,transparent,rgba(0,0,0,.75));
        content: " ";
    }
    .title_wrapper {
        padding: 20px;
        text-align: left;
    }
    .title-image {
        margin: 20px 70px;
        width: 237px;
        height: 100px;
        background: rgba(0, 0, 0, 0) url("/static/img/logow_100px.png") repeat scroll 0% 0%;
    }
    .title-text {
        padding: 10px 0 10px 20px;
        width: 100%;
        font-weight: 500;
        font-size: 36px;
        font-style: italic;
        color: #fff;
        display: block;
    }
    .head_shadow {
        height: 191px;
        box-shadow: black 0px 0px 1.5em 0px inset;
    }
`
//#endregion
//#region threadEntryStyle
const ThreadEntryContainer = styled.div`
    .topic_entry {
        margin: 0 40px;
    }
    .topic_entry_bg:hover {
        background-color: rgb(238, 238, 238);
    }
    .row {
        border-bottom: 1px solid #ccc;
        margin: 0 5px;
        align-items: center;
    }
    a {
        text-decoration: none;
        color: #1a3959;
    }
    a:hover {
        text-decoration: underline;
        color: #2c5787;     
    }
    .replies {
        font-size: 1.667em;
        color: rgb(238, 209, 175);
    }
    .postdate {
        display: block;
        overflow: hidden;
    }
    .topic_entry_content {
        padding: 6px;
        line-height: 1.83em;
        flex: none;
    }
    .topic_entry_col {
        border-radius: 50%;
        width: 32px;
        height: 32px;
        align-self: center
        font-size: 16px;
        background-color: #777;
        /*background-image: url(/static/img/button.svg);*/
        background-size: 50px;
        background-position: 50%;
        color: #fff;
    }
    .c1 {
        width: 50px;
        text-align: center;
        padding-left: 1px;
        padding-right: 1px;
        white-space: nowrap;
    }
    .c2 {
        flex: 1;
        text-align: left;
    }
    .c3, .c4 {
        width: 150px;
        text-align: right;
        color: #58697b;
        font-size: 0.923em;
    }
`
//#endregion

//#region threadThemeStyle
const ThreadThemeContainer = styled.div`
    .thread-theme {
        align-self: center;
        margin-left: auto;
        margin-right: auto;
        max-width: 1000px;
    }
    .forum-post {
        box-shadow: 0 1px 3px rgba(0,0,0,.25);
        background-color: #fff;
        margin-bottom: 5px;
        display: flex;
        flex-direction: row;
    }
    .forum-post-body {
        width: 100%;
    }
`
//#endregion
//#region likeButtonStyle
const LikeButtonContainer = styled.div`
    .like-button {
        display: flex;
        cursor: pointer;
    }
    .like {
        color: #8590a6 !important;
    }
    .svg-wrapper {
        display: inline-flex;
        align-items: center;
    }
    .is-liked {
        color: #0084ff !important;
    }
    .like-svg {
        margin-right: 5px;
    }
`
//#endregion
//#region posterInfoStyle
const PosterInfoContainer = styled.div`
    .info {
        flex: none;
        display: flex;
        flex-direction: column;
        width: 180px;
    }
    .forum-post-body {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .info-main::before {
        position: absolute;
        content: " ";
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        /*background-image: url(/static/img/button.svg);*/
        background-size: 300px;
        opacity: .5;
    }
    .info-main {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 20px;
        background-image: linear-gradient(180deg,transparent,rgba(0,0,0,.2));
        position: relative;
    }
    .lvl1 {
        background-color: #29b;
    }
    .lvl2 {
        background-color: #3366FF;
    }
    .avatar_wrapper {
        background-size: 153px 83px;
        padding: 0 30px;
    }
    .avatar {
        width: 100%;
        border: 5px solid #fff;
    }
    .info-extra {
        background-color: hsla(0,0%,100%,.9);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1 0 auto;
        padding: 10px;
        text-align: center;
    }
    .info-extra-buttom {
        font-size: 11px;
        font-weight: 600;
        font-style: italic;
        color: #555;
        margin-bottom: 5px;
    }
`
//#endregion
//#region postBodyStyle
const PostBodyContainer = styled.div`
    .header-wrapper {
        font-size: 12px;
        padding: 20px 30px 0 30px;
        justify-content: space-between;
        display: flex;
    }
    .header {
        color: #999;
        display: flex;
        flex-direction: row;
    }
    .header-warning {
        display: flex;
        cursor: pointer;
        margin-right: 10px;
    }
    .svg-wrapper {
        display: inline-flex;
        align-items: center;
    }
    .warning-svg {
        margin-right: 5px;
    }
    .content-wrapper {
        padding: 20px 30px;
    }
    .content {
        font-family: Open Sans,sans-serif;
        line-height: 1.35;
        color: #444;
        font-size: 13px;
        line-height: 1.5;
    }
`
//#endregion
//#region threadPostStyle
const ThreadPostContainer = styled.div`
    .thread-post {
        align-self: center;
        margin: 0px auto 5px;
        max-width: 960px;
    }
    .forum-post {
        box-shadow: 0 1px 3px rgba(0,0,0,.25);
        background-color: #fff;
        display: flex;
        flex-direction: row;
    }
    .forum-post-body {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`
//#endregion
//#region createTopicStyle
const CreateTopicContainer = styled.div`
    .title-input {
        background: none;
        border: none;
        outline: none;
        color: #fff;
        width: 100%;
        font-weight: 500;
        font-size: 36px;
        font-style: italic;
    }
    .content-input {
        min-height: 300px;
        outline: none;
        border: none;
        background: none;
        resize: vertical;
        width: 100%;
        font-size: 13px;
        font-family: Menlo,Monaco,Consolas,Courier New,monospace;
    }
    .edit-bar {
        background-color: #444;
        padding: 10px 30px;
    }
    .editor-footer {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        flex-wrap: wrap;
    }
    .reply-wrapper {
        background-color: #444;
    }
`
//#endregion
//#region postReplyStyle
const PostReplyContainer = styled.div`
    .reply-wrapper {
        padding: 0px 30px 20px;
    }
    .reply-menu {
        padding: 10px 30px 0px;
        background: #f7f8fa;
        border: 1px solid #f0f1f2;
    }
    .reply-footer {
        display: flex;
        justify-content: flex-end;
    }
    .rcontent-input {
        width: 100%;
        border: 2px solid #d6dffa;
    }
    .reply-singleline {
        display: flex;
        flex-direction: column;
        padding-top: 2px;
    }
    .reply-linebody {
        display: flex;
        flex-direction: row;
    }
    .reply-content {
        margin-left: 5px;
    }
    .time-wrapper {
        display: flex;
        justify-content: flex-end;
    }
    .reply-time {
        color: rgb(153, 153, 153);
    }
`
//#endregion

export {
    NormalButtonContainer,
    TopBGContainer,
    ThreadEntryContainer,
    ThreadThemeContainer,
    LikeButtonContainer, 
    PosterInfoContainer, 
    PostBodyContainer,
    ThreadPostContainer, 
    CreateTopicContainer,
    PostReplyContainer,
}