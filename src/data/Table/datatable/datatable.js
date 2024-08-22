import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import differenceBy from "lodash/differenceBy";
import { tableDataItems } from "./datatables";
import {
  Button,
  Dropdown,
  DropdownButton,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import moment from "moment";
import "react-data-table-component-extensions/dist/index.css";
import { Link, NavLink } from "react-router-dom";
import { borderRadius } from "@mui/system";
import parse from "html-react-parser";
import { color } from "echarts";

export const DataTablesForCategory = ({
  handleShow,
  userDeleteAction,
  handleClickOpen,
  status,
  category,
  role,
  hello,
}) => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [data, setData] = React.useState(tableDataItems);

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const columns = [
    {
      name: "Icon",
      cell: (row) => (
        <span>
          <img
            crossorigin="anonymous"
            width={40}
            height={40}
            style={{ borderRadius: "360px" }}
            src={`${process.env.REACT_APP_API_BASE_URL}/images/${
              row?.logo ? row.logo : row?.image && row.image
            }`}
          />
        </span>
      ),
      sortable: true,
    },
    {
      name: "NAME",
      cell: (row) => (
        <>
          {row.parentCount > 0
            ? row.branch.map(() => {
                return <p>&#8722;</p>;
              })
            : ""}
          <p>{row.name}</p>
        </>
      ),
      sortable: true,
    },
    {
      name: "PARENT",
      selector: (row) => [row.parent],
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row) => [row.action],
      sortable: true,
      cell: (row) => (
        <span className="">
          <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
            {/* <Link
              onClick={handleClickOpen("paper", row)}
              className="btn btn-primary btn-sm rounded-11 me-2"
            > */}
            <NavLink
              to={`/update-category/${row._id}`}
              className="btn btn-primary btn-sm rounded-11 me-2"
            >
              <i>
                <svg
                  className="table-edit"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                </svg>
              </i>
            </NavLink>
            {/* </Link> */}
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
            <Link
              onClick={handleShow(row?._id)}
              to="#"
              className="btn btn-danger btn-sm rounded-11"
            >
              <i>
                <svg
                  className="table-delete"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                </svg>
              </i>
            </Link>
          </OverlayTrigger>
        </span>
      ),
    },
  ];

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      if (
        window.confirm(
          `Are you sure you want to delete:\r ${selectedRows.map(
            (r) => r.SNO
          )}?`
        )
      ) {
        setToggleCleared(!toggleCleared);
        setData(differenceBy(data, selectedRows, "SNO"));
      }
    };

    return (
      <Button key="delete" onClick={handleDelete} icon="true">
        Delete
      </Button>
    );
  }, [data, selectedRows, toggleCleared]);
  const tableDatas = {
    columns,
    data,
  };

  return (
    // <DataTableExtensions {...tableDatas}>
    <DataTable
      title
      columns={columns}
      data={category}
      selectableRows
      contextActions={contextActions}
      onSelectedRowsChange={handleRowSelected}
      clearSelectedRows={toggleCleared}
      pagination
    />
    // </DataTableExtensions>
  );
};
export const DataTablesForDeleteCategoryList = ({
  handleShow,
  userDeleteAction,
  handleClickOpen,
  status,
  category,
  role,
  hello,
}) => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const columns = [
    {
      name: "Icon",
      cell: (row) => (
        <span>
          <img
            crossorigin="anonymous"
            width={40}
            height={40}
            style={{ borderRadius: "360px" }}
            src={`${process.env.REACT_APP_API_BASE_URL}/images/${
              row?.logo ? row.logo : row?.image && row.image
            }`}
          />
        </span>
      ),
      sortable: true,
    },
    {
      name: "NAME",
      cell: (row) => (
        <>
          {row.parentCount > 0
            ? row.branch.map(() => {
                return <p>&#8722;</p>;
              })
            : ""}
          <p>{row.name}</p>
        </>
      ),
      sortable: true,
    },
    {
      name: "PARENT",
      selector: (row) => [row.parent],
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row) => [row.action],
      sortable: true,
      cell: (row) => (
        <span className="">
          <OverlayTrigger placement="top" overlay={<Tooltip>Restore</Tooltip>}>
            <Link
              onClick={handleShow(row?._id)}
              to="#"
              className="btn btn-danger btn-sm rounded-11"
            >
              <i>
                <svg
                  className="table-edit"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                </svg>
              </i>
            </Link>
          </OverlayTrigger>
        </span>
      ),
    },
  ];

  return (
    <DataTable
      title
      columns={columns}
      data={category}
      selectableRows
      onSelectedRowsChange={handleRowSelected}
      clearSelectedRows={toggleCleared}
      pagination
    />
  );
};
export const DataTables = ({ handleOpen, users, handleStatusUpdate, role }) => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const handleOpenModal = (id) => {
    handleOpen(id);
  };
  const columns = [
    {
      name: "NAME",
      selector: (row) => [row.name],
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row) => [row.email],
      sortable: true,
    },
    {
      name: " CONTACT",
      selector: (row) => [row.contact_no],
      sortable: true,
    },
    {
      name: "DATE",
      selector: (row) => [moment(row.created_at).format("MMM Do YY")],
      sortable: true,
    },
    {
      name: "APPROVAL STATUS",
      selector: (row) => [row.approval_status],
      sortable: true,
      cell: (row) => (
        <select
          type="button"
          onChange={(e) =>
            handleStatusUpdate({ ...row, approval_status: e.target.value })
          }
          value={row?.approval_status ? row.approval_status : ""}
          style={{ borderRadius: "12px" }}
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      ),
    },
    {
      name: "ACTION",
      selector: (row) => [row.action],
      sortable: true,
      cell: (row) => (
        <span className="">
          <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
            <NavLink className="btn btn-yellow btn-sm rounded-11 me-2">
              <i
                className="fe fe-user"
                style={{ fontSize: "1.3rem" }}
                aria-hidden="true"
                onClick={() => handleOpenModal(row)}
              ></i>
            </NavLink>
          </OverlayTrigger>
        </span>
      ),
    },
  ];

  const columnsCafe = [
    {
      name: "NAME",
      selector: (row) => [row.name],
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row) => [row.email],
      sortable: true,
    },
    {
      name: " CONTACT",
      selector: (row) => [row.contact_no],
      sortable: true,
    },
    {
      name: "CAFE NAME",
      selector: (row) => [row.cafename],
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row) => [row.action],
      sortable: true,
      cell: (row) => (
        <span className="">
          <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
            <NavLink className="btn btn-yellow btn-sm rounded-11 me-2">
              <i
                className="fe fe-user"
                style={{ fontSize: "1.3rem" }}
                aria-hidden="true"
                onClick={() => handleOpenModal(row)}
              ></i>
            </NavLink>
          </OverlayTrigger>
        </span>
      ),
    },
  ];

  return (
    <DataTable
      title
      columns={role == 4 ? columnsCafe : columns}
      data={users?.users}
      selectableRows
      onSelectedRowsChange={handleRowSelected}
      clearSelectedRows={toggleCleared}
      pagination
    />
  );
};
export const NewsDataTables = ({
  handleShow,
  handleOpenUserModal,
  news,
  role,
}) => {
  const handleOpenModal = (id) => {
    handleOpenUserModal(id);
  };

  const columns = [
    {
      name: "TITLE",
      selector: (row) => [row.title],
      sortable: true,
    },
    {
      name: "AVATAR",
      cell: (row) => (
        <span>
          <img
            crossorigin="anonymous"
            width={50}
            height={50}
            style={{ borderRadius: "360px" }}
            src={`${process.env.REACT_APP_API_BASE_URL}/images/${row?.image}`}
          />
        </span>
      ),
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row) => [row.action],
      sortable: true,
      cell: (row) => (
        <span className="" style={{ width: "409px" }}>
          <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
            <NavLink
              to={`/update-news/${row._id}`}
              className="btn btn-primary btn-sm rounded-11 me-2"
            >
              <i>
                <svg
                  className="table-edit"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                </svg>
              </i>
            </NavLink>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
            <Link
              onClick={() => handleShow(row?._id)}
              to="#"
              className="btn btn-danger btn-sm rounded-11"
            >
              <i>
                <svg
                  className="table-delete"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                </svg>
              </i>
            </Link>
          </OverlayTrigger>
        </span>
      ),
    },
  ];

  const columnsCafe = [
    {
      name: "NAME",
      selector: (row) => [row.name],
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row) => [row.email],
      sortable: true,
    },
    {
      name: " CONTACT",
      selector: (row) => [row.contact_no],
      sortable: true,
    },
    {
      name: "CAFE NAME",
      selector: (row) => [row.cafename],
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row) => [row.action],
      sortable: true,
      cell: (row) => (
        <span className="">
          <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
            <NavLink className="btn btn-yellow btn-sm rounded-11 me-2">
              <i
                className="fa fa-eye"
                style={{ fontSize: "1.3rem" }}
                aria-hidden="true"
                onClick={() => handleOpenModal(row)}
              ></i>
            </NavLink>
          </OverlayTrigger>
        </span>
      ),
    },
  ];
  return (
    <DataTable
      title
      columns={role == 4 ? columnsCafe : columns}
      data={news}
      selectableRows
      pagination
    />
  );
};
export const SeoDataTables = ({
  handleShow,
  handleOpenUserModal,
  seos,
  role,
}) => {
  const handleOpenModal = (id) => {
    handleOpenUserModal(id);
  };

  const columns = [
    {
      name: "TITLE",
      selector: (row) => [row.title],
      sortable: true,
    },
    {
      name: "URL",
      selector: (row) => [row.url],
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row) => [row.action],
      sortable: true,
      cell: (row) => (
        <span className="" style={{ width: "409px" }}>
          <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
            <NavLink
              to={`/update-seo/${row._id}`}
              className="btn btn-primary btn-sm rounded-11 me-2"
            >
              <i>
                <svg
                  className="table-edit"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                </svg>
              </i>
            </NavLink>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
            <Link
              onClick={() => handleShow(row?._id)}
              to="#"
              className="btn btn-danger btn-sm rounded-11"
            >
              <i>
                <svg
                  className="table-delete"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                </svg>
              </i>
            </Link>
          </OverlayTrigger>
        </span>
      ),
    },
  ];
  return (
    <DataTable title columns={columns} data={seos} selectableRows pagination />
  );
};
export const ExamDataTables = ({
  handleShow,
  handleOpenUserModal,
  exams,
  role,
}) => {
  const handleOpenModal = (id) => {
    handleOpenUserModal(id);
  };

  const columns = [
    {
      name: "NAME",
      selector: (row) => [row.name],
      sortable: true,
    },
    {
      name: "ELG DOB",
      selector: (row) => [row.elg_dob],
      sortable: true,
    },
    {
      name: "ELG CLASS",
      selector: (row) => [row.elg_class],
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row) => [row.action],
      sortable: true,
      cell: (row) => (
        <span className="" style={{ width: "409px" }}>
          <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
            <NavLink
              to={`/update-exam/${row._id}`}
              className="btn btn-primary btn-sm rounded-11 me-2"
            >
              <i>
                <svg
                  className="table-edit"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                </svg>
              </i>
            </NavLink>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
            <Link
              onClick={() => handleShow(row?._id)}
              to="#"
              className="btn btn-danger btn-sm rounded-11"
            >
              <i>
                <svg
                  className="table-delete"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                </svg>
              </i>
            </Link>
          </OverlayTrigger>
        </span>
      ),
    },
  ];

  const columnsCafe = [
    {
      name: "NAME",
      selector: (row) => [row.name],
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row) => [row.email],
      sortable: true,
    },
    {
      name: " CONTACT",
      selector: (row) => [row.contact_no],
      sortable: true,
    },
    {
      name: "CAFE NAME",
      selector: (row) => [row.cafename],
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row) => [row.action],
      sortable: true,
      cell: (row) => (
        <span className="">
          <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
            <NavLink className="btn btn-yellow btn-sm rounded-11 me-2">
              <i
                className="fa fa-eye"
                style={{ fontSize: "1.3rem" }}
                aria-hidden="true"
                onClick={() => handleOpenModal(row)}
              ></i>
            </NavLink>
          </OverlayTrigger>
        </span>
      ),
    },
  ];
  return (
    <DataTable
      title
      columns={role == 4 ? columnsCafe : columns}
      data={exams}
      selectableRows
      pagination
    />
  );
};
export const CallerDataTables = ({
  handleShow,
  handleStatusUpdate,
  handleOpenUserModal,
  users,
  role,
}) => {
  const handleOpenModal = (id) => {
    handleOpenUserModal(id);
  };
  const columns = [
    {
      name: "NAME",
      selector: (row) => [row.name],
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row) => [row.email],
      sortable: true,
    },
    {
      name: " CONTACT",
      selector: (row) => [row.contact_no],
      sortable: true,
    },
    {
      name: "USER STATUS",
      selector: (row) => [row.tab_status],
      sortable: true,
      cell: (row) => (
        <select
          type="button"
          onChange={(e) =>
            handleStatusUpdate({ ...row, tab_status: e.target.value })
          }
          value={row?.tab_status ? row.tab_status : ""}
          style={{ borderRadius: "12px" }}
        >
          <option value="Active">Active</option>
          <option value="Inactive">InActive</option>
        </select>
      ),
    },
    {
      name: "ACTION",
      selector: (row) => [row.action],
      sortable: true,
      cell: (row) => (
        <span className="" style={{ width: "409px" }}>
          <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
            <NavLink className="btn btn-yellow btn-sm rounded-11 me-2">
              <i
                className="fe fe-user"
                style={{ fontSize: "1.3rem" }}
                aria-hidden="true"
                onClick={() => handleOpenUserModal(row)}
              ></i>
            </NavLink>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
            <NavLink
              to={`/caller-update/${row._id}`}
              className="btn btn-primary btn-sm rounded-11 me-2"
            >
              <i>
                <svg
                  className="table-edit"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                </svg>
              </i>
            </NavLink>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
            <Link
              onClick={() => handleShow(row?._id)}
              to="#"
              className="btn btn-danger btn-sm rounded-11"
            >
              <i>
                <svg
                  className="table-delete"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                </svg>
              </i>
            </Link>
          </OverlayTrigger>
        </span>
      ),
    },
  ];

  const columnsCafe = [
    {
      name: "NAME",
      selector: (row) => [row.name],
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row) => [row.email],
      sortable: true,
    },
    {
      name: " CONTACT",
      selector: (row) => [row.contact_no],
      sortable: true,
    },
    {
      name: "CAFE NAME",
      selector: (row) => [row.cafename],
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row) => [row.action],
      sortable: true,
      cell: (row) => (
        <span className="">
          <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
            <NavLink className="btn btn-yellow btn-sm rounded-11 me-2">
              <i
                className="fa fa-eye"
                style={{ fontSize: "1.3rem" }}
                aria-hidden="true"
                onClick={() => handleOpenModal(row)}
              ></i>
            </NavLink>
          </OverlayTrigger>
        </span>
      ),
    },
  ];
  return (
    <DataTable
      title
      columns={role == 4 ? columnsCafe : columns}
      data={users?.users}
      selectableRows
      pagination
    />
  );
};
export const EditorDataTables = ({
  handleShow,
  handleStatusUpdate,
  handleOpenUserModal,
  users,
  role,
}) => {
  const handleOpenModal = (id) => {
    handleOpenUserModal(id);
  };
  const columns = [
    {
      name: "NAME",
      selector: (row) => [row.name],
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row) => [row.email],
      sortable: true,
    },
    {
      name: " CONTACT",
      selector: (row) => [row.contact_no],
      sortable: true,
    },
    {
      name: "DATE",
      selector: (row) => [moment(row.created_at).format("MMM Do YY")],
      sortable: true,
    },
    {
      name: "USER STATUS",
      selector: (row) => [row.tab_status],
      sortable: true,
      cell: (row) => (
        <select
          type="button"
          onChange={(e) =>
            handleStatusUpdate({ ...row, tab_status: e.target.value })
          }
          value={row?.tab_status ? row.tab_status : ""}
          style={{ borderRadius: "12px" }}
        >
          <option value="Active">Active</option>
          <option value="Inactive">InActive</option>
        </select>
      ),
    },
    {
      name: "ACTION",
      selector: (row) => [row.action],
      sortable: true,
      cell: (row) => (
        <span className="" style={{ width: "409px" }}>
          <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
            <NavLink className="btn btn-yellow btn-sm rounded-11 me-2">
              <i
                className="fe fe-user"
                style={{ fontSize: "1.3rem" }}
                aria-hidden="true"
                onClick={() => handleOpenUserModal(row)}
              ></i>
            </NavLink>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
            <NavLink
              to={`/editor-update/${row._id}`}
              className="btn btn-primary btn-sm rounded-11 me-2"
            >
              <i>
                <svg
                  className="table-edit"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                </svg>
              </i>
            </NavLink>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
            <Link
              onClick={() => handleShow(row?._id)}
              to="#"
              className="btn btn-danger btn-sm rounded-11"
            >
              <i>
                <svg
                  className="table-delete"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                </svg>
              </i>
            </Link>
          </OverlayTrigger>
        </span>
      ),
    },
  ];
  return (
    <DataTable
      title
      columns={columns}
      data={users?.users}
      selectableRows
      pagination
    />
  );
};
export const ClaimProrpertyListTable = ({
  handleShow,
  tab_status,
  handleStatusUpdate,
  handleClickOpen,
  college,
  sendMailOnthePropertySide,
  role,
  permission,
  hello,
}) => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [data, setData] = React.useState(tableDataItems);

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const columns = [
    {
      name: "LOGO",
      cell: (row) => (
        <span>
          <img
            crossorigin="anonymous"
            height={50}
            width={50}
            src={`${process.env.REACT_APP_API_BASE_URL}/images/${row?.logo}`}
          />
        </span>
      ),
      sortable: true,
    },
    {
      name: "NAME",
      selector: (row) => [row.name],
      sortable: true,
    },

    // {
    //   name: "COLLEGE TYPE",
    //   selector: (row) => [row.college_type],
    //   sortable: true,
    // },
    {
      name: "SCHOOL EMAIL",
      selector: (row) => [row.email],
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row) => [row.action],
      sortable: true,
      cell: (row) => (
        <span className="" style={{ width: "409px" }}>
          {/* {permission?.universityView || Object.keys(permission) == false ? */}
          <OverlayTrigger placement="top" overlay={<Tooltip>Claim</Tooltip>}>
            <NavLink
              onClick={handleShow(row?._id)}
              className="btn btn-yellow btn-sm rounded-11 me-2"
            >
              <i
                className="fa fa-eye"
                style={{ fontSize: "1.3rem" }}
                aria-hidden="true"
              ></i>
            </NavLink>
          </OverlayTrigger>
          {/* : ""} */}
        </span>
      ),
    },
  ];

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      if (
        window.confirm(
          `Are you sure you want to delete:\r ${selectedRows.map(
            (r) => r.SNO
          )}?`
        )
      ) {
        setToggleCleared(!toggleCleared);
        setData(differenceBy(data, selectedRows, "SNO"));
      }
    };

    return (
      <Button key="delete" onClick={handleDelete} icon="true">
        Delete
      </Button>
    );
  }, [data, selectedRows, toggleCleared]);
  const tableDatas = {
    columns,
    data,
  };

  return (
    // <DataTableExtensions {...tableDatas}>
    <DataTable
      title
      columns={columns}
      data={college}
      selectableRows
      contextActions={contextActions}
      onSelectedRowsChange={handleRowSelected}
      clearSelectedRows={toggleCleared}
      pagination
    />
    // </DataTableExtensions>
  );
};
export const MySchoolProrpertyListTable = ({
  handleShow,
  tab_status,
  handleStatusUpdate,
  handleClickOpen,
  college,
  role,
  permission,
  hello,
}) => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [data, setData] = React.useState(tableDataItems);

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);
  const columns = [
    // {
    //   name: "LOGO",
    //   cell: (row) => (
    //     <span>
    //       <img
    //         crossorigin="anonymous"
    //         src={`${process.env.REACT_APP_API_BASE_URL}/${row?.logo}`}
    //       />
    //     </span>
    //   ),
    //   sortable: true,
    // },
    {
      name: "NAME",
      selector: (row) => [row.name],
      sortable: true,
    },

    {
      name: "COLLEGE TYPE",
      selector: (row) => [row.college_type],
      sortable: true,
    },
    {
      name: "COLLEGE EMAIL",
      selector: (row) => [row.email],
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row) => [row.action],
      sortable: true,
      cell: (row) => (
        <span className="" style={{ width: "409px" }}>
          {permission?.universityView || Object.keys(permission) == false ? (
            <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
              <NavLink
                to={`/property-list/${row._id}/${row.edu_type}`}
                className="btn btn-yellow btn-sm rounded-11 me-2"
              >
                <i
                  className="fa fa-eye"
                  style={{ fontSize: "1.3rem" }}
                  aria-hidden="true"
                ></i>
              </NavLink>
            </OverlayTrigger>
          ) : (
            ""
          )}
          {permission.universityUpate == true ||
          Object.keys(permission) == false ? (
            <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
              <NavLink
                to={`/update-propertys/${row._id}`}
                className="btn btn-primary btn-sm rounded-11 me-2"
              >
                <i>
                  <svg
                    className="table-edit"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                  </svg>
                </i>
              </NavLink>
            </OverlayTrigger>
          ) : (
            ""
          )}
          {/* {permission?.universityDelete == true || Object.keys(permission) == false ?
            <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
              <Link
                onClick={
                  handleShow(row?._id)
                }
                to="#"
                className="btn btn-danger btn-sm rounded-11"
              >
                <i>
                  <svg
                    className="table-delete"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                  </svg>
                </i>
              </Link>
            </OverlayTrigger> : ""} */}
        </span>
      ),
    },
  ];

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      if (
        window.confirm(
          `Are you sure you want to delete:\r ${selectedRows.map(
            (r) => r.SNO
          )}?`
        )
      ) {
        setToggleCleared(!toggleCleared);
        setData(differenceBy(data, selectedRows, "SNO"));
      }
    };

    return (
      <Button key="delete" onClick={handleDelete} icon="true">
        Delete
      </Button>
    );
  }, [data, selectedRows, toggleCleared]);
  const tableDatas = {
    columns,
    data,
  };

  return (
    // <DataTableExtensions {...tableDatas}>
    <DataTable
      title
      columns={columns}
      data={college}
      selectableRows
      contextActions={contextActions}
      onSelectedRowsChange={handleRowSelected}
      clearSelectedRows={toggleCleared}
      pagination
    />
    // </DataTableExtensions>
  );
};
export const PropertyManagerDataTables = ({
  handleShow,
  handleStatusUpdate,
  handleOpenUserModal,
  users,
  role,
}) => {
  const handleOpenModal = (id) => {
    handleOpenUserModal(id);
  };
  const columns = [
    {
      name: "NAME",
      selector: (row) => [row.name],
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row) => [row.email],
      sortable: true,
    },
    {
      name: " CONTACT",
      selector: (row) => [row.contact_no],
      sortable: true,
    },
    {
      name: "DATE",
      selector: (row) => [moment(row.created_at).format("MMM Do YY")],
      sortable: true,
    },
    {
      name: "USER STATUS",
      selector: (row) => [row.tab_status],
      sortable: true,
      cell: (row) => (
        <select
          type="button"
          onChange={(e) =>
            handleStatusUpdate({ ...row, tab_status: e.target.value })
          }
          value={row?.tab_status ? row.tab_status : ""}
          style={{ borderRadius: "12px" }}
        >
          <option value="Active">Active</option>
          <option value="Inactive">InActive</option>
        </select>
      ),
    },
    {
      name: "ACTION",
      selector: (row) => [row.action],
      sortable: true,
      cell: (row) => (
        <span className="" style={{ width: "409px" }}>
          <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
            <NavLink className="btn btn-yellow btn-sm rounded-11 me-2">
              <i
                className="fe fe-user"
                style={{ fontSize: "1.3rem" }}
                aria-hidden="true"
                onClick={() => handleOpenUserModal(row)}
              ></i>
            </NavLink>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
            <NavLink
              to={`/property-manager-update/${row._id}`}
              className="btn btn-primary btn-sm rounded-11 me-2"
            >
              <i>
                <svg
                  className="table-edit"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                </svg>
              </i>
            </NavLink>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
            <Link
              onClick={() => handleShow(row?._id)}
              to="#"
              className="btn btn-danger btn-sm rounded-11"
            >
              <i>
                <svg
                  className="table-delete"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                </svg>
              </i>
            </Link>
          </OverlayTrigger>
        </span>
      ),
    },
  ];
  return (
    <DataTable
      title
      columns={columns}
      data={users?.users}
      selectableRows
      pagination
    />
  );
};
export const SchoolDataTables = ({
  handleShow,
  handleStatusUpdate,
  handleOpenUserModal,
  schools,
  role,
}) => {
  const handleOpenModal = (id) => {
    handleOpenUserModal(id);
  };
  const columns = [
    {
      name: "NAME",
      selector: (row) => [row.name],
      sortable: true,
    },
    {
      name: "SHORT NAME",
      selector: (row) => [row.shrt_name],
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row) => [row.email],
      sortable: true,
    },
    {
      name: "CONTACT",
      selector: (row) => [row.phone],
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row) => [row.action],
      sortable: true,
      cell: (row) => (
        <span className="" style={{ width: "409px" }}>
          <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
            <NavLink
              to={
                row.type == "School"
                  ? `/school-property-list/${row._id}`
                  : `/coaching-property-list/${row._id}`
              }
              className="btn btn-yellow btn-sm rounded-11 me-2"
            >
              <i
                className="fe fe-eye"
                style={{ fontSize: "1.3rem" }}
                aria-hidden="true"
              ></i>
            </NavLink>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Seo</Tooltip>}>
            <NavLink
              to={`/seo-school-property/${row._id}`}
              className="btn btn-green btn-sm rounded-11 me-2"
            >
              <i
                className="fe fe-search"
                style={{ fontSize: "1.3rem" }}
                aria-hidden="true"
              ></i>
            </NavLink>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
            <NavLink
              to={`/update-school-property/${row._id}`}
              className="btn btn-primary btn-sm rounded-11 me-2"
            >
              <i>
                <svg
                  className="table-edit"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                </svg>
              </i>
            </NavLink>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
            <Link
              onClick={() => handleShow(row?._id)}
              to="#"
              className="btn btn-danger btn-sm rounded-11"
            >
              <i>
                <svg
                  className="table-delete"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                </svg>
              </i>
            </Link>
          </OverlayTrigger>
        </span>
      ),
    },
  ];
  return (
    <DataTable
      title
      columns={columns}
      data={schools}
      selectableRows
      pagination
    />
  );
};
export const ReviewDataTables = ({
  handleShow,
  propertyId,
  handleStatusUpdate,
  handleOpenUserModal,
  schools,
  role,
}) => {
  const handleOpenModal = (id) => {
    handleOpenUserModal(id);
  };
  const columns = [
    {
      name: "NAME",
      selector: (row) => [row.name],
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row) => [row.email],
      sortable: true,
    },
    {
      name: "PHONE",
      selector: (row) => [row.phone],
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row) => [row.action],
      sortable: true,
      cell: (row) => (
        <span className="" style={{ width: "409px" }}>
          {/* <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
            <NavLink
              to={row.type == "School" ? `/school-property-list/${row._id}` : `/coaching-property-list/${row._id}`}
              className="btn btn-yellow btn-sm rounded-11 me-2"
            >
              <i className="fe fe-eye"
                style={{ fontSize: "1.3rem" }}
                aria-hidden="true">
              </i>
            </NavLink>
          </OverlayTrigger> */}
          <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
            <NavLink
              to={`/school-property-list/${propertyId}/${row._id}/udpateReview`}
              className="btn btn-primary btn-sm rounded-11 me-2"
            >
              <i>
                <svg
                  className="table-edit"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                </svg>
              </i>
            </NavLink>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
            <Link
              onClick={() => handleShow(row?._id)}
              to="#"
              className="btn btn-danger btn-sm rounded-11"
            >
              <i>
                <svg
                  className="table-delete"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                </svg>
              </i>
            </Link>
          </OverlayTrigger>
        </span>
      ),
    },
  ];
  return (
    <DataTable
      title
      columns={columns}
      data={schools}
      selectableRows
      pagination
    />
  );
};
export const CallerTeamLeaderDataTables = ({
  handleShow,
  handleStatusUpdate,
  handleOpenUserModal,
  teamLeaders,
  role,
}) => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [data, setData] = React.useState(tableDataItems);
  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const handleOpenModal = (id) => {
    handleOpenUserModal(id);
  };
  const columns = [
    {
      name: "NAME",
      selector: (row) => [row.teamName],
      sortable: true,
    },
    {
      name: "Team Leader",
      selector: (row) => [row.teamLeader],
      sortable: true,
    },
    // {
    //   name: " CONTACT",
    //   selector: (row) => [row.contact_no],
    //   sortable: true,
    // },
    // {
    //   name: "USER STATUS",
    //   selector: (row) => [row.tab_status],
    //   sortable: true,
    //   cell: (row) => (
    //     <select type="button" onChange={(e) => handleStatusUpdate({ ...row, "tab_status": e.target.value })} value={row?.tab_status ? row.tab_status : ""} style={{ borderRadius: "12px" }} >
    //       <option value="Active">Active</option>
    //       <option value="Inactive">InActive</option>
    //     </select>
    //   ),
    // },
    {
      name: "ACTION",
      selector: (row) => [row.action],
      sortable: true,
      cell: (row) => (
        <span className="" style={{ width: "409px" }}>
          <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
            <NavLink className="btn btn-yellow btn-sm rounded-11 me-2">
              <i
                className="fe fe-user"
                style={{ fontSize: "1.3rem" }}
                aria-hidden="true"
                onClick={() => handleOpenUserModal(row)}
              ></i>
            </NavLink>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
            <NavLink
              to={`/update_callerTeamList/${row._id}`}
              className="btn btn-primary btn-sm rounded-11 me-2"
            >
              <i>
                <svg
                  className="table-edit"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                </svg>
              </i>
            </NavLink>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
            <Link
              onClick={() => handleShow(row?._id)}
              to="#"
              className="btn btn-danger btn-sm rounded-11"
            >
              <i>
                <svg
                  className="table-delete"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                </svg>
              </i>
            </Link>
          </OverlayTrigger>
        </span>
      ),
    },
  ];

  const columnsCafe = [
    {
      name: "NAME",
      selector: (row) => [row.teamName],
      sortable: true,
    },
    {
      name: "Team Leader",
      selector: (row) => [row.teamLeader],
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row) => [row.action],
      sortable: true,
      cell: (row) => (
        <span className="">
          <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
            <NavLink className="btn btn-yellow btn-sm rounded-11 me-2">
              <i
                className="fa fa-eye"
                style={{ fontSize: "1.3rem" }}
                aria-hidden="true"
                onClick={() => handleOpenModal(row)}
              ></i>
            </NavLink>
          </OverlayTrigger>
        </span>
      ),
    },
  ];

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      if (
        window.confirm(
          `Are you sure you want to delete:\r ${selectedRows.map(
            (r) => r.SNO
          )}?`
        )
      ) {
        setToggleCleared(!toggleCleared);
        setData(differenceBy(data, selectedRows, "SNO"));
      }
    };

    return (
      <Button key="delete" onClick={handleDelete} icon="true">
        Delete
      </Button>
    );
  }, [data, selectedRows, toggleCleared]);
  const tableDatas = {
    columns,
    data,
  };
  return (
    <DataTable
      title
      columns={role == 4 ? columnsCafe : columns}
      data={teamLeaders}
      selectableRows
      contextActions={contextActions}
      onSelectedRowsChange={handleRowSelected}
      clearSelectedRows={toggleCleared}
      pagination
    />
  );
};

