import React, { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useAuth } from '../../context/AuthContext';
import { getProducts, getSalesOrders, getPurchaseOrders, getInvoices } from '../../lib/api';
import { useNotification } from '../../context/NotificationContext';

export default function OwnerDashboard() {
  const { user, token } = useAuth();
  const [products, setProducts] = useState([]);
  const [salesOrders, setSalesOrders] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, salesData, purchaseData, invoicesData] = await Promise.all([
          getProducts(token),
          getSalesOrders(token),
          getPurchaseOrders(token),
          getInvoices(token)
        ]);
        setProducts(productsData);
        setSalesOrders(salesData);
        setPurchaseOrders(purchaseData);
        setInvoices(invoicesData);
      } catch (error) {
        addNotification('Failed to load dashboard data', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token, addNotification]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#FFF9F9]">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-xl text-slate-600">Loading dashboard...</div>
        </div>
        <Footer />
      </div>
    );
  }

  const totalRevenue = salesOrders.reduce((sum, order) => sum + order.total, 0);
  const lowStockProducts = products.filter(p => p.stock <= p.lowStockThreshold);

  return (
    <div className="flex min-h-screen flex-col bg-[#FFF9F9]">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-8 font-serif text-4xl font-bold text-slate-900">
            Owner Dashboard - {user?.name}
          </h1>
          
          <div className="mb-8 grid gap-6 md:grid-cols-4">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-2 text-sm font-semibold uppercase text-slate-500">Total Revenue</h3>
              <p className="text-4xl font-bold text-pink-500">${totalRevenue.toFixed(2)}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-2 text-sm font-semibold uppercase text-slate-500">Sales Orders</h3>
              <p className="text-4xl font-bold text-pink-500">{salesOrders.length}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-2 text-sm font-semibold uppercase text-slate-500">Products</h3>
              <p className="text-4xl font-bold text-pink-500">{products.length}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-2 text-sm font-semibold uppercase text-slate-500">Low Stock Items</h3>
              <p className="text-4xl font-bold text-red-500">{lowStockProducts.length}</p>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Recent Sales Orders</h2>
              {salesOrders.length === 0 ? (
                <p className="text-slate-600">No sales orders yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full rounded-lg bg-white shadow">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Total</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salesOrders.slice(0, 10).map((order) => (
                        <tr key={order.id} className="border-t">
                          <td className="px-4 py-3 text-sm">{order.id.slice(0, 8)}</td>
                          <td className="px-4 py-3 text-sm">{order.customerId.slice(0, 8)}</td>
                          <td className="px-4 py-3 text-sm">{order.date}</td>
                          <td className="px-4 py-3 text-sm">${order.total}</td>
                          <td className="px-4 py-3 text-sm">{order.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Inventory Status</h2>
              {products.length === 0 ? (
                <p className="text-slate-600">No products in inventory</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full rounded-lg bg-white shadow">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Product</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">SKU</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Stock</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-t">
                          <td className="px-4 py-3 text-sm">{product.name}</td>
                          <td className="px-4 py-3 text-sm">{product.sku}</td>
                          <td className="px-4 py-3 text-sm">{product.stock}</td>
                          <td className="px-4 py-3 text-sm">${product.price}</td>
                          <td className="px-4 py-3 text-sm">
                            {product.stock <= product.lowStockThreshold ? (
                              <span className="text-red-500 font-semibold">Low Stock</span>
                            ) : (
                              <span className="text-green-500">In Stock</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Purchase Orders</h2>
              {purchaseOrders.length === 0 ? (
                <p className="text-slate-600">No purchase orders</p>
              ) : (
                <div className="space-y-4">
                  {purchaseOrders.map((po) => (
                    <div key={po.id} className="rounded-lg bg-white p-4 shadow">
                      <p className="font-semibold">PO #{po.id.slice(0, 8)}</p>
                      <p className="text-sm text-slate-600">Supplier: {po.supplier}</p>
                      <p className="text-sm text-slate-600">Date: {po.date}</p>
                      <p className="text-sm text-slate-600">Total: ${po.total}</p>
                      <p className="text-sm text-slate-600">Status: {po.status}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
