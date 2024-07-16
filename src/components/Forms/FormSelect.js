import { useState } from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";

export function FormSelect() {
    const [value, setvalue] = useState("");
 
    const handleOnchange = () => {
      setvalue(value);
    };
   const optionDateofbirth = [
     {
       value: "Group-1",
       label: "Select Month",
     },
     {
       value: "Group-2",
       label: "January",
     },
     {
       value: "Group-3",
       label: "February",
     },
     {
       value: "Group-4",
       label: "March",
     },
     {
       value: "Group-5",
       label: "April",
     },
     {
       value: "Group-6",
       label: "May",
     },
     {
       value: "Group-7",
       label: "June",
     },
     {
       value: "Group-8",
       label: "July",
     },
     {
       value: "Group-9",
       label: "August",
     },
     {
       value: "Group-10",
       label: "September",
     },
     {
       value: "Group-11",
       label: "October",
     },
     {
       value: "Group-12",
       label: "November",
     },
     {
       value: "Group-13",
       label: "December",
     },
   ];
   return (
     <MultiSelect
       className="farms mb-1"
       displayValue="key"
       id="optionDateofbirth"
       onChange={handleOnchange}
        placeholder="--Select--"
       singleSelect="true"
       options={optionDateofbirth}
     />
   );
 }