import React from "react";
import MaterialTable from "material-table";
import { navigate } from "./utils";

const tableContent = ({ centers }) => {
  return (
    <MaterialTable
      title="Search By Location"
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
          onClick: (event, { _geoloc }) => {
            navigate(_geoloc);
          }
          // ("You saved " + rowData.name)
        }
      ]}
      options={{
        actionsColumnIndex: -1
      }}
    />
  );
};

export default tableContent;
