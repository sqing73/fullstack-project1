'use client'
import TopBar from '@/shared/topbar'
import CreateProduct from '@/shared/create_product';
import Footer from '@/shared/footer';
import { bindURL } from '@/shared/utils';
import { DEBUG, LOGIN } from "@/shared/config.js"

export default function CreateProductPage() {
return (
    <div>
      <TopBar />
      <CreateProduct />
      <Footer />
    </div>
  );
};