//-------------------Attendence-------------------//
export const CourseDataTables = ({ handleShow, Courses }) => {
  const columns = [
    {
      name: "NAME",
      selector: (row) => [row.name],
      sortable: true,
    },
    {
      name: "STATUS",
      selector: (row) => [row.status == "active" ? "Active" : "InActive"],
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row) => [row.action],
      sortable: true,
      cell: (row) => (
        <span className="" style={{ width: "409px" }}>
          <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
            <NavLink
              to={`/update-course/${row?._id}`}
              className="btn btn-primary btn-sm rounded-11 me-2"
            >
              <i>
                <svg
                  className="table-edit"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                </svg>
              </i>
            </NavLink>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
            <Link
              onClick={() => handleShow(row?._id)}
              to="#"
              className="btn btn-danger btn-sm rounded-11"
            >
              <i>
                <svg
                  className="table-delete"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                </svg>
              </i>
            </Link>
          </OverlayTrigger>
        </span>
      ),
    },
  ];
  return (
    <DataTable
      title
      columns={columns}
      data={Courses}
      selectableRows
      pagination
    />
  );
};
export const DepartmentDataTables = ({ handleShow, Departments }) => {
  const columns = [
    {
      name: "NAME",
      selector: (row) => [row.name],
      sortable: true,
    },
    {
      name: "HOD",
      selector: (row) => [row.TeacherName[0].name],
      sortable: true,
    },
    {
      name: "STATUS",
      selector: (row) => [row.status == "active" ? "Active" : "InActive"],
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row) => [row.action],
      sortable: true,
      cell: (row) => (
        <span className="" style={{ width: "409px" }}>
          <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
            <NavLink
              to={`/update-department/${row?._id}`}
              className="btn btn-primary btn-sm rounded-11 me-2"
            >
              <i>
                <svg
                  className="table-edit"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                </svg>
              </i>
            </NavLink>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
            <Link
              onClick={() => handleShow(row?._id)}
              to="#"
              className="btn btn-danger btn-sm rounded-11"
            >
              <i>
                <svg
                  className="table-delete"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                </svg>
              </i>
            </Link>
          </OverlayTrigger>
        </span>
      ),
    },
  ];
  return (
    <DataTable
      title
      columns={columns}
      data={Departments}
      selectableRows
      pagination
    />
  );
};
export const GroupsDataTables = ({ handleShow, Groups }) => {
  const columns = [
    {
      name: "NAME",
      selector: (row) => [row.name],
      sortable: true,
    },
    {
      name: "STATUS",
      selector: (row) => [row.status == "active" ? "Active" : "InActive"],
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row) => [row.action],
      sortable: true,
      cell: (row) => (
        <span className="" style={{ width: "409px" }}>
          <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
            <NavLink
              to={`/update-course/${row?._id}`}
              className="btn btn-primary btn-sm rounded-11 me-2"
            >
              <i>
                <svg
                  className="table-edit"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                </svg>
              </i>
            </NavLink>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
            <Link
              onClick={() => handleShow(row?._id)}
              to="#"
              className="btn btn-danger btn-sm rounded-11"
            >
              <i>
                <svg
                  className="table-delete"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                </svg>
              </i>
            </Link>
          </OverlayTrigger>
        </span>
      ),
    },
  ];
  return (
    <DataTable
      title
      columns={columns}
      data={Groups}
      selectableRows
      pagination
    />
  );
};
export const SubjectDataTables = ({ handleShow, Subjects }) => {
  const columns = [
    {
      name: "NAME",
      selector: (row) => [row.name],
      sortable: true,
    },
    {
      name: "THEORY",
      selector: (row) => [row.theory == true ? "Yes" : "No"],
      sortable: true,
    },
    {
      name: "PRACTICAL",
      selector: (row) => [row.practical == true ? "Yes" : "No"],
      sortable: true,
    },
    {
      name: "ELECTIVE",
      selector: (row) => [row.elective == true ? "Yes" : "No"],
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row) => [row.action],
      sortable: true,
      cell: (row) => (
        <span className="" style={{ width: "409px" }}>
          <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
            <NavLink
              to={`/update-subject/${row?._id}`}
              className="btn btn-primary btn-sm rounded-11 me-2"
            >
              <i>
                <svg
                  className="table-edit"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                </svg>
              </i>
            </NavLink>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
            <Link
              onClick={() => handleShow(row?._id)}
              to="#"
              className="btn btn-danger btn-sm rounded-11"
            >
              <i>
                <svg
                  className="table-delete"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                </svg>
              </i>
            </Link>
          </OverlayTrigger>
        </span>
      ),
    },
  ];
  return (
    <DataTable
      title
      columns={columns}
      data={Subjects}
      selectableRows
      pagination
    />
  );
};
export const SemesterDataTables = ({ handleShow, Semesters }) => {
  const columns = [
    {
      name: "PHASE",
      selector: (row) => [row.name],
      sortable: true,
    },
    {
      name: "COURSE NAME",
      selector: (row) => [row.courseName[0].name],
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row) => [row.action],
      sortable: true,
      cell: (row) => (
        <span className="" style={{ width: "409px" }}>
          <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
            <NavLink
              to={`/update-semester/${row?._id}`}
              className="btn btn-primary btn-sm rounded-11 me-2"
            >
              <i>
                <svg
                  className="table-edit"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                </svg>
              </i>
            </NavLink>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
            <Link
              onClick={() => handleShow(row?._id)}
              to="#"
              className="btn btn-danger btn-sm rounded-11"
            >
              <i>
                <svg
                  className="table-delete"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                </svg>
              </i>
            </Link>
          </OverlayTrigger>
        </span>
      ),
    },
  ];
  return (
    <DataTable
      title
      columns={columns}
      data={Semesters}
      selectableRows
      pagination
    />
  );
};
export const StudentDataTables = ({ handleShow, Students }) => {
  const columns = [
    {
      name: "NAME",
      selector: (row) => [row.name],
      sortable: true,
      cell: (row) => (
        <span className="" style={{ width: "409px" }}>
          <NavLink
            to={`/student-profile/${row?._id}/${row.course_id}/${row.semester_id}`}
          >
            {row.name}
          </NavLink>
        </span>
      ),
    },
    {
      name: "FATHER NAME",
      selector: (row) => [row.father_name],
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row) => [row.action],
      sortable: true,
      cell: (row) => (
        <span className="" style={{ width: "409px" }}>
          <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
            <NavLink
              to={`/update-student/${row?._id}`}
              className="btn btn-primary btn-sm rounded-11 me-2"
            >
              <i>
                <svg
                  className="table-edit"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                </svg>
              </i>
            </NavLink>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
            <Link
              onClick={() => handleShow(row?._id)}
              to="#"
              className="btn btn-danger btn-sm rounded-11"
            >
              <i>
                <svg
                  className="table-delete"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                </svg>
              </i>
            </Link>
          </OverlayTrigger>
        </span>
      ),
    },
  ];
  return (
    <DataTable
      title
      columns={columns}
      data={Students}
      selectableRows
      pagination
    />
  );
};
export const StudentAttendenceDataTables = ({
  handleShow,
  StudentAttendece,
}) => {
  const convertPercentage = (str) => {
    // Regular expression to extract number and handle decimals
    const regex = /(\d+\.?\d*)/;
    const number = parseFloat(regex.exec(str)[1]);
    return number; // Convert percentage to decimal (0-1) for accurate comparison
  };

  const columns = [
    {
      name: "Roll No",
      selector: (row) => [row.roll],
      sortable: true,
    },
    {
      name: "NAME",
      selector: (row) => [row.studentName],
      sortable: true,
    },
    {
      name: "SUBJECT",
      selector: (row) => [row.name?.split("-")[0]],
    },
    {
      name: "TYPE",
      selector: (row) => [row.name?.split("-")[1]],
      sortable: true,
    },
    {
      name: "PRESENT",
      selector: (row) => [row.present],
      sortable: true,
    },
    {
      name: "ABSENT",
      selector: (row) => [row.absent],
      sortable: true,
    },
    {
      name: "PERCENTAGE",
      selector: (row) => [row.percentage],
      sortable: true,
      conditionalCellStyles: [
        {
          when: (cell) => convertPercentage(cell.percentage) >= 75.0, // Example condition
          style: { color: "green" ,backgroundColor:"#90EE90"},
        },
        {
          when: (cell) => convertPercentage(cell.percentage) < 75.0, // Example condition
          style: { color: "red",backgroundColor:"#FF7F7F" },
        },
      ],
    },
  ];
  return (
    <DataTable
      title
      columns={columns}
      data={StudentAttendece}
      selectableRows
      pagination
    />
  );
};
export const TeacherAttendenceDataTables = ({
  handleShow,
  teachersAttendence,
  kartik,
}) => {
  if (kartik == "test") {
    const columns = [
      {
        name: "STUDENT_ID",
        selector: (row) => [row.teacher_id],
        sortable: true,
      },
      {
        name: "SUBJECT_ID",
        selector: (row) => [row.subject_id],
        sortable: true,
      },
      {
        name: "TYPE",
        selector: (row) => [row.type],
        sortable: true,
      },
      {
        name: "ATTENDENCE",
        selector: (row) => [row.attendence_status],
        sortable: true,
      },
      {
        name: "ACTION",
        selector: (row) => [row.action],
        sortable: true,
        cell: (row) => (
          <span className="" style={{ width: "409px" }}>
            <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
              <NavLink
                to={`/update-course/${row?._id}`}
                className="btn btn-primary btn-sm rounded-11 me-2"
              >
                <i>
                  <svg
                    className="table-edit"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                  </svg>
                </i>
              </NavLink>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
              <Link
                onClick={() => handleShow(row?._id)}
                to="#"
                className="btn btn-danger btn-sm rounded-11"
              >
                <i>
                  <svg
                    className="table-delete"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                  </svg>
                </i>
              </Link>
            </OverlayTrigger>
          </span>
        ),
      },
    ];
    return (
      <DataTable
        title
        columns={columns}
        data={teachersAttendence}
        selectableRows
        pagination
      />
    );
  } else {
    const columns = [
      {
        name: "STUDENT_ID",
        selector: (row) => [row.teacher_id],
        sortable: true,
      },
      {
        name: "SUBJECT_ID",
        selector: (row) => [row.subject_id],
        sortable: true,
      },
      {
        name: "TYPE",
        selector: (row) => [row.type],
        sortable: true,
      },
      {
        name: "ATTENDENCE",
        selector: (row) => [row.attendence_status],
        sortable: true,
      },
      {
        name: "ACTION",
        selector: (row) => [row.action],
        sortable: true,
        cell: (row) => (
          <span className="" style={{ width: "409px" }}>
            <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
              <NavLink
                to={`/update-course/${row?._id}`}
                className="btn btn-primary btn-sm rounded-11 me-2"
              >
                <i>
                  <svg
                    className="table-edit"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                  </svg>
                </i>
              </NavLink>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
              <Link
                onClick={() => handleShow(row?._id)}
                to="#"
                className="btn btn-danger btn-sm rounded-11"
              >
                <i>
                  <svg
                    className="table-delete"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                  </svg>
                </i>
              </Link>
            </OverlayTrigger>
          </span>
        ),
      },
    ];
    return (
      <DataTable
        title
        columns={columns}
        data={teachersAttendence}
        selectableRows
        pagination
      />
    );
  }
};
export const TeacherDataTables = ({ handleShow, Teachers }) => {
  const columns = [
    {
      name: "NAME",
      selector: (row) => [row.name],
      sortable: true,
    },
    {
      name: "DEPARTMENT",
      selector: (row) => [row.department_id],
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row) => [row.action],
      sortable: true,
      cell: (row) => (
        <span className="" style={{ width: "409px" }}>
          <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
            <NavLink
              to={`/update-course/${row?._id}`}
              className="btn btn-primary btn-sm rounded-11 me-2"
            >
              <i>
                <svg
                  className="table-edit"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                </svg>
              </i>
            </NavLink>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
            <Link
              onClick={() => handleShow(row?._id)}
              to="#"
              className="btn btn-danger btn-sm rounded-11"
            >
              <i>
                <svg
                  className="table-delete"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                </svg>
              </i>
            </Link>
          </OverlayTrigger>
        </span>
      ),
    },
  ];
  return (
    <DataTable
      title
      columns={columns}
      data={Teachers}
      selectableRows
      pagination
    />
  );
};
