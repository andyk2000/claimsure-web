"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./page.module.css";
import DataTable from "react-data-table-component";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  facility: string;
  status: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    // Simulate API call to fetch users
    const fetchUsers = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        const mockUsers = [
          { id: 1, name: "Dr. John Smith", email: "john.smith@example.com", role: "Doctor", facility: "Central Hospital", status: "Active" },
          { id: 2, name: "Dr. Sarah Johnson", email: "sarah.johnson@example.com", role: "Doctor", facility: "City Medical Center", status: "Active" },
          { id: 3, name: "James Wilson", email: "james.wilson@example.com", role: "Admin", facility: "Health Department", status: "Active" },
          { id: 4, name: "Emily Davis", email: "emily.davis@example.com", role: "Doctor", facility: "Rural Clinic", status: "Inactive" },
          { id: 5, name: "Michael Brown", email: "michael.brown@example.com", role: "Doctor", facility: "University Hospital", status: "Active" },
          { id: 6, name: "Jessica Taylor", email: "jessica.taylor@example.com", role: "Doctor", facility: "Children's Hospital", status: "Active" },
          { id: 7, name: "Robert Miller", email: "robert.miller@example.com", role: "Admin", facility: "Health Ministry", status: "Active" },
          { id: 8, name: "Lisa Anderson", email: "lisa.anderson@example.com", role: "Doctor", facility: "Women's Clinic", status: "Inactive" },
        ];
        setUsers(mockUsers);
        setLoading(false);
      }, 1000);
    };
    
    fetchUsers();
  }, []);
  
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
          <button className={styles.viewButton} title="View User">
            <Icon icon="ph:eye" width="16" height="16" />
          </button>
          <button className={styles.editButton} title="Edit User">
            <Icon icon="ph:pencil-simple" width="16" height="16" />
          </button>
          <button className={styles.deleteButton} title="Delete User">
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

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>User Management</h1>
        <button className={styles.addButton}>
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