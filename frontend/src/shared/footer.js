import React from "react";
import Link from 'next/link';
import { FooterContainer } from "@/ui/footer";
function Copyright() {
    return (
        <div className="footer-copyright">
            {"Copyright © "}
            <Link color="inherit" href="#">
                All Rights Reserved
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </div>
    );
}
export default function Footer() {
    return (
        <FooterContainer>
            <footer className='footer'>
                <Copyright />
            </footer>
        </FooterContainer>
    );
}