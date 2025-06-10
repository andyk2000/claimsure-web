"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import DataTable from "react-data-table-component";
import styles from "./page.module.css";
import { getUsers, updateUserStatus } from "./action";
import Swal from "sweetalert2";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  facility: string;
  status: string;
}

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token") || "";
        const result = await getUsers(token);
        
        if (result.success && Array.isArray(result.data)) {
          setUsers(result.data);
        } else {
          setError(result.message || "Failed to fetch users");
          setUsers([]);
        }
      } catch (error) {
        setError("Failed to fetch users");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleStatusChange = async (userId: number, newStatus: string) => {
    try {
      const token = localStorage.getItem("token") || "";
      const result = await updateUserStatus(userId, newStatus, token);
      
      if (result.success) {
        setUsers(prevUsers => prevUsers.map(user => 
          user.id === userId ? { ...user, status: newStatus } : user
        ));
        Swal.fire({
          icon: 'success',
          title: 'Status Updated',
          text: `User status has been updated to ${newStatus}.`
        });
      } else {
        throw new Error(result.message || "Failed to update user status");
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error instanceof Error ? error.message : 'Failed to update user status'
      });
    }
  };

  const handleViewUser = (userId: number) => {
    router.push(`/admin/users/${userId}`);
  };

  const handleEditUser = (userId: number) => {
    router.push(`/admin/users/${userId}/edit`);
  };

  const handleDeleteUser = (userId: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Implement delete functionality here
        // For now, just remove from the UI
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        
        Swal.fire(
          'Deleted!',
          'The user has been deleted.',
          'success'
        );
      }
    });
  };

  const columns = [
    {
      name: "Name",
      selector: (row: User) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: User) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row: User) => row.role,
      sortable: true,
    },
    {
      name: "Facility",
      selector: (row: User) => row.facility,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row: User) => (
        <div className={row.status === "Active" ? styles.statusActive : styles.statusInactive}>
          {row.status}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: User) => (
        <div className={styles.actionButtons}>
          <button 
            className={styles.viewButton} 
            title="View User"
            onClick={() => handleViewUser(row.id)}
          >
            <Icon icon="ph:eye" width="16" height="16" />
          </button>
          <button 
            className={styles.editButton} 
            title="Edit User"
            onClick={() => handleEditUser(row.id)}
          >
            <Icon icon="ph:pencil-simple" width="16" height="16" />
          </button>
          <button 
            className={styles.deleteButton} 
            title="Delete User"
            onClick={() => handleDeleteUser(row.id)}
          >
            <Icon icon="ph:trash" width="16" height="16" />
          </button>
        </div>
      ),
    },
  ];
  
  const filteredUsers = users.filter(
    user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.facility.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    router.push("/admin/users/add");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>User Management</h1>
        <button className={styles.addButton} onClick={handleAddUser}>
          <Icon icon="ph:plus" width="20" height="20" />
          Add User
        </button>
      </div>
      
      <div className={styles.searchContainer}>
        <div className={styles.searchBar}>
          <Icon icon="ph:magnifying-glass" width="20" height="20" className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search users..." 
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className={styles.tableContainer}>
        {loading ? (
          <div className={styles.loading}>
            <Icon icon="ph:spinner-gap" className={styles.spinner} width="24" height="24" />
            Loading users...
          </div>
        ) : error ? (
          <div className={styles.error}>
            <Icon icon="ph:warning" width="24" height="24" />
            <p>{error}</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className={styles.noData}>No users found</div>
        ) : (
          <DataTable
            columns={columns}
            data={filteredUsers}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            highlightOnHover
            responsive
          />
        )}
      </div>
    </div>
  );
}


