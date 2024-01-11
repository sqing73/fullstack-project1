'use client'
import { useEffect } from 'react';
import TopBar from '@/shared/topbar'
import Products from '@/shared/products';
import Footer from '@/shared/footer';
import { bindURL } from '@/shared/utils';
import { DEBUG, LOGIN } from "@/shared/config.js"
import Image from 'next/image'

export default function Home() {
  useEffect(() => {
    const initUser = async () => {
      if (DEBUG) {
        document.cookie = 'isLogin=false;path=/;';
        document.cookie = 'uid=-1;path=/;';
        document.cookie = 'isAdmin=0;path=/;';
      } else {
        try {
          const loginResponse = await fetch(`${bindURL}/api/login`, {
            credentials: 'include',
          });

          if (loginResponse.status === 200) {
            document.cookie = 'isLogin=true;path=/;';

            const usersResponse = await fetch(`${bindURL}/api/users`, {
              credentials: 'include',
            });

            if (usersResponse.status === 200) {
              const json = await usersResponse.json();
              document.cookie = `uid=${json.uid};path=/;`;
              document.cookie = `isAdmin=${json.is_admin};path=/;`;
            } else {
              console.log('Init user error.');
              document.cookie = 'uid=-1;path=/;';
              document.cookie = 'isAdmin=0;path=/;';
            }
          } else {
            document.cookie = 'isLogin=false;path=/;';
            document.cookie = 'uid=-1;path=/;';
            document.cookie = 'isAdmin=0;path=/;';
          }
        } catch (ex) {
          console.log('Init State Failed', ex);
        }
      };
    }

    initUser();
  }, []);

  return (
    <div>
      <TopBar />
      <Products />
      <Footer />
    </div>
  );
};
