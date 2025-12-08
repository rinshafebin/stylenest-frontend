import React, { useState } from "react";
import Header from "../../Components/Common/Admin/Header";
import Sidebar from "../../Components/Common/Admin/Sidebar";
import AddProductForm from "./AddProductForm";

export default function AddProduct() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex flex-1">
        <Sidebar sidebarOpen={sidebarOpen} />
        <div className="flex-1 flex flex-col">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main className="flex-1 p-6 bg-gray-50">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
              <AddProductForm />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
