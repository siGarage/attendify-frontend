import { useState } from "react";
import Creatable from "react-select/creatable";

// //SearchSelect13
const option13s = [
    { value: "Audi", label: "Audi" },
    { value: "BMW", label: "BMW" },
    { value: "volkswagen", label: "volkswagen" },
    { value: "Aston Martin", label: "Aston Martin" },
    { value: "mitsubishi", label: "mitsubishi" },
    { value: "hyundai", label: "hyundai" },
    { value: "fiat", label: "fiat" },
  ];

export const SearchSelect = ({formik,name,affiliate_approve}) => {
    const [selected, setSelected] = useState([]);
  console.log(selected,"selected ajay")
    return (
      <div>
        <Creatable
          classNamePrefix="background"
          isMulti
          display="value"
          options={name == "approve_by" ? affiliate_approve?.uniqueApp : affiliate_approve?.uniqueAff }
          value={selected}
          onChange={(e)=>{setSelected(e);formik.setFieldValue(`${name}`,e)}}
          labelledBy="Select"
        />
      </div>
    );
  };