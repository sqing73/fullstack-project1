import React from 'react';

function resolveScopeStyles(scope) {
    return {
        className: scope.props.className,
        styles: scope.props.children
    }
}

const topbarLink = resolveScopeStyles(
    <div>
        <style jsx>{`
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
            {/* below part has been removed in widgets*/}
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
        `}</style>
    </div>
)

const threadLink = resolveScopeStyles(
    <div>
        <style jsx>{`
            .link {
                text-decoration: none;
                color: #1a3959;
            }
            .link:hover {
                text-decoration: underline;
                color: #2c5787;     
            }
            .topic {
                font-size: 1.085em;
                line-height: 1.9em;
            }
            .author {
                color: #1a3959;
            }
        `}</style>
    </div>
)

const createButtonLink = resolveScopeStyles(
    <div>
        <style jsx>{`
            .link {
                border: none;
                display: inline-block;
                background-color: #29b;
                background-image: url("/static/img/buttonblue@2x.png");
                background-size: cover;
                background-position: 50% 50%;
                transition: background-position .12s;
                padding: 5px;
                color: #fff;
                font-size: 12px;
                font-weight: 600;
                overflow: hidden;
                cursor: pointer;
                text-transform: none;
                white-space: nowrap;

                border-radius: 18px;
                padding: 0 10px;
                height: 36px;
                min-width: 100px;
                vertical-align: middle;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .link:hover {
                background-position: calc(50% - 20px) 50%;
                text-decoration: none;
            }
        `}</style>
    </div>
)

const avatarLink = resolveScopeStyles(
    <div>
        <style jsx>{`
            .link {
            }
        `}</style>
    </div>
)

const usernameLink = resolveScopeStyles(
    <div>
        <style jsx>{`
            .link {
                text-shadow: 0 1px 3px rgba(0,0,0,.75);
                font-weight: 600;
                font-style: italic;
                padding: 10px;
                color: #fff;
            }
            .link:hover {
                color: #fff;
                text-decoration: none;
            }
        `}</style>
    </div>
)

const userMenuLink = resolveScopeStyles(
    <div>
        <style jsx>{`
            .menu {
                padding: 5px 25px;
                color: #fff;
                text-decoration: none;
            }
            .menu:hover {
                background-color: #111;
            }
        `}</style>
    </div>
)

const postReplyLink = resolveScopeStyles(
    <div>
        <style jsx>{`
            .responder {
                
            }
        `}</style>
    </div>
)

export {
    topbarLink,
    threadLink,
    createButtonLink,
    avatarLink,
    usernameLink,
    userMenuLink,
    postReplyLink,
}