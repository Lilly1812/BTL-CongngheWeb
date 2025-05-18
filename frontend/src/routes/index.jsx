import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

// Lazy load components
const SanPham = lazy(() => import('../pages/sanpham'));
const GioHang = lazy(() => import('../pages/giohang'));
const DonHang = lazy(() => import('../pages/donhang'));
const DonHangAd = lazy(() => import('../pages/donhang_ad'));
const ThanhToan = lazy(() => import('../pages/thanhtoan'));
const KhachHang = lazy(() => import('../pages/khachhang'));
const DangKy = lazy(() => import('../pages/dangky'));
const DangNhap = lazy(() => import('../pages/dangnhap'));

export const routes = [
  {
    element: <AuthLayout />,
    children: [
      { path: '/dangky', element: <DangKy /> },
      { path: '/dangnhap', element: <DangNhap /> },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <SanPham /> },
      { path: '/giohang', element: <GioHang /> },
      { path: '/donhang', element: <DonHang /> },
      { path: '/donhangad', element: <DonHangAd /> },
      { path: '/thanhtoan', element: <ThanhToan /> },
      { path: '/khachhang', element: <KhachHang /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
];
 