"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import Swal from "sweetalert2";
import { getFacilities, deleteFacility } from "./action";
import styles from "./page.module.css";
import DataTable from "react-data-table-component";

interface Facility {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  type: string;
  phone: string;
  email: string;
  status: string;
}

export default function FacilitiesManagement() {
  const router = useRouter();
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadFacilities = async () => {
      try {
        const token = localStorage.getItem("token") || "";
        const result = await getFacilities(token);
        if (result.success) {
          setFacilities(result.data);
        } else {
          throw new Error(result.message || "Failed to load facilities");
        }
      } catch (error) {
        console.error("Error loading facilities:", error);
        Swal.fire({
          title: "Error",
          text: error instanceof Error ? error.message : "Failed to load facilities",
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    loadFacilities();
  }, []);

  const handleAddFacility = () => {
    router.push("/admin/settings/facilities/register");
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/settings/facilities/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token") || "";
        const response = await deleteFacility(id, token);
        
        if (response.success) {
          Swal.fire(
            "Deleted!",
            "The facility has been deleted.",
            "success"
          );
          // Remove the deleted facility from the state
          setFacilities(facilities.filter(facility => facility.id !== id));
        } else {
          throw new Error(response.message || "Failed to delete facility");
        }
      } catch (error) {
        console.error("Error deleting facility:", error);
        Swal.fire({
          title: "Error",
          text: error instanceof Error ? error.message : "Failed to delete facility",
          icon: "error",
        });
      }
    }
  };

  const handleView = (id: number) => {
    router.push(`/admin/settings/facilities/view/${id}`);
  };

  const columns = [
    {
      name: "ID",
      selector: (row: Facility) => row.id,
      sortable: true,
      width: "80px",
    },
    {
      name: "Name",
      selector: (row: Facility) => row.name,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row: Facility) => row.type,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row: Facility) => `${row.city}, ${row.state}`,
      sortable: true,
    },
    {
      name: "Contact",
      selector: (row: Facility) => row.phone,
    },
    {
      name: "Status",
      selector: (row: Facility) => row.status,
      cell: (row: Facility) => (
        <div className={row.status === "Active" ? styles.statusActive : styles.statusInactive}>
          {row.status}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: Facility) => (
        <div className={styles.actionButtons}>
          <button 
            className={styles.viewButton} 
            onClick={() => handleView(row.id)}
            title="View Details"
          >
            <Icon icon="ph:eye" width="20" height="20" />
          </button>
          <button 
            className={styles.editButton} 
            onClick={() => handleEdit(row.id)}
            title="Edit"
          >
            <Icon icon="ph:pencil-simple" width="20" height="20" />
          </button>
          <button 
            className={styles.deleteButton} 
            onClick={() => handleDelete(row.id)}
            title="Delete"
          >
            <Icon icon="ph:trash" width="20" height="20" />
          </button>
        </div>
      ),
      width: "150px",
    },
  ];

  const filteredFacilities = facilities.filter(
    facility => 
      facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Medical Facilities Management</h2>
        <button className={styles.addButton} onClick={handleAddFacility}>
          <Icon icon="ph:plus" width="20" height="20" />
          Add New Facility
        </button>
      </div>

      <div className={styles.searchContainer}>
        <div className={styles.searchBar}>
          <Icon icon="ph:magnifying-glass" width="20" height="20" className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search facilities..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.tableContainer}>
        <DataTable
          columns={columns}
          data={filteredFacilities}
          pagination
          progressPending={loading}
          progressComponent={<div className={styles.loading}>Loading...</div>}
          noDataComponent={<div className={styles.noData}>No facilities found</div>}
          highlightOnHover
          pointerOnHover
          responsive
        />
      </div>
    </div>
  );
}