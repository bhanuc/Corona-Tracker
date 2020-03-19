import React from "react";
import MaterialTable from "material-table";

const tableContent = ({ centers }) => {
  return (
    <MaterialTable
      title="Positioning Actions Column Preview"
      columns={[
        { title: "Name", field: "name" },
        { title: "State", field: "state" },
        { title: "Distance", field: "dist", type: "numeric" }
      ]}
      data={centers}
      actions={[
        {
          icon: "map",
          tooltip: "Open in Maps",
          onClick: (event, rowData) => alert("You saved " + rowData.name)
        }
      ]}
      options={{
        actionsColumnIndex: -1
      }}
    />
  );
};

export default tableContent;
