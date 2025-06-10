"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { isAuthenticated, getUserRole, getDashboardForRole } from "@/utils/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      // Check if user is authenticated
      if (!isAuthenticated()) {
        // No token, redirect to login
        Swal.fire({
          title: "Session Expired",
          text: "Please log in to continue",
          icon: "warning",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          router.push("/login");
        });
        return;
      }

      try {
        // Get user role
        const userRole = getUserRole();

        if (!userRole || !allowedRoles.includes(userRole)) {
          // User role not allowed, redirect to appropriate dashboard
          Swal.fire({
            title: "Access Denied",
            text: "You don't have permission to access this page",
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            // Redirect based on role
            if (userRole) {
              router.push(getDashboardForRole(userRole));
            } else {
              router.push("/eu/dashboard");
            }
          });
          return;
        }

        // User is authorized
        setIsAuthorized(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
        // Error parsing user data, redirect to login
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, allowedRoles]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid rgba(0, 0, 0, 0.1)',
          borderRadius: '50%',
          borderTopColor: '#242e8f',
          animation: 'spin 1s ease-in-out infinite'
        }}></div>
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : null;
}


